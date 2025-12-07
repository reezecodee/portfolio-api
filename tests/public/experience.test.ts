import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetExperienceList = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/experiences/experience.service.ts")
  .replace(/\\/g, "/");

mock.module(servicePath, () => {
  return {
    getAllExperiences: fakeGetExperienceList,
  };
});

const { app } = await import("../../src/index");

describe("Experience Test - Public API", () => {
  beforeEach(() => {
    fakeGetExperienceList.mockReset();
  });

  test("GET /api/v1/experiences should return 200 and contain experience list", async () => {
    fakeGetExperienceList.mockResolvedValue({
      data: [
        {
          id: uuid,
          position: "Software Developer",
          company: "Diskominfo Kota Tasikmalaya",
        },
      ],
      error: null,
    });

    const res = await app.request("/api/v1/experiences");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].position).toBe("Software Developer");
  });

  test("GET /api/v1/experiences should return 404 while data is empty", async () => {
    fakeGetExperienceList.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/experiences");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Daftar pengalaman belum tersedia");
  });

  test("GET /api/v1/experiences should return 500 while database explodes", async () => {
    fakeGetExperienceList.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/experiences");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

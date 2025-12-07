import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetEducationList = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/educations/education.service.ts")
  .replace(/\\/g, "/");

mock.module(servicePath, () => {
  return {
    getAllEducations: fakeGetEducationList,
  };
});

const { app } = await import("../../src/index");

describe("Education Test - Public API", () => {
  beforeEach(() => {
    fakeGetEducationList.mockReset();
  });

  test("GET /api/v1/educations should return 200 and contain education list", async () => {
    fakeGetEducationList.mockResolvedValue({
      data: [
        {
          id: uuid,
          institution: "Bina Sarana Informatika",
          degree: "Bachelor of Science in Information Systems",
        },
      ],
      error: null,
    });

    const res = await app.request("/api/v1/educations");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].institution).toBe("Bina Sarana Informatika");
  });

  test("GET /api/v1/educations should return 404 while data is empty", async () => {
    fakeGetEducationList.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/educations");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Daftar edukasi belum tersedia");
  });

  test("GET /api/v1/educations should return 500 while database explodes", async () => {
    fakeGetEducationList.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/educations");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

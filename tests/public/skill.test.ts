import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetSkillList = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/skills/skill.service.ts")
  .replace(/\\/g, "/");

mock.module(servicePath, () => {
  return {
    getAllSkills: fakeGetSkillList,
  };
});

const { app } = await import("../../src/index");

describe("Skill Test - Public API", () => {
  beforeEach(() => {
    fakeGetSkillList.mockReset();
  });

  test("GET /api/v1/skills should return 200 and contain skill list", async () => {
    fakeGetSkillList.mockResolvedValue({
      data: [
        {
          id: uuid,
          name: "TypeScript",
          category: "Language",
        },
      ],
      error: null,
    });

    const res = await app.request("/api/v1/skills");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].name).toBe("TypeScript");
  });

  test("GET /api/v1/skills should return 404 while data is empty", async () => {
    fakeGetSkillList.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/skills");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Daftar kemampuan belum tersedia");
  });

  test("GET /api/v1/skills should return 500 while database explodes", async () => {
    fakeGetSkillList.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/skills");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

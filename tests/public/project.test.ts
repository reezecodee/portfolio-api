import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetProjectList = mock();
const fakeGetProjectBySlug = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/projects/project.service.ts")
  .replace(/\\/g, "/");

mock.module(servicePath, () => {
  return {
    getAllProjects: fakeGetProjectList,
    getProjectBySlug: fakeGetProjectBySlug,
  };
});

const { app } = await import("../../src/index");

describe("Project Test (List) - Public API", () => {
  beforeEach(() => {
    fakeGetProjectList.mockReset();
    fakeGetProjectBySlug.mockReset();
  });

  test("GET /api/v1/projects should return 200 and contain project list", async () => {
    fakeGetProjectList.mockResolvedValue({
      data: [{ id: uuid, title: "Portfolio Web", slug: "portfolio-web" }],
      error: null,
    });

    const res = await app.request("/api/v1/projects");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].title).toBe("Portfolio Web");
  });

  test("GET /api/v1/projects should return 404 while data is empty", async () => {
    fakeGetProjectList.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/projects");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Daftar project belum tersedia");
  });

  test("GET /api/v1/projects should return 500 while database explodes", async () => {
    fakeGetProjectList.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/projects");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

describe("Project Test (Detail) - Public API", () => {
  test("GET /api/v1/projects/:slug should return 200 and project detail", async () => {
    fakeGetProjectBySlug.mockResolvedValue({
      data: {
        id: uuid,
        title: "Tutorial Bun Sampai HonoJS",
        slug: "tutorial-bun-sampai-honojs",
        content: "Ini ada contentnya",
      },
      error: null,
    });

    const res = await app.request("/api/v1/projects/tutorial-bun-sampai-honojs");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.slug).toBe("tutorial-bun-sampai-honojs");
  });

  test("GET /api/v1/projects/:slug should return 404 if slug not found", async () => {
    fakeGetProjectBySlug.mockResolvedValue({
      data: null,
      error: { message: "No rows found" },
    });

    const res = await app.request("/api/v1/projects/slug-salah");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Project tidak ditemukan");
  });

  test("GET /api/v1/projects/:slug should return 500 while database explodes", async () => {
    fakeGetProjectBySlug.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/projects/test-slug");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

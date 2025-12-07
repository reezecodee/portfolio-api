import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetBlogList = mock();
const fakeGetBlogBySlug = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/blogs/blog.service.ts")
  .replace(/\\/g, "/");

mock.module(servicePath, () => {
  return {
    getBlogList: fakeGetBlogList,
    getBlogBySlug: fakeGetBlogBySlug,
  };
});

const { app } = await import("../../src/index");

describe("Blog Test (List) - Public API", () => {
  beforeEach(() => {
    fakeGetBlogList.mockReset();
    fakeGetBlogBySlug.mockReset();
  });

  test("GET /api/v1/blogs should return 200 and contain blog list", async () => {
    fakeGetBlogList.mockResolvedValue({
      data: [{ id: uuid, title: "Tutorial Bun", slug: "tutorial-bun" }],
      error: null,
    });

    const res = await app.request("/api/v1/blogs");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].title).toBe("Tutorial Bun");
  });

  test("GET /api/v1/blogs should return 404 while data is empty", async () => {
    fakeGetBlogList.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/blogs");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Daftar blog belum tersedia");
  });

  test("GET /api/v1/blogs should return 500 while database explodes", async () => {
    fakeGetBlogList.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/blogs");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

describe("Blog Test (Detail) - Public API", () => {
  test("GET /api/v1/blogs/:slug should return 200 and blog detail", async () => {
    fakeGetBlogBySlug.mockResolvedValue({
      data: {
        id: uuid,
        title: "Tutorial Bun Sampai HonoJS",
        slug: "tutorial-bun-sampai-honojs",
        content: "Ini ada contentnya",
      },
      error: null,
    });

    const res = await app.request("/api/v1/blogs/tutorial-bun-sampai-honojs");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.slug).toBe("tutorial-bun-sampai-honojs");
  });

  test("GET /api/v1/blogs/:slug should return 404 if slug not found", async () => {
    fakeGetBlogBySlug.mockResolvedValue({
      data: null,
      error: { message: "No rows found" },
    });

    const res = await app.request("/api/v1/blogs/slug-salah");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Artikel tidak ditemukan atau belum dipublish");
  });

  test("GET /api/v1/blogs/:slug should return 500 while database explodes", async () => {
    fakeGetBlogBySlug.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/blogs/test-slug");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

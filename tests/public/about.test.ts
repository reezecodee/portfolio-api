import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetProfile = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/about/about.service.ts")
  .replace(/\\/g, "/"); 

mock.module(servicePath, () => {
  return {
    getProfile: fakeGetProfile, 
  };
});

const { app } = await import("../../src/index");

describe("About Test - Public API", () => {
  beforeEach(() => {
    fakeGetProfile.mockReset();
  });

  test("GET /api/v1/about should return 200 and contain profile", async () => {
    fakeGetProfile.mockResolvedValue({
      data: { id: uuid, full_name: "Test User", headline: "Coder" },
      error: null,
    });

    const res = await app.request("/api/v1/about");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.full_name).toBe("Test User");
  });

  test("GET /api/v1/about should return 404 when data is empty", async () => {
    fakeGetProfile.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/about");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Data profile belum tersedia");
  });

  test("GET /api/v1/about should return 500 when database explodes", async () => {
    fakeGetProfile.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/about");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});
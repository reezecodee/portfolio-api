import { describe, expect, test } from "bun:test";
import { app } from "../src/index";

describe("Welcome Test - Public API", () => {
  test("GET / should return 200 and welcome message", async () => {
    const res = await app.request("/");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.status).toBe("active");
    expect(json.version).toBeDefined();
    expect(json.message).toContain("Welcome");
  });
});

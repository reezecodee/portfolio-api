import { describe, test, expect, mock, beforeEach } from "bun:test";
import path from "path";
import { uuid } from "../../src/utils/uuid";

const fakeGetMessageList = mock();

const servicePath = path
  .join(process.cwd(), "src/modules/guestbook/guestbook.service.ts")
  .replace(/\\/g, "/");

mock.module(servicePath, () => {
  return {
    getMessages: fakeGetMessageList,
  };
});

const { app } = await import("../../src/index");

describe("Guestbook Test - Public API", () => {
  beforeEach(() => {
    fakeGetMessageList.mockReset();
  });

  test("GET /api/v1/guestbook should return 200 and contain message list", async () => {
    fakeGetMessageList.mockResolvedValue({
      data: [
        {
          id: uuid,
          message: "Keren bang!",
          visitors: {
            name: "Al Harits",
            avatar_url: "https://ui-avatars.com/alharits",
          },
        },
      ],
      error: null,
    });

    const res = await app.request("/api/v1/guestbook");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].message).toBe("Keren bang!");
    expect(json.data[0].visitors.name).toBe("Al Harits");
  });

  test("GET /api/v1/guestbook should return 404 while data is empty", async () => {
    fakeGetMessageList.mockResolvedValue({
      data: null,
      error: { message: "Row not found" },
    });

    const res = await app.request("/api/v1/guestbook");
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Daftar pesan belum tersedia");
  });

  test("GET /api/v1/guestbook should return 500 while database explodes", async () => {
    fakeGetMessageList.mockRejectedValue(new Error("Connection Timeout!"));

    const res = await app.request("/api/v1/guestbook");
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Internal Server Error");
  });
});

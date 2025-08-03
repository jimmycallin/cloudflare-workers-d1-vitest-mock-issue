/**
 * This test file demonstrates the issue with vi.mock() not working
 * when using SELF.fetch() in Cloudflare Workers environment.
 *
 * The problem occurs because the Worker runtime isolates modules
 * and vi.mock() cannot intercept imports across the runtime boundary.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { SELF } from "cloudflare:test";
import * as uuid from "uuid";

vi.mock("uuid", async () => {
  const actual = await vi.importActual("uuid");
  return {
    ...actual,
    v4: () => "mocked-uuid-1234",
  };
});

describe("Mock Issue Demo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Standard function mocking (works in regular tests)", () => {
    it("should successfully fetch user data", async () => {
      const response = await SELF.fetch("https://api.example.com/user");
      const data = await response.json();
      expect(data).toEqual({
        success: true,
        user: { id: "mocked-uuid-1234" },
      });
    });
  });
});

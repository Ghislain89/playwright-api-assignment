import { test, expect } from "@playwright/test";
import { extractToken } from "../support/helpers/auth.helper";

test("Assignment 1: /auth", async ({ request }) => {
  let token: string;

  await test.step("POST: /api/auth/login", async () => {
    const response = await request.post("/api/auth/login", {
      data: { username: "admin", password: "password123" },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toHaveProperty("token");
    expect(responseBody.data).toHaveProperty("user");
    expect(responseBody.data.user).toHaveProperty("username", "admin");
    expect(responseBody.data.user).toHaveProperty("role");

    token = responseBody.data.token;
  });

  await test.step("POST: /api/auth/logout", async () => {
    const response = await request.post("/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
  });
});

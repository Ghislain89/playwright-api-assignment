import { test, expect } from "@playwright/test";
import { extractToken } from "../support/helpers/auth.helper";

test("Assignemnt 1: /auth", async ({ request }) => {
  let token: string;

  await test.step("POST: /login", async () => {
    const response = await request.post("/auth/login", {
      data: { username: "admin", password: "password" },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()["set-cookie"]).toContain("token=");

    token = await extractToken(response);
  });

  await test.step("POST: /validate", async () => {
    const response = await request.post("/auth/validate", {
      data: { token: token },
    });
    expect(response.status()).toBe(200);
  });
  await test.step("POST: /logout", async () => {
    const response = await request.post("/auth/logout", {
      data: { token: token },
    });
    expect(response.status()).toBe(200);
  });
});

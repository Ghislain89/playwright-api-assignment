import { test, expect } from "@playwright/test";
import { extractToken } from "../support/helpers/auth.helper";

  /*
   * In order to help you get started, I've already created a post for auth/login that logs in with the required credentials and extracts the token.
   * The first assignment has three parts:
   * 1. POST: /login - Fetch a token
   * 2. POST: /validate - Validate the token
   * 3. POST: /logout - Logout the user
   *
   * Make sure you validate things like the statuscode, headers, and the response body.
   *
   * Documentation for the Auth endpoint(s):
   * https://automationintesting.online/auth/swagger-ui/index.html
   */

test("Assignemnt 1: /auth", async ({ request }) => {
  let token: string;

  await test.step("POST: /login", async () => {
    // Call the POST /auth/login endpoint with the required credentials
    const response = await request.post("/auth/login", {
      data: { username: "admin", password: "password" },
    });

    // Validate the statuscode
    expect(response.status()).toBe(200);

    // Validate that the response body contains the token
    expect(response.headers()["set-cookie"]).toContain("token=");
    // Extract the token from the response and store it in a variable. We do this so we can easily do other steps in the test in an authenticated state.
    token = await extractToken(response);
  });

  await test.step("POST: /validate", async () => {
    // your code here...
  });
  await test.step("POST: /logout", async () => {
    // your code here...
  });
});

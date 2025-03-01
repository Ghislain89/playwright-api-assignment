import { APIResponse } from "@playwright/test";

export async function extractToken(response: APIResponse) {
  const headers = response.headers();
  const tokenString = headers["set-cookie"].split(";")[0];
  const token = tokenString.split("=")[1];
  return token;
}

export async function extractTokenFromHeaders(headers: Record<string, string>) {
  const tokenString = headers["set-cookie"].split(";")[0];
  const token = tokenString.split("=")[1];
  return token;
};

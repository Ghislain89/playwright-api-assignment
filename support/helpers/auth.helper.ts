import { APIResponse } from "@playwright/test";

/**
 * Extracts the token from the response headers.
 *
 * @param {APIResponse} response - The API response object.
 * @returns {Promise<string>} - A promise that resolves to the extracted token.
 */
export async function extractToken(response: APIResponse): Promise<string> {
  const headers = response.headers();
  const tokenString = headers["set-cookie"].split(";")[0];
  const token = tokenString.split("=")[1];
  return token;
};


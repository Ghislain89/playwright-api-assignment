import { APIResponse } from "@playwright/test";

export async function safeJsonParse(response: APIResponse): Promise<any> {
  try {
    return await response.json();
  } catch (error) {
    return `Response from ${await response.url} was not valid JSON.`;
  }
}

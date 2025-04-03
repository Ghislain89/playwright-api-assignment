import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "API",
      use: {
        ignoreHTTPSErrors: true,
        baseURL: "http://localhost:3000/api/",
      },
    },
  ],
});

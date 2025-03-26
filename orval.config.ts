import { defineConfig } from "orval";
import "dotenv/config";
import path from "path";

const target = path.join(
  __dirname,
  "playwright",
  "support",
  "schemas",
  "swagger.json",
); // Path to OpenAPI spec file
export default defineConfig({
  Zod: {
    input: {
      target: target,
      validation: false,
    },
    output: {
      mode: "tags",
      target: "playwright/support/schemas/zod/index.ts",
      schemas: "playwright/support/schemas/zod/types",
      client: "zod",
    },
  },
});

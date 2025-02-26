import { defineConfig } from "orval";
import path from "path";

const authSpec = path.join(__dirname, "api-spec", "auth-api.json"); // Path to first OpenAPI spec file
const roomSpec = path.join(__dirname, "api-spec", "room-api.json"); // Path to second OpenAPI spec file
const bookingSpec = path.join(__dirname, "api-spec", "booking-api.json"); // Path to third OpenAPI spec file


export default defineConfig({
  auth: {
    input: {
      target: authSpec,
      validation: false,
    },
    output: {
      mode: "tags",
      target: ".zodAuth/index.ts",
      schemas: ".zodAuth/types",
      client: "zod",
    },
  },
  room: {
    input: {
      target: roomSpec,
      validation: false,
    },
    output: {
      mode: "tags",
      target: ".zodRoom/index.ts",
      schemas: ".zodRoom/types",
      client: "zod",
    },
  },
   booking: {
    input: {
      target: bookingSpec,
      validation: false,
    },
    output: {
      mode: "tags",
      target: ".zodBooking/index.ts",
      schemas: ".zodBooking/types",
      client: "zod",
    },
  },
});
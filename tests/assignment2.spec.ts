import { test, expect } from "@playwright/test";
import { extractToken } from "../support/helpers/auth.helper";
import { createRandomRoom } from "../support/datafactories/room.factory";
import { createRandomBooking } from "../support/datafactories/booking.factory";

test("Assignemnt 2: /Rooms & /Booking", async ({ request }) => {
  let token: string;
  const room = await createRandomRoom();
  let createdRoom: any = {};
  let booking: any = {};

  await test.step("GET: /rooms - Check for Available Rooms", async () => {});

  await test.step("POST: /login - Fetch a token to create a room", async () => {});

  await test.step("POST: /rooms - Create a Room", async () => {});

  await test.step("GET: /rooms - Check created room.", async () => {});

  await test.step("POST: /booking - Create a booking", async () => {});

  await test.step("DELETE: /booking - Delete a booking.", async () => {});

  await test.step("DELETE: /booking - Checking that the book", async () => {});
});

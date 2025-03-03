import { test, expect } from "@playwright/test";
import { createRandomRoom } from "../support/datafactories/room.factory";
import { extractToken } from "../support/helpers/auth.helper";

/*
 * The second assignment covers the Rooms and Booking endpoints.
 * The second assignment has five parts:
 * 1. GET: /rooms - Check for Available Rooms
 * 2. POST: /login - Fetch a token to create a room
 *  3. POST: /rooms - Create a Room
 * 4. GET: /rooms - Check created room.
 * 5. POST: /booking - Create a booking
 * 6. DELETE: /booking - Delete a booking.
 * 7. GET: /booking - Checking that the booking is really removed
 *
 * Make sure you validate things like the statuscode, headers, and the response body.
 *
 *
 * To help you out, I've created several data factories that should help you in creating the required requst bodies for the various endpoints.
 * If you get stuck, Look in the ./support/datafactories folder for the data factories.
 *
 * Documentation for the room & booking endpoint(s):
 * https://automationintesting.online/room/swagger-ui/index.html
 * https://automationintesting.online/booking/swagger-ui/index.html
 */

test("Assignemnt 2: /Rooms & /Booking", async ({ request }) => {
  let token: string;
  const room = await createRandomRoom();
  let createdRoom: any = {};
  let booking: any = {};

  await test.step("GET: /rooms - Check for Available Rooms", async () => {
    // Call the GET /rooms endpoint to check for available rooms
    // Validate the statuscode
    // Validate that the response body contains the room
  });

  await test.step("POST: /login - Fetch a token to create a room", async () => {
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

  await test.step("POST: /rooms - Create a Room", async () => {
    // Call the POST /rooms endpoint to create a room
    // Validate the statuscode
    // Validate that the response body contains the created room
  });

  await test.step("GET: /rooms - Check created room.", async () => {
    // Call the GET /rooms endpoint to check for the room you just created
    // Validate the statuscode
    // Validate that the response body contains the created room
  });

  await test.step("POST: /booking - Create a booking", async () => {
    // Call the POST /booking endpoint to create a booking
    // Validate the statuscode
    // Validate that the response body contains the created booking
  });

  await test.step("DELETE: /booking - Delete a booking.", async () => {
    // Call the DELETE /booking endpoint to delete the booking you just created
    // Validate the statuscode
  });

  await test.step("GET: /booking - Checking that the booking is really removed", async () => {
    // Call the GET /booking endpoint to verify that the booking you just removed is actually gone.
    // Validate the statuscode
  });
});

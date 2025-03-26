import { test } from "../support/fixtures/test.fixture";
import { expect } from "../support/fixtures/expect.fixture";
import { createRandomRoom } from "../support/datafactories/room.factory";
import { createRandomBooking } from "../support/datafactories/booking.factory";
import {
  getApiRoomsResponse,
  getApiRoomsIdResponse,
} from "../support/zod/zod/rooms";
import {
  getApiBookingsIdResponse,
  deleteApiBookingsIdResponse,
} from "../support/zod/zod/bookings";

test.describe("Bonus: Improve the overall setup", () => {
  let token: string;

  test.beforeEach(async ({ api }) => {
    const { statusCode, responseBody } = await api.post("/api/auth/login", {
      username: "admin",
      password: "password123",
    });
    expect(statusCode).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toHaveProperty("token");
    token = responseBody.data.token;
  });

  test("Assignment 1: /auth", async ({ api }) => {
    await test.step("POST: /api/auth/logout", async () => {
      const { statusCode, responseBody } = await api.post(
        "/api/auth/logout",
        {},
        token,
      );
      expect(statusCode).toBe(200);
      expect(responseBody.success).toBe(true);
    });
  });

  test("Assignment 2: /Rooms & /Booking", async ({ api }) => {
    const room = await createRandomRoom();
    let createdRoom: any = {};
    let booking: any = {};

    await test.step("GET: /api/rooms - Check for Available Rooms", async () => {
      const { statusCode, responseBody } = await api.get("/api/rooms", token);
      expect(statusCode).toBe(200);
      expect(responseBody.success).toBe(true);
      await expect(responseBody).toMatchSchema(getApiRoomsResponse);
    });

    await test.step("POST: /api/rooms - Create a Room", async () => {
      const { statusCode, responseBody } = await api.post(
        "/api/rooms",
        room,
        token,
      );
      createdRoom = responseBody.data;
      expect(statusCode).toBe(201);
      expect(responseBody.success).toBe(true);
      await expect(responseBody).toMatchSchema(getApiRoomsIdResponse);
    });

    await test.step("GET: /api/rooms - Check created room", async () => {
      const { statusCode, responseBody } = await api.get(
        `/api/rooms/${createdRoom.id}`,
        token,
      );
      expect(statusCode).toBe(200);
      expect(responseBody.success).toBe(true);
      await expect(responseBody).toMatchSchema(getApiRoomsIdResponse);
    });

    await test.step("POST: /api/bookings - Create a booking", async () => {
      const randomBooking = await createRandomBooking(
        createdRoom.id,
        "2025-03-05",
        "2025-03-07",
      );

      const { statusCode, responseBody } = await api.post(
        "/api/bookings",
        randomBooking,
        token,
      );
      booking = responseBody.data;
      expect(statusCode).toBe(201);
      expect(responseBody.success).toBe(true);
      await expect(responseBody).toMatchSchema(getApiBookingsIdResponse);
    });

    await test.step("GET: /api/bookings - Get booking details", async () => {
      const { statusCode, responseBody } = await api.get(
        `/api/bookings/${booking.id}`,
        token,
      );
      expect(statusCode).toBe(200);
      expect(responseBody.success).toBe(true);
      await expect(responseBody).toMatchSchema(getApiBookingsIdResponse);
    });

    await test.step("DELETE: /api/bookings - Delete a booking", async () => {
      const { statusCode, responseBody } = await api.delete(
        `/api/bookings/${booking.id}`,
        token,
      );
      expect(statusCode).toBe(200);
      expect(responseBody.success).toBe(true);
      expect(responseBody.message).toBe("Booking cancelled successfully");
      await expect(responseBody).toMatchSchema(deleteApiBookingsIdResponse);
    });

    await test.step("GET: /api/bookings - Verify booking is deleted", async () => {
      const { statusCode, responseBody } = await api.get(
        `/api/bookings/${booking.id}`,
        token,
      );
      expect(statusCode).toBe(200);
      expect(responseBody.success).toBe(true);
    });
  });
});

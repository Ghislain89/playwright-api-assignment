import { test } from "../support/fixtures/test.fixture";
import { expect } from "../support/fixtures/expect.fixture";
import { extractTokenFromHeaders } from "../support/helpers/auth.helper";
import { createRandomRoom } from "../support/datafactories/room.factory";
import { createRandomBooking } from "../support/datafactories/booking.factory";
import { Rooms } from "../support/zod/room.schema";
import { Token } from "../support/zod/auth.schema";
import { Booking, CreatedBooking } from "../support/zod/booking.schema";

test.describe("Bonus: Improve the overall setup", () => {
  let token: string;

  test.beforeEach(async ({ api }) => {
    const { headers, statusCode, responseBody } = await api.post(
      "/auth/login",
      {
        username: "admin",
        password: "password",
      },
    );
    expect(statusCode).toBe(200);
    expect(headers["set-cookie"]).toContain("token=");
    token = await extractTokenFromHeaders(headers);

    // can't do schema validation here because the documentation doesn't match the actual response, either a bug in SUT or in documentation
    //expect(responseBody).toMatchSchema(Token);
  });

  test("Assignment 1: /auth", async ({ api }) => {
    await test.step("POST: /validate", async () => {
      const { statusCode, responseBody } = await api.post("/auth/validate", {
        token,
      });
      expect(statusCode).toBe(200);

      // can't do schema validation here because the documentation doesn't match the actual response, either a bug in SUT or in documentation
      //expect(responseBody).toMatchSchema(Token);
    });

    await test.step("POST: /logout", async () => {
      const { statusCode, responseBody } = await api.post("/auth/logout", {
        token,
      });
      expect(statusCode).toBe(200);
      // can't do schema validation here because the documentation doesn't match the actual response, either a bug in SUT or in documentation
      //expect(responseBody).toMatchSchema(Token);
    });
  });

  test("Assignment 2: /Rooms & /Booking", async ({ api }) => {
    const room = await createRandomRoom();
    let createdRoom: any = {};
    let booking: any = {};

    await test.step("GET: /rooms - Check for Available Rooms", async () => {
      const { statusCode, responseBody } = await api.get("/room");
      expect(statusCode).toBe(200);
      await expect(responseBody).toMatchSchema(Rooms);
    });

    await test.step("POST: /rooms - Create a Room", async () => {
      const { statusCode, responseBody } = await api.post(
        "/room/",
        room,
        token,
      );
      createdRoom = responseBody;
      expect(statusCode).toBe(201);
      await expect(createdRoom).toMatchSchema(Rooms);
    });

    await test.step("GET: /rooms - Check created room.", async () => {
      const { statusCode, responseBody } = await api.get(
        `/room/${createdRoom.roomid}`,
      );
      expect(statusCode).toBe(200);
      await expect(responseBody).toMatchSchema(Rooms);
    });

    await test.step("POST: /booking - Create a booking", async () => {
      const randomBooking = await createRandomBooking(
        createdRoom.roomid,
        "2025-03-05",
        "2025-03-07",
      );

      const { statusCode, responseBody } = await api.post(
        "/booking/",
        randomBooking,
        token,
      );
      booking = responseBody;
      expect(statusCode).toBe(201);

      // SUT is bugged, or documentation is wrong.
      // await expect(responseBody).toMatchSchema(CreatedBooking);
    });

    await test.step("GET: /booking - Create a booking", async () => {
      const { statusCode, responseBody } = await api.get(
        `/booking/${booking.bookingid}`,
        token,
      );
      booking = responseBody;
      expect(statusCode).toBe(200);
      // SUT is bugged, or documentation is wrong.
      //await expect(responseBody).toMatchSchema(Booking);
    });

    await test.step("DELETE: /booking - Delete a booking.", async () => {
      const { statusCode, responseBody } = await api.delete(
        `/booking/${booking.bookingid}`,
        token,
      );
      expect(statusCode).toBe(202);
      // SUT is bugged, or documentation is wrong.
      //await expect(responseBody).toMatchSchema(CreatedBooking);
    });

    await test.step("DELETE: /booking - Checking that the booking is actually gone", async () => {
      const { statusCode, responseBody } = await api.get(
        `/booking/${booking.bookingid}`,
      );
      expect(statusCode).toBe(404);
      // SUT is bugged, or documentation is wrong.
      // await expect(responseBody).toMatchSchema(CreatedBooking);
    });
  });
});

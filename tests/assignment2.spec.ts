import { test, expect } from "@playwright/test";
import { extractToken } from "../support/helpers/auth.helper";
import { createRandomRoom } from "../support/datafactories/room.factory";
import { createRandomBooking } from "../support/datafactories/booking.factory";

test("Assignemnt 2: /Rooms & /Booking", async ({ request }) => {
  let token: string;
  const room = await createRandomRoom();
  let createdRoom: any = {};

  let booking: any = {};

  await test.step("GET: /rooms - Check for Available Rooms", async () => {
    const response = await request.get("/room");
    expect(response.status()).toBe(200);

    const responseJson = await response.json();
    expect(responseJson.rooms[0].roomName).toEqual("101");
    expect(responseJson.rooms[0].type).toEqual("single");
  });

  await test.step("POST: /login - Fetch a token to create a room", async () => {
    const response = await request.post("/auth/login", {
      data: { username: "admin", password: "password" },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()["set-cookie"]).toContain("token=");

    token = await extractToken(response);
  });

  await test.step("POST: /rooms - Create a Room", async () => {
    const response = await request.post("/room/", {
      headers: { token: token },
      data: room,
    });
    expect(response.status()).toBe(201);

    createdRoom = await response.json();

    expect(createdRoom.roomName).toEqual(room.roomName);
    expect(createdRoom.accessible).toEqual(room.accessible);
    expect(createdRoom.description).toEqual(room.description);
    expect(createdRoom.features).toEqual(room.features);
    expect(createdRoom.image).toEqual(room.image);
    expect(createdRoom.roomName).toEqual(room.roomName);
    expect(createdRoom.type).toEqual(room.type);
  });

  await test.step("GET: /rooms - Check created room.", async () => {
    const response = await request.get(`/room/${createdRoom.roomid}`);
    expect(response.status()).toBe(200);

    const responseJson = await response.json();
    expect(responseJson.roomName).toEqual(createdRoom.roomName);
  });

  await test.step("POST: /booking - Create a booking", async () => {
    const response = await request.post("/booking/", {
      headers: { token: token },
      data: await createRandomBooking(
        createdRoom.roomid,
        "2025-03-05",
        "2025-03-07",
      ),
    });
    expect(response.status()).toBe(201);
    booking = await response.json();
    expect(booking.booking.roomid).toEqual(createdRoom.roomid);
  });

  await test.step("DELETE: /booking - Delete a booking.", async () => {
    const response = await request.delete(
      `/booking/${booking.booking.bookingid}`,
    );
    expect(response.status()).toBe(202);
  });

  await test.step("DELETE: /booking - Checking that the book", async () => {
    const response = await request.get(`/booking/${booking.booking.bookingid}`);
    expect(response.status()).toBe(404);
  });
});

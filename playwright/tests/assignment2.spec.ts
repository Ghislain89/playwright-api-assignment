import { test, expect } from "@playwright/test";
import { createRandomRoom } from "../support/datafactories/room.factory";
import { createRandomBooking } from "../support/datafactories/booking.factory";

test("Assignment 2: /Rooms & /Booking", async ({ request }) => {
  let token: string;
  const room = await createRandomRoom();
  let createdRoom: any = {};
  let booking: any = {};

  await test.step("POST: /api/auth/login - Fetch a token to create a room", async () => {
    const response = await request.post("/api/auth/login", {
      data: { username: "admin", password: "password123" },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toHaveProperty("token");
    token = responseBody.data.token;
  });

  await test.step("GET: /api/rooms - Check for Available Rooms", async () => {
    const response = await request.get("/api/rooms", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);

    const responseJson = await response.json();
    expect(responseJson.success).toBe(true);
    expect(responseJson.data[0]).toHaveProperty("number");
    expect(responseJson.data[0]).toHaveProperty("type");
    expect(responseJson.data[0]).toHaveProperty("price");
    expect(responseJson.data[0]).toHaveProperty("capacity");
    expect(responseJson.data[0]).toHaveProperty("amenities");
  });

  await test.step("POST: /api/rooms - Create a Room", async () => {
    const response = await request.post("/api/rooms", {
      headers: { Authorization: `Bearer ${token}` },
      data: room,
    });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    createdRoom = responseBody.data;

    expect(createdRoom.number).toEqual(room.number);
    expect(createdRoom.type).toEqual(room.type);
    expect(createdRoom.price).toEqual(room.price);
    expect(createdRoom.capacity).toEqual(room.capacity);
    expect(JSON.parse(createdRoom.amenities)).toEqual(room.amenities);
  });

  await test.step("GET: /api/rooms - Check created room", async () => {
    const response = await request.get(`/api/rooms/${createdRoom.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.number).toEqual(createdRoom.number);
    expect(responseBody.data.type).toEqual(createdRoom.type);
    expect(responseBody.data.price).toEqual(createdRoom.price);
    expect(responseBody.data.capacity).toEqual(createdRoom.capacity);
    expect(JSON.parse(responseBody.data.amenities)).toEqual(room.amenities);
  });

  await test.step("POST: /api/bookings - Create a booking", async () => {
    const bookingData = await createRandomBooking(
      createdRoom.id,
      "2025-04-05",
      "2025-04-07",
    );

    const response = await request.post("/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
      data: bookingData,
    });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    booking = responseBody.data;
    expect(booking.roomId).toEqual(createdRoom.id);
  });

  await test.step("DELETE: /api/bookings - Delete a booking", async () => {
    const response = await request.delete(`/api/bookings/${booking.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
  });

  await test.step("GET: /api/bookings - Verify booking is deleted", async () => {
    const response = await request.get(`/api/bookings/${booking.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.status).toBe("CANCELLED");
  });
});

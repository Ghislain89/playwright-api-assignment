import { faker } from "@faker-js/faker";
import { randomRoomFeaturesCount } from "../helpers/roomFeatures.helper";

export async function createRandomRoom(roomName?: string, roomPrice?: number) {
  const roomType = ["Single", "Double", "Twin"];
  const features = randomRoomFeaturesCount(6);

  return {
    roomName: roomName || faker.string.numeric(3),
    type: roomType[Math.floor(Math.random() * roomType.length)],
    accessible: Math.random() < 0.5, //returns true or false
    image: "/images/room2.jpg",
    description: faker.hacker.phrase(),
    features: features.sort(() => 0.5 - Math.random()).slice(0, 3), // returns 3 random values from the array
    roomPrice: roomPrice || faker.string.numeric(3),
  };
}

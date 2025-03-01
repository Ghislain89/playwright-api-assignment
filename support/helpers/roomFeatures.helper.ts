import { faker } from "@faker-js/faker";

const roomFeatures = [
  "TV",
  "WiFi",
  "Radio",
  "Refreshments",
  "Safe",
  "Air Conditioning",
];

export function allRoomFeatures() {
  return roomFeatures;
}

export function randomRoomFeatures() {
  return roomFeatures[
    faker.number.int({ min: 0, max: roomFeatures.length - 1 })
  ];
}

export function randomRoomFeaturesCount(count: number) {
  const features: string[] = [];

  for (let i = 0; i < count; i++) {
    features.push(randomRoomFeatures());
  }
  // This will remove all duplicates from the array
  return Array.from(new Set(features));
}

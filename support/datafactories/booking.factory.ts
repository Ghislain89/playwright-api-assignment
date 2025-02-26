import { faker } from "@faker-js/faker";

/*
@param roomId: number
@param checkInString: string // Example: 2025-03-01
@param checkOutString: string // Example: 2025-03-05 
*/

export async function createRandomBooking(
  roomId: number,
  checkInString: string,
  checkOutString: string,
) {
  const bookingBody = {
    roomid: roomId,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    depositpaid: Math.random() < 0.5, //returns true or false
    email: faker.internet.email(),
    phone: faker.string.numeric(11),
    bookingdates: {
      checkin: checkInString,
      checkout: checkOutString,
    },
  };
  return bookingBody;
}

# Set up
* Run `npm install`
* Run tests either by invoking `npm run test` or using the Playwright VsCode Plugin (recommended!)

## Assignments

For our assignments we will be using the https://automationintesting.online/ Booking Platform. It offers various CRUD operations as well as authentication making it an ideal candiate for our workshop! 

Credentials
username: admin
password: password

NOTICE: The database is reset every 10 minutes, make sure to take this in to account!

## Documentation
We will be using the following API's:
* Auth: https://automationintesting.online/auth/swagger-ui/index.html
* Rooms: https://automationintesting.online/room/swagger-ui/index.html
* Booking: https://automationintesting.online/booking/swagger-ui/index.html

## Playwright Documentation
* Playwright Documentation: https://playwright.dev/docs/api/class-apirequestcontext
* API Assertions documentation: https://playwright.dev/docs/api/class-apiresponseassertions
* Generic Assertions: https://playwright.dev/docs/api/class-genericassertions

## Assignment 1 (Authentication)
- Login to the Platform, fetch a token. 
- Store the token so you can re-use it in other subsequent calls.
- Validate that the token you received is valid.

## Assignment 2 (Rooms & Booking)
- Find a room 
- Book a room
- Change your mind and update your booking
- Ultimately, your kids bring back the flu from daycare. cancel your booking.

Note: Make sure to add assertions on statuscodes, the response body and headers. 

## Bonus Assignment
- Think about how we could improve our setup?
- Could we do something smart to make our tests more readable
- Could we do something smart with using the same authenticated state for all tests?
- Could we do something smart to ensure the response is structured correctly without explicitly validating this in every test?
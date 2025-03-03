# Getting started & Running Tests
As mentioned in the pre-workshop installation instructions. We assume you've installed Git, NodeJS, VSCode and the Playwright VScode plugin (although you could live without the latter).

1. Clone this repository
2. Run `npm install` (you can probably use other package managers as well, but I haven't tested that)
3. Run tests by invoking the test script: `npm run test` or the testing panel in VsCode (with the Playwright Plugin). You can also use specify the filename of the test to run by invoking this command: `npx playwright test assignment1.spec.ts`

# Structure
It's commonly considered best practice to balance principles such as KISS and DRY. One of the more common ways of doing this, is by separating things in a folder structure.

## Folder Structure

```
├── support/
│   ├── datafactories/       # Contains data factory functions for creating test data
│   ├── helpers/             # Contains helper functions used across tests
│   ├── zod/                 # Contains Zod schemas for validating API responses
│   └── fixtures/            # Contains fixtures for setting up and tearing down tests
├── tests/                   # Contains the test specifications
├── package.json             # Node.js project metadata and dependencies
├── playwright.config.ts     # Playwright configuration file
└── readme.md                # Project documentation
```

# Assignments

For our assignments we will be using the https://automationintesting.online/ Booking Platform. It offers various CRUD operations as well as authentication making it an ideal candiate for our workshop!

Credentials
username: admin
password: password


> [!IMPORTANT]  
> The database is reset every 10 minutes, make sure to take this in to account!


## Documentation

We will be using the following API's:

- Auth: https://automationintesting.online/auth/swagger-ui/index.html
- Rooms: https://automationintesting.online/room/swagger-ui/index.html
- Booking: https://automationintesting.online/booking/swagger-ui/index.html
- HTTP Statuscodes: https://javaconceptoftheday.com/http-status-codes-cheat-sheet/#google_vignette

## Assignment 1 (Authentication)

- Login to the Platform, fetch a token.
- Store the token so you can re-use it in other subsequent calls.
- Validate that the token you received is valid.

## Assignment 2 (Rooms & Booking)

- Find a room, determine there's no room to your liking
- Just add a new room, construction wil for sure be complete by the time you decide to go :-)
- Book your room
- Ultimately, your kids bring back the flu from daycare. cancel your booking.

Note: Make sure to add assertions on statuscodes, the response body and headers.

## Bonus Assignment

- Think about how we could improve our setup?
- Could we do something smart to make our tests more readable
- Could we do something smart with using the same authenticated state for all tests?
- Could we do something smart to ensure the response is structured correctly without explicitly validating this in every test?


# Playwright Documentation

- Playwright Documentation: https://playwright.dev/docs/api/class-apirequestcontext
- API Assertions documentation: https://playwright.dev/docs/api/class-apiresponseassertions
- Generic Assertions: https://playwright.dev/docs/api/class-genericassertions


# Solutions
All assignments have have been finished and detailed in the solutions branch. While there are various ways of solving each of these assignments, the solution branchs contains our view on what _could_ be a good approach to do this. It's probably not perfect and depending on the context of your organisation, you might do things (very) differently and that's ok!
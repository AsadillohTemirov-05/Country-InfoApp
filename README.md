COUNTRY INFO APP

A NestJS application that provides country information and allows users to add national holidays to their calendar. The application integrates with external APIs (Nager.Date and CountriesNow) to fetch country details and holiday data, storing holidays in a MongoDB database. It includes Swagger documentation for easy API exploration.

FEATURES





Country Information: Retrieve a list of available countries and detailed information (borders, population, flag URL) for a specific country.



Holiday Management: Add national holidays for a specified country and year to a user's calendar, with optional filtering by holiday names.



MongoDB Integration: Stores holiday data in MongoDB using Mongoose.



Swagger Documentation: Interactive API documentation available at /api.



Input Validation: Uses class-validator for robust request validation.



Error Handling: Comprehensive error messages and logging for debugging.

PREREQUISITES





Node.js: Version 16 or higher



MongoDB: Local installation or a cloud instance (e.g., MongoDB Atlas)



npm: For dependency management

SETUP





Clone the Repository:

git clone https://github.com/<your-username>/country-info-app.git
cd country-info-app



Install Dependencies:

npm install



Configure Environment Variables: Create a .env file in the project root with the following content:

NAGER_API_URL=https://date.nager.at/api/v3
COUNTRIESNOW_API_URL=https://countriesnow.space/api/v0.1
MONGODB_URI=mongodb://localhost:27017/country_info_db





Replace MONGODB_URI with your MongoDB connection string if using a cloud instance.



Ensure MongoDB is Running:





For local MongoDB, start the server:

mongod



For MongoDB Atlas, ensure the URI is correctly configured in .env.



Run the Application:

npm run start:dev

The application will be available at http://localhost:3000.

API DOCUMENTATION

Interactive Swagger UI is available at http://localhost:3000/api. It provides detailed documentation and testing capabilities for all endpoints.

API ENDPOINTS

COUNTRIES





GET /countries





Description: Retrieve a list of available countries.



Response:

[
  { "countryCode": "US", "name": "United States" },
  { "countryCode": "CA", "name": "Canada" }
]



GET /countries/:countryCode





Description: Retrieve detailed information about a specific country (borders, population, flag URL).



Example: GET /countries/US



Response:

{
  "countryCode": "US",
  "commonName": "United States",
  "officialName": "United States of America",
  "borders": ["CA", "MX"],
  "population": [
    { "year": 2020, "value": 331002651 },
    { "year": 2019, "value": 328239523 }
  ],
  "flagUrl": "https://flagcdn.com/us.svg"
}

CALENDAR





POST /users/:userId/calendar/holidays





Description: Add national holidays for a specific country and year to a user's calendar. Optionally filter by specific holidays.



Example Request:

curl -X POST http://localhost:3000/users/123/calendar/holidays \
-H "Content-Type: application/json" \
-d '{"countryCode":"US","year":2025,"holidays":["New Year'\''s Day","Independence Day"]}'



Request Body:

{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Independence Day"]
}



Response:

[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "123",
    "countryCode": "US",
    "year": 2025,
    "holidayName": "New Year's Day",
    "date": "2025-01-01",
    "__v": 0
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "123",
    "countryCode": "US",
    "year": 2025,
    "holidayName": "Independence Day",
    "date": "2025-07-04",
    "__v": 0
  }
]

TESTING





Lint and Format Code:

npm run lint
npm run format



Test Endpoints:





Use Swagger UI at http://localhost:3000/api for interactive testing.



Use curl commands (as shown above) or tools like Postman.



Verify MongoDB: Check saved holidays in the holidays collection:

db.holidays.find({ userId: "123", countryCode: "US", year: 2025 })

DEPENDENCIES





@nestjs/core, @nestjs/common: NestJS framework



@nestjs/mongoose, mongoose: MongoDB integration



@nestjs/axios, axios: HTTP requests to external APIs



@nestjs/swagger, swagger-ui-express: API documentation



class-validator, class-transformer: Request validation



Dev dependencies: @nestjs/cli, typescript, eslint, prettier

NOTES





External APIs:





Country data: CountriesNow



Holiday data: Nager.Date



MongoDB: Ensure the database is running and accessible via the MONGODB_URI.



Validation: The POST /users/:userId/calendar/holidays endpoint uses case-insensitive holiday name filtering and validates inputs using class-validator.



Error Handling: Detailed error messages are provided for invalid inputs, API failures, or database issues.

CONTRIBUTING





Fork the repository.



Create a feature branch (git checkout -b feature/your-feature).



Commit changes (git commit -m 'Add your feature').



Push to the branch (git push origin feature/your-feature).



Open a Pull Request.


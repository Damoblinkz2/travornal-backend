# Travornal Backend

A NestJS backend application for a travel diary app, allowing users to authenticate and manage cities (travel destinations).

## Features

- User authentication (signup/login) with JWT
- Password hashing with Argon2
- CRUD operations for cities
- MongoDB database with Mongoose
- Global validation pipes
- TypeScript support

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: class-validator and class-transformer
- **Hashing**: Argon2
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd travornal-be
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB=mongodb://localhost:27017/travornal
   JWT_TOKEN=your-secret-jwt-key
   ```

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

The server will start on the port specified in the `PORT` environment variable.

## API Endpoints

### Authentication

- **POST /auth/signup**
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: User data without password

- **POST /auth/login**
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "access_token": "jwt-token" }`

### Cities (Protected routes, require Bearer token)

- **GET /cities/all**
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of cities for the user

- **GET /cities/:id**
  - Headers: `Authorization: Bearer <token>`
  - Response: City data

- **POST /cities/all**
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "city": "string", "country": "string", "countryCode": "string", "notes": "string (optional)", "position": [{ "lat": number, "lng": number }] }`
  - Response: Created city data

## Testing

Run the test suite:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run tests with coverage:

```bash
npm run test:cov
```

## Scripts

- `npm run build`: Build the application
- `npm run format`: Format code with Prettier
- `npm run start`: Start the application
- `npm run start:dev`: Start in development mode with watch
- `npm run start:debug`: Start in debug mode
- `npm run start:prod`: Start the production build
- `npm run lint`: Lint the code
- `npm run test`: Run unit tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:cov`: Run tests with coverage
- `npm run test:debug`: Debug tests
- `npm run test:e2e`: Run end-to-end tests

## License

This project is licensed under the UNLICENSED license.

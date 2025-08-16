# Uber Clone Backend

This backend is built with Node.js, Express, and MongoDB. It provides RESTful APIs for user and captain authentication, ride management, and integration with Google Maps for location and distance services.

## Project Structure

- **app.js**: Main Express app setup.
- **server.js**: Starts the HTTP server.
- **controllers/**: Request handlers for each resource.
- **db/**: MongoDB connection logic.
- **helpers/**: Utility functions (e.g., response formatting).
- **middlewares/**: Authentication middleware.
- **models/**: Mongoose models for User, Captain, Ride, and BlacklistToken.
- **routes/**: Express routers for Users, Captains, Rides, and Maps.
- **services/**: Business logic for each resource.
- **utils/**: Constants.

## Routers Overview

### 1. User Router (`/users`)

Handles user registration, login, profile, and logout.

- **POST `/register`**

  - **Body:**
    - `email` (string, required)
    - `password` (string, min 6 chars, required)
    - `fullname.firstname` (string, min 3 chars, required)
    - `fullname.lastname` (string, optional)
  - **Response:** User object and JWT token.

- **POST `/login`**

  - **Body:**
    - `email` (string, required)
    - `password` (string, min 6 chars, required)
  - **Response:** User object and JWT token.

- **GET `/`**

  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Response:** User profile.

- **GET `/logout`**
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Response:** Success message.

---

### 2. Captain Router (`/captains`)

Handles captain registration, login, profile, and logout.

- **POST `/register`**

  - **Body:**
    - `email` (string, required)
    - `password` (string, min 6 chars, required)
    - `fullname.firstname` (string, min 3 chars, required)
    - `fullname.lastname` (string, optional)
    - `vehicle.color` (string, min 3 chars, required)
    - `vehicle.plate` (string, min 3 chars, required)
    - `vehicle.capacity` (number, min 1, required)
    - `vehicle.vehicleType` (string, one of: car, motorcycle, auto)
  - **Response:** Captain object and JWT token.

- **POST `/login`**

  - **Body:**
    - `email` (string, required)
    - `password` (string, min 6 chars, required)
  - **Response:** Captain object and JWT token.

- **GET `/`**

  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Response:** Captain profile.

- **GET `/logout`**
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Response:** Success message.

---

### 3. Ride Router (`/rides`)

Handles ride creation.

- **POST `/create`**
  - **Headers:**
    - `Authorization: Bearer <token>` (User)
  - **Body:**
    - `pickupLocation` (string, min 3 chars, required)
    - `dropOffLocation` (string, min 3 chars, required)
    - `vehicleType` (string, one of: car, motorcycle, auto)
  - **Response:** Ride object.

---

### 4. Maps Router (`/maps`)

Provides Google Maps integration for captains.

- **GET `/get-coordinates`**

  - **Headers:**
    - `Authorization: Bearer <token>` (Captain)
  - **Query:**
    - `address` (string, min 3 chars, required)
  - **Response:** `{ lat, lng }`

- **GET `/get-distance-time`**

  - **Headers:**
    - `Authorization: Bearer <token>` (Captain)
  - **Query:**
    - `origin` (string, min 3 chars, required)
    - `destination` (string, min 3 chars, required)
  - **Response:** Distance and duration object.

- **GET `/get-suggestions`**
  - **Headers:**
    - `Authorization: Bearer <token>` (Captain)
  - **Query:**
    - `input` (string, min 3 chars, required)
  - **Response:** Array of location suggestions.

---

## Authentication

- JWT tokens are used for authentication.
- Tokens are sent via `Authorization: Bearer <token>` header.
- Logout endpoints blacklist tokens for security.

## Environment Variables

- `PORT`: Server port.
- `DB_URL`: MongoDB connection string.
- `JWT_SECRET`: JWT signing key.
- `GOOGLE_MAPS_API_KEY`: Google Maps API key.

---

## Getting Started

1. Install dependencies:  
   `npm install`
2. Set up `.env` file (see sample in repo).
3. Start server:  
   `npm start`

---

## License

MIT

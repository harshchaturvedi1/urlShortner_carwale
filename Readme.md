# URL Shortener Project

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [System Design](#system-design)
5. [API Documentation](#api-documentation)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Scalability and Performance](#scalability-and-performance)

---

## Introduction

The **URL Shortener Project** is a web application that allows users to shorten long URLs, track click analytics, and manage their shortened URLs. It is built to handle millions of requests efficiently with features like caching, rate-limiting, and authentication.

---

## Features

- Shorten long URLs.
- Track click analytics for shortened URLs.
- User authentication and authorization.
- Pagination for listing URLs.
- Rate-limiting to prevent abuse.
- Caching with Redis for faster redirections.
- Responsive frontend built with React.

---

## Technologies Used

### Backend:

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Redis**: In-memory caching.
- **JWT**: Authentication.
- **Mongoose**: MongoDB ODM.

### Frontend:

- **React**: JavaScript library for UI.
- **Material-UI**: UI component library.
- **React Router**: Client-side routing.
- **Axios**: API communication.

### Others:

- **Docker**: Containerization.
- **dotenv**: Environment variable management.

---

## System Design

### Architecture

1. **Frontend**:

   - Built with React and Material-UI.
   - Communicates with backend using Axios.

2. **Backend**:

   - RESTful APIs built with Express.js.
   - MongoDB for storing URLs and user data.
   - Redis for caching and improving redirection performance.
   - Rate limiter to prevent excessive requests.

3. **Database**:
   - MongoDB was chosen for flexibility and scalability.
   - Redis for caching frequently accessed data (e.g., analytics, URLs).

---

## API Documentation

### Authentication APIs

#### POST `/api/auth/register`

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "User registered successfully",
    "user": {
      "id": "12345",
      "username": "testuser",
      "email": "test@example.com"
    },
    "token": "jwt-token"
  }
  ```

#### POST `/api/auth/login`

- **Description**: Login a user.
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Login successful",
    "user": {
      "id": "12345",
      "username": "testuser",
      "email": "test@example.com"
    },
    "token": "jwt-token"
  }
  ```

### URL Shortener APIs

#### POST `/api/url/shorten`

- **Description**: Create a shortened URL.
- **Request Body**:
  ```json
  {
    "originalUrl": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "URL shortened successfully",
    "shortUrl": "http://localhost:3005/abc123",
    "shortId": "abc123"
  }
  ```

#### GET `/:shortId`

- **Description**: Redirect to the original URL.
- **Response**: Redirects to the original URL.

#### GET `/api/url/analytics/:shortId`

- **Description**: Retrieve analytics for a specific short URL.
- **Response**:
  ```json
  {
    "shortId": "abc123",
    "originalUrl": "https://example.com",
    "clickCount": 5,
    "createdAt": "2023-01-01T12:00:00Z"
  }
  ```

#### GET `/api/url/user-urls?page=1&limit=10`

- **Description**: Retrieve all URLs created by the authenticated user with pagination.
- **Response**:
  ```json
  {
    "urls": [
      {
        "shortId": "abc123",
        "originalUrl": "https://example.com",
        "clickCount": 5
      }
    ],
    "totalPages": 1,
    "currentPage": 1
  }
  ```

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:harshchaturvedi1/urlShortner_carwale.git
   cd url-shortener
   ```

2. **Backend Setup**:

   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Frontend Setup**:

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   ```

4. **Run Application**:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

---

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Register and log in to start shortening URLs.
3. View analytics for your shortened URLs.

---

## Scalability and Performance

### Rate Limiter

- Prevents abuse by limiting requests to 100 per 15 minutes per IP.
- Uses `express-rate-limit` middleware.

### Redis Caching

- Speeds up redirections by caching URL mappings and analytics.
- Reduces load on the MongoDB database.

### NoSQL vs SQL

- **Why MongoDB?**
  - Flexible schema for evolving data models.
  - High scalability and horizontal scaling.
  - Suitable for hierarchical data like URLs and analytics.
- SQL would require more rigid schema and joins, which could impact performance.

### Future Enhancements

- Add a load balancer for better traffic distribution.
- Scale Redis and MongoDB with replicas and clustering.
- Add monitoring tools like Prometheus and Grafana.

---

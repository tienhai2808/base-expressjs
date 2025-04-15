# Base Express.js Backend

A foundational Express.js backend application with authentication, user management, MongoDB integration, and Redis caching.

## Features

- 🔐 Authentication system with JWT
- 👥 User management
- 📄 MongoDB database integration
- ⚡ Redis caching
- 🔒 Secure cookie handling
- 🌐 CORS support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
PORT=your_port
MONGO_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
```

## Build and Run with Docker Compose

```bash
docker-compose up --build
```

## Project Structure

```
src/
├── config/         # Database and Redis configuration
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/        # Database models
├── routes/        # API routes
└── utils/         # Utility functions
```

## API Routes

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - User login

### Users
- `GET /api/users` - Get users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user

## Running the Application

### Development
```bash
npm run dev
```

The server will start on the configured port with hot-reload enabled.

## Technologies Used

- Express.js - Web framework
- MongoDB - Database
- Redis - Caching
- JWT - Authentication
- bcryptjs - Password hashing
- cors - CORS middleware
- cookie-parser - Cookie handling
- dotenv - Environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
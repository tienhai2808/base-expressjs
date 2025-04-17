# Base Express.js Backend

A foundational Express.js backend application with authentication, user management, MongoDB integration, and Redis caching.

## Features

- 🔐 Authentication system with JWT
- 👥 User management
- 📄 MongoDB database integration
- ⚡ Redis caching
- 🐳 Docker containerization
- 🔒 Secure password hashing with bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Docker and Docker Compose (optional)

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone [repository-url]
cd base-expressjs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
```

4. Start the application:
```bash
npm start
```

### Using Docker

Simply run:
```bash
docker-compose up --build
```

The application will be available at http://localhost:3000

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

## Project Structure

```
├── docker-compose.yml    # Docker compose configuration
├── Dockerfile           # Docker container configuration
├── package.json        # Project dependencies and scripts
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   └── index.js       # Application entry point
```

## Technologies Used

- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Redis**: In-memory data structure store for caching
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Docker**: Containerization platform

## Development

### Available Scripts

- `npm start`: Start the application
- `npm test`: Run tests (when implemented)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Application port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/myapp |
| REDIS_HOST | Redis host | localhost |
| REDIS_PORT | Redis port | 6379 |
| JWT_SECRET | JWT signing secret | - |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
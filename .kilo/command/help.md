# /help - CLI Guide

## Available Commands

### Core Kilo Commands
- `/help` - Show this CLI guide
- `/files [pattern]` - List project files matching pattern
- `/config` - Show project configuration
- `/lint` - Run ESLint
- `/test` - Run tests
- `/dev` - Start development server

### Project Scripts (npm)
```
npm run dev     - Start development server with nodemon
npm run start   - Start production server
npm run lint    - Run ESLint on source files
npm run test    - Run Jest tests with coverage
npm run format  - Run Prettier
```

### Docker Commands
```
docker-compose up -d   - Start containers
docker-compose down    - Stop containers
```

### Quick Actions
- `/stage-all` - Stage all changes (git add -A)
- `/cleanup` - Remove untracked files, reset line endings

## Project Structure
```
src/
├── app.js           - Express app configuration
├── server.js        - Server entry point
├── config/          - Environment, DB, Redis config
├── middlewares/     - Auth, validation, error handlers
├── modules/         - Feature modules (users, auth, health, upload)
├── routes/          - Route definitions
├── utils/           - Utility functions
└── tests/           - Test files
```

## Environment Variables (from .env.example)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - JWT signing secret (change in production!)
- `CORS_ORIGIN` - CORS allowed origin
- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection string
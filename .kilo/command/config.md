# /config - Configuration Inspector

Shows project configuration including environment variables, npm scripts, and available tools.

## Usage
```
/config              - Show all configuration
/config env          - Show environment variables
/config scripts      - Show npm scripts
/config docker       - Show Docker configuration
```

## Project Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint on source files |
| `npm run test` | Run Jest tests with coverage |
| `npm run format` | Run Prettier formatter |

## Environment Variables
Required for development:
- `NODE_ENV=development`
- `PORT=3000`
- `JWT_SECRET` - Authentication secret

Optional services:
- `MONGODB_URI` - MongoDB connection
- `REDIS_URL` - Redis connection

## Docker Setup
The project includes docker-compose.yml for containerized development with MongoDB and Redis services.
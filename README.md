# Express API Skeleton

Production-ready Express REST API starter. Clone, configure, and ship.

## Features

- **Security** — Helmet, CORS, rate limiting, XSS/NoSQL/HPP sanitization, JWT auth
- **Validation** — Joi schemas on all inputs, consistent error format
- **Observability** — Structured logging, request IDs, health + readiness endpoints, Swagger UI
- **Infra** — Docker multi-stage build, docker-compose with MongoDB + Redis, graceful shutdown
- **DX** — ESLint 9, Prettier, Husky pre-commit, Jest + Supertest, Makefile, nodemon

## Quick Start

```bash
git clone https://github.com/kstra3/express-api-skeleton.git
cd express-api-skeleton
cp .env.example .env
npm install
npm run dev
```

Server: `http://localhost:3000`  
Swagger UI: `http://localhost:3000/api-docs`

## Environment Variables

| Variable | Default | Required in prod |
|---|---|---|
| `NODE_ENV` | `development` | — |
| `PORT` | `3000` | — |
| `JWT_SECRET` | — | **Yes** |
| `JWT_EXPIRES_IN` | `7d` | — |
| `API_KEY` | *(disabled)* | — |
| `MONGODB_URI` | *(skipped)* | — |
| `REDIS_URL` | *(skipped)* | — |
| `CORS_ORIGIN` | `*` | — |
| `RATE_LIMIT_WINDOW_MS` | `900000` | — |
| `RATE_LIMIT_MAX` | `100` | — |
| `ENABLE_REQUEST_LOG` | `true` | — |

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Liveness check |
| GET | `/api/health/ready` | No | Readiness + dependency checks |
| GET | `/api/users` | No | List users |
| POST | `/api/users` | No | Create user |
| POST | `/api/auth/register` | No | Register (returns JWT) |
| POST | `/api/auth/login` | No | Login (returns JWT) |
| POST | `/api/upload` | No | Upload file (multipart/form-data) |

Protected routes should use the `authMiddleware` from `src/middlewares/auth.js`.

## Project Structure

```
src/
├── app.js              # Express app + middleware stack
├── server.js           # Entry point, DB/Redis connect, graceful shutdown
├── config/
│   ├── env.js          # Joi-validated environment config
│   ├── db.js           # MongoDB connection
│   ├── redis.js        # Redis connection
│   └── swagger.js      # Swagger/OpenAPI setup
├── middlewares/
│   ├── auth.js         # JWT Bearer verification
│   ├── apiKey.js       # Optional API key gate
│   ├── rateLimiter.js  # In-memory LRU rate limiter
│   ├── requestId.js    # X-Request-Id header
│   ├── timeout.js      # Request timeout (next(err) on expiry)
│   ├── validate.js     # Joi body validation
│   ├── upload.js       # Multer file upload
│   ├── notFound.js     # 404 handler
│   └── errorHandler.js # Centralised error formatter
├── modules/
│   ├── health/         # Liveness + readiness
│   ├── auth/           # Register + login (JWT stub)
│   ├── users/          # CRUD (in-memory stub)
│   └── upload/         # File upload
├── models/
│   └── User.js         # Mongoose User schema
├── routes/
│   └── index.js        # Mounts all module routers
├── utils/
│   ├── catchAsync.js   # Async error wrapper
│   ├── errors.js       # createError helper
│   ├── logger.js       # Structured console logger
│   └── response.js     # ApiResponse class
└── validations/
    └── user.validation.js
```

## Adding a Module

1. Create `src/modules/<name>/` with `routes.js`, `controller.js`, `service.js`, `validations.js`
2. Mount in `src/routes/index.js`
3. Add Joi schemas and `validateBody` middleware on write routes
4. Wrap async handlers in `catchAsync`

## Docker

```bash
# Start API + MongoDB + Redis
docker-compose up -d

# Stop
docker-compose down
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm start` | Production server |
| `npm test` | Jest + coverage |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier |
| `make help` | List all Make targets |

## License

MIT

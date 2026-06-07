.PHONY: help install dev start test lint format clean docker-up docker-down

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start development server"
	@echo "  make start      - Start production server"
	@echo "  make test       - Run tests with coverage"
	@echo "  make lint       - Run ESLint"
	@echo "  make format     - Run Prettier"
	@echo "  make clean      - Remove node_modules and coverage"
	@echo "  make docker-up  - Start with Docker Compose"
	@echo "  make docker-down - Stop Docker Compose"

install:
	npm install

dev:
	npm run dev

start:
	npm start

test:
	npm test

lint:
	npm run lint

format:
	npm run format

clean:
	rm -rf node_modules coverage dist .tmp

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

.ONESHELL:
SHELL := /bin/bash

.PHONY: init up logs sh.api fmt lint migrate test e2e

init: ## install hooks, copy env example
	 test -f .env || cp .env.example .env
	 ( cd backend && poetry install )
	 ( cd frontend && npm ci )

up: ## start all services
	docker compose up -d --build

logs:
	docker compose logs -f --tail=200 api web

sh.api:
	docker compose exec api bash

fmt:
	cd backend && ruff check --fix . && black . && isort .
	cd frontend && npx prettier --write "src/**/*.{ts,tsx,md}"

lint:
	cd backend && ruff check . && mypy app
	cd frontend && npm run typecheck && npm run lint

migrate:
	cd backend && alembic revision --autogenerate -m "auto" && alembic upgrade head

test:
	cd backend && pytest -q
	cd frontend && npm test -- --watch=false

e2e:
	cd frontend && npx playwright install --with-deps && npm run e2e

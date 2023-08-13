test:
	cp .env.example .env && docker compose -f docker-compose.dev.yml run --build app npm run test

run-dev:
	docker compose -f docker-compose.dev.yml build  --no-cache
	cp .env.example .env && docker compose -f docker-compose.dev.yml up

run-prod:
	docker compose -f docker-compose.yml build  --no-cache
	cp .env.example .env && docker compose -f docker-compose.yml up
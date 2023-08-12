test:
	cp .env.example .env && docker compose -f docker-compose.dev.yml run --build app npm run test

run-dev:
	cp .env.example .env && docker compose -f docker-compose.dev.yml up --force-recreate

run-prod:
	cp .env.example .env && docker compose -f docker-compose.yml up --force-recreate
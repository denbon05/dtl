ci:
	npm run build
	npm run lint
	npm run test:unit
	npm run test:e2e

start:
	npm run dev

test:
	npm run test:unit
	npm run test:e2e

lint:
	npm run lint

format:
	npx eslint --fix .
	npx prettier --write .

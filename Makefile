install:
	npm ci

build:
	rm -rf frontend/build
	npm run build

start:
	npx start-server -s ./frontend/build

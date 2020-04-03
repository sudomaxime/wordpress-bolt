install: 
	composer install \
	wait; \
	cd ./cli; \
	npm install \
	wait; \
	ts-node ./src/index.ts \
	wait; \
	rm -rf node_modules
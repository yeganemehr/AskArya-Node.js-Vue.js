FROM node:lts-alpine
ARG APP_ENV
RUN apk add --no-cache git && \
	git clone https://github.com/arya107/AskArya-Node.js-Vue.js app && \
	cd app/Client && \
	mv src/Layouts src/layouts && \
	npm install && \
	npm run build && \
	cd ../Server && \
	npm install;
RUN if [ "$APP_ENV" = "production" ] ; then rm -fr /app/Client; fi

WORKDIR /app/Server
CMD [ "node", "server.js"]

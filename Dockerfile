FROM node:10-alpine as build_ui

WORKDIR /app
COPY . /app/
RUN apk add --no-cache yarn && yarn install && yarn build:all

FROM node:10-alpine as server_deps

WORKDIR /app
COPY . /app/
RUN apk add --no-cache yarn && yarn install --production

FROM alpine:3.8

LABEL AUTHOR="Jan Kuri" AUTHOR_EMAIL="jkuri88@gmail.com"

WORKDIR /app

COPY --from=build_ui /usr/local/bin/node /usr/bin
COPY --from=build_ui /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
COPY --from=build_ui /app/dist ./dist
COPY --from=server_deps /app/node_modules ./node_modules

EXPOSE 4090

CMD ["node", "/app/dist/server.js"]

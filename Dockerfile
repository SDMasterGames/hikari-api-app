FROM node:16.15.1-alpine

WORKDIR /hikari-api-app/

COPY package.json yarn.lock ./

RUN yarn

COPY . .

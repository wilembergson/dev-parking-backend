# syntax = docker/dockerfile:1.2
FROM node:lts-alpine3.16
WORKDIR /usr/src/backend

ENV PORT=$PORT
ENV JWT_SECRET=$JWT_SECRET
ENV DB_NAME=$DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD

COPY ./prisma .
COPY ./package.json .
COPY ./tsconfig.json .

RUN npm install
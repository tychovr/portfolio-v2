FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable || true
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile || yarn install --immutable
COPY . .
RUN yarn build

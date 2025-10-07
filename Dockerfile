FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

RUN addgroup -g 1001 -S nodejs && adduser -S crauser -u 1001 -G nodejs
USER crauser

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
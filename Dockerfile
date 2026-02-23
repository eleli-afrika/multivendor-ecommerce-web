# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite reads VITE_* at build-time. Prefer BuildKit secret from CI.
RUN --mount=type=secret,id=MAIN_ENV_FILE \
    sh -c 'if [ -f /run/secrets/MAIN_ENV_FILE ]; then cp /run/secrets/MAIN_ENV_FILE .env; fi; npm run build'

FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]

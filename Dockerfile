# Stage 1: Builder
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . .

RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Start the app
CMD ["npx", "next", "start"]

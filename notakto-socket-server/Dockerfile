FROM node:22-alpine

RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
COPY . .

EXPOSE 8000
CMD ["pnpm", "start"]

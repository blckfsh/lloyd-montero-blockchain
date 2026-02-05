FROM node:20-alpine

WORKDIR /app

# Prisma needs OpenSSL
RUN apk add --no-cache openssl

# Enable pnpm
RUN corepack enable

# Install dependencies first for better layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source, generate Prisma client, and build
COPY . .
RUN pnpm prisma generate
RUN pnpm build

ENV NODE_ENV=development
EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start:prod"]


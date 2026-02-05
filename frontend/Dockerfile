FROM node:20-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Install dependencies first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Default to development for network selection during build
ENV NEXT_PUBLIC_APP_ENV=development

# Copy source and build
COPY . .
RUN pnpm build

ENV NODE_ENV=development
EXPOSE 3000

CMD ["pnpm", "start"]


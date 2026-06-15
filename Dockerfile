FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

FROM node:22-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY . .
USER appuser
EXPOSE 3000
CMD ["node", "index.js"]
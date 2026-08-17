FROM node:22-alpine

# Installing dependencies required by Strapi/native packages
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git


WORKDIR /app

RUN corepack enable

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package manifests
COPY cms/package.json ./cms/package.json
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy Strapi application
COPY cms ./cms

WORKDIR /app/cms

RUN chown -R node:node /app

USER node

RUN pnpm build

EXPOSE 1337

CMD ["pnpm", "develop"]
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache curl
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache curl
COPY package*.json ./
ENV npm_config_ignore_scripts=true
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE ${PORT}

CMD ["node", "dist/src/index.js"]
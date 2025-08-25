
FROM node:20-alpine AS build

RUN apk add --no-cache curl bash

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build:prod

RUN mkdir -p /app/build
RUN cp -r /app/frontend/build/* /app/build/

WORKDIR /app/backend
COPY backend/package*.json ./
ENV npm_config_ignore_scripts=true
RUN npm ci
COPY backend/ .
RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache nginx bash

WORKDIR /app

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/backend /app/backend

COPY --from=build /app/backend/node_modules /app/backend/node_modules

COPY nginx.conf /etc/nginx/nginx.conf

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 80

CMD ["/app/start.sh"]
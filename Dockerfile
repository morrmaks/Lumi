FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build:prod


FROM node:20-alpine AS backend-build
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/build /usr/share/nginx/html

COPY --from=backend-build /app/dist /app/backend/dist
COPY --from=backend-build /app/node_modules /app/backend/node_modules
COPY backend/package*.json /app/backend/

ENV NODE_ENV=production
ENV PORT=4000
#ENV DB_URL=${DB_URL}
#ENV JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
#ENV JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
#ENV SMTP_HOST=${SMTP_HOST}
#ENV SMTP_PORT=${SMTP_PORT}
#ENV SMTP_USER=${SMTP_USER}
#ENV SMTP_PASSWORD=${SMTP_PASSWORD}
#ENV API_URL=${API_URL}
#ENV CLIENT_URL=${CLIENT_URL}
#ENV YOO_SHOP_ID=${YOO_SHOP_ID}
#ENV YOO_SECRET_KEY=${YOO_SECRET_KEY}

EXPOSE 80

CMD sh -c "node /app/backend/dist/src/index.js & nginx -g 'daemon off;'"
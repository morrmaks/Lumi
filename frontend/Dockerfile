FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY ../.. .

ARG BASE_API
ARG STATIC
ARG YA_SUGGEST_API_KEY

RUN echo "BASE_API=$BASE_API, STATIC=$STATIC, YA_SUGGEST_API_KEY=$YA_SUGGEST_API_KEY"

ENV BASE_API=$BASE_API
ENV STATIC=$STATIC
ENV YA_SUGGEST_API_KEY=$YA_SUGGEST_API_KEY

RUN npm run build:prod

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
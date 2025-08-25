#!/bin/sh
# Запуск backend
node /app/backend/dist/src/index.js &

# Запуск nginx
nginx -g 'daemon off;'
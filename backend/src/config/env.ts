import { getEnv } from "@/utils/env";
import "dotenv/config";

export const env = {
  PORT: Number(getEnv("PORT")) || 4000,
  NODE_ENV: getEnv("NODE_ENV"),
  DB_URL: getEnv("DB_URL"),
  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  SMTP_HOST: getEnv("SMTP_HOST"),
  SMTP_PORT: getEnv("SMTP_PORT"),
  SMTP_USER: getEnv("SMTP_USER"),
  SMTP_PASSWORD: getEnv("SMTP_PASSWORD"),
  API_URL: getEnv("API_URL"),
  CLIENT_URL:
    getEnv("NODE_ENV") === "production"
      ? getEnv("CLIENT_URL")
      : getEnv("CLIENT_DEV_URL"),
  YOO_SHOP_ID: getEnv("YOO_SHOP_ID"),
  YOO_SECRET_KEY: getEnv("YOO_SECRET_KEY"),
  S3_ACCESS_KEY: getEnv("S3_ACCESS_KEY"),
  S3_SECRET_KEY: getEnv("S3_SECRET_KEY"),
  S3_BUCKET: getEnv("S3_BUCKET"),
};

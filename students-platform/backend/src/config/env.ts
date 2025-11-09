import 'dotenv/config';

export const env = {
  MONGO_URI: process.env.MONGO_URI ?? '',
  PORT: Number(process.env.PORT ?? 3000),
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:5173",
  API_URL:
      process.env.API_URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
};

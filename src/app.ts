import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/**
 * CORS Configuration
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

/**
 * Parse JSON Body
 */
app.use(express.json());

/**
 * Parse URL Encoded Body
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Parse Cookies
 */
app.use(cookieParser());

/**
 * Health Check
 */
app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "JWT Auth Server is running",
  });
});

export default app;

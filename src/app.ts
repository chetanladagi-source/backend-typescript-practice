import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import usersRoute from "./routes/users.route";

dotenv.config();

const app = express();

/**
 * CORS Configuration
 */
app.use(
  cors({
    origin: "http://localhost:5174",
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

app.use("/users", usersRoute);
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

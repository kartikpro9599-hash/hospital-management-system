import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./api/index.js";

const app = express();
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS"));
      }
    },
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);

export { app };

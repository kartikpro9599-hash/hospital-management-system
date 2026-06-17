import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:5173"];
const pepper = process.env.PEPPER;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS"));
      }
    },
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database:", err),
  );

app.get("/", async (req, res) => {
  res.json({
    message: "server is running",
  });
});
app.post("/login", async (req, res) => {
  const { username, password, loginType, cnfPassword } = req.body;
  if (
    cnfPassword !== undefined ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof loginType !== "string" ||
    username.trim() === "" ||
    password.trim() === "" ||
    loginType.trim() === ""
  ) {
    console.log(
      "wrong portal login or user trying to manipulate browsers local storage",
    );
    return res.status(400).json({
      success: false,
      message: "wrong portal please click on login for login",
    });
  } else {
    console.log("login request generated");
    const authenticatedUser = jwt.sign(username, process.env.JWTSIGN);
    console.log(authenticatedUser);
    return res.status(200).json({
      success: true,
      message: "login successful",
    });
  }
});
app.post("/create-account", async (req, res) => {
  console.log(req.body);
  const { username, password, loginType, cnfPassword } = req.body;
  if (
    cnfPassword === undefined ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    console.log("values are missing or user done a browser manipulation");
    return res.status(400).json({
      success: false,
      message: "Values are missing",
    });
  }
  if (password !== cnfPassword) {
    console.log("account creation request false");
    return res.status(400).json({
      success: false,
      message: "Password does not match",
    });
  }
  console.log("account creation request true");
  bcrypt.hash(cnfPassword + pepper, 10, function (err, hash) {
    if (err) console.log(err);
    console.log(hash);
    // Store hash in your password DB.
  });
  return res.status(200).json({
    success: true,
    message: "login successful",
  });
});
app.listen(PORT, () => {  console.log(`Server running on port ${PORT}`); });
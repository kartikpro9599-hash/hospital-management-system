import express from 'express';
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db.js";
import { createAccountValidator } from "../shared/validator.js";
import isWhitelisted from "../shared/whitelisting_email.domain.js";

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
  const { password, email } = req.body;

  const { data, error } = createAccountValidator.safeParse(req.body);
  console.log(data);

  if (error) {
    console.log("values are missing or user done a browser manipulation");
    return res.status(400).json({
      success: false,
      message: error.issues[0].message,
    });
  }

  if (!isWhitelisted(email)) {
    console.log("email is invalid, user done a browser manipulation");
    return res.status(400).json({
      success: false,
      message:
        "email is invalid please use personal email providers like google, live, yahoo, etc",
    });
  }

  console.log("account creation request true");

  const hash = await bcrypt.hash(password + pepper, 10, function (err, hash) {
    if (err) console.log(err);
    console.log(hash);
    // Store hash in your password DB.
  });

  return res.status(200).json({
    success: true,
    message: "Account Created Succesfully",
  });
});
app.listen(PORT, () => {  console.log(`Server running on port ${PORT}`); });
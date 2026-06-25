import { app } from "./app.js";
import { loginLimiter, globalRateLimiter } from "./middleware/rateLimiter.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db.js";
import {
  createAccountValidator,
  loginAccountValidator,
} from "../shared/validator.js";
import isWhitelisted from "../shared/whitelisting_email.domain.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

const pepper = process.env.PEPPER;

app.get("/", globalRateLimiter, async (req, res) => {
  res.json({
    message: "server is running",
  });
});

app.post("/login", loginLimiter, async (req, res) => {
  const { data, error } = loginAccountValidator.safeParse(req.body);
  if (error) {
    console.log(
      "wrong portal login or user trying to manipulate browsers local storage",
    );
    return res.status(400).json({
      success: false,
      message: error.issues[0].message,
    });
  }
  try {
    const result = await db.query(
      "SELECT password FROM patient where username = $1",
      [data.username],
    );
    if (!result.rowCount) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const hashPassword = result.rows[0].password;
    const isMatch = await bcrypt.compare(data.password + pepper, hashPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ username: data.username }, process.env.JWTSIGN, {
      expiresIn: "5m",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 5000,
      })
      .status(200)
      .json({
        success: true,
        message: "login successful",
      });
  } catch (error) {
    console.log("error from login pipeline : ", error);
    return res.status(500).json({
      success: false,
      message: "Login faild due to internal server error",
    });
  }
});

app.post("/create-account", loginLimiter, async (req, res) => {
  const { data, error } = createAccountValidator.safeParse(req.body);

  if (error) {
    console.log("values are missing or user done a browser manipulation");
    return res.status(400).json({
      success: false,
      message: error.issues[0].message,
    });
  }

  if (!isWhitelisted(data.email)) {
    console.log("email is invalid, user done a browser manipulation");
    return res.status(400).json({
      success: false,
      message:
        "email is invalid please use personal email providers like google, live, yahoo, etc",
    });
  }
  try {
    const result = await db.query(
      "SELECT username,email,phoneNo FROM patient where username = $1 OR email = $2 OR phoneNo= $3 ",
      [data.username, data.email, data.phoneNo],
    );
    if (result.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: "email or phoneNo is already exist",
      });
    }

    const hash = await bcrypt.hash(data.password + pepper, 10);
    console.log("account creation request true");

    await db.query(
      "INSERT INTO patient(fName,lName,username,age,gender,phoneNo,email,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        data.fName,
        data.lName,
        data.username,
        data.age,
        data.gender,
        data.phoneNo,
        data.email,
        hash,
      ],
    );
    const token = jwt.sign({ username: data.username }, process.env.JWTSIGN, {
      expiresIn: "5m",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 5000,
      })
      .status(201)
      .json({
        success: true,
        message: "Account Created Succesfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed due to an internal server error",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

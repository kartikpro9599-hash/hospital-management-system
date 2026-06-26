import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db.js";

import { createAccountValidator } from "../../shared/validator.js";
import { loginLimiter } from "../middleware/rateLimiter.js";
import isWhitelisted from "../../shared/whitelisting_email.domain.js";

const router = express.Router();
const pepper = process.env.PEPPER;

router.post("/create-account", loginLimiter, async (req, res) => {
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
      const existedAccount = result.rows[0];
      if (existedAccount.username === data.username) {
        // google search "creating account username is exists status code"
        return res.status(409).json({
          success: false,
          message: "username is already taken",
        });
      }

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

export default router;

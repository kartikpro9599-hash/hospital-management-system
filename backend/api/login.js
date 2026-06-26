import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db.js";

import { loginAccountValidator } from "../../shared/validator.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
const pepper = process.env.PEPPER;

router.post("/login", loginLimiter, async (req, res) => {
  const { data, error } = loginAccountValidator.safeParse(req.body);
  console.log("i am from login route ", data);
  console.log("login route test successfully in separate file");
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

export default router;

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../db.js";

import { loginAccountValidator } from "../../../shared/validator.js";
import { loginLimiter } from "../../middleware/rateLimiter.js";

const router = express.Router();
const pepper = process.env.PEPPER;

router.post("/auth/login", loginLimiter, async (req, res) => {
  console.log(req.body);
  const { data, error } = loginAccountValidator.safeParse(req.body);

  if (error) {
    console.log("user trying to manipulate browser frontend logic");
    return res.status(400).json({
      success: false,
      message: error.issues[0].message,
    });
  }
  try {
    const result = await db.query(
      "SELECT fName, lName, password FROM patient where username = $1",
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
        message: "Username or Password is incorrect",
      });
    }

    const refreshToken = jwt.sign(
      { username: data.username },
      process.env.JWTSIGN_REFRESH,
      {
        expiresIn: "1h",
      },
    );
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.JWTSIGN_ACCESS,
      {
        expiresIn: "15m",
      },
    );

    return res
      .cookie("token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 1000 * 60,
      })
      .status(200)
      .json({
        success: true,
        token: accessToken,
        message: "login successful",
        user: {
          fName: result.rows[0].fName,
          lName: result.rows[0].lName,
        },
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

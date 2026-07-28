import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../db.js";

import { loginAccountValidator } from "../../../shared/validator.js";
import { loginLimiter } from "../../middleware/rateLimiter.js";

const loginRoute = express.Router();
const pepper = process.env.PEPPER;

loginRoute.post("/auth/login", loginLimiter, async (req, res) => {
  const { data, error } = loginAccountValidator.safeParse(req.body);

  if (error) {
    console.log("user trying to manipulate browser frontend logic");
    return res.status(400).json({
      success: false,
      message: error.issues[0].message,
    });
  }
  try {
    const whiteListUserType = {
      patient: "patients",
      doctor: "doctors",
      admin: "admins",
    };

    const type = whiteListUserType[data.loginType]; //lookup by key name in whiteListUser object

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Broken link or invalid User Login type",
      });
    }

    const result = await db.query(
      `SELECT id, fName, lName, password FROM ${type} where username = $1`,
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

    // refresh token making
    const refreshToken = jwt.sign(
      {
        userid: result.rows[0].id,
        userType: data.loginType,
        username: data.username,
      },
      process.env.JWTSIGN_REFRESH,
      {
        expiresIn: "1h",
      },
    );

    // refresh token store check whether same user is already login or not if yes then remove it and change new token

    await db.query(
      "INSERT INTO refreshtokens (userid, usertype, token) VALUES ($1, $2, $3) ON CONFLICT (userid, usertype) DO UPDATE SET token = EXCLUDED.token",
      [result.rows[0].id, data.loginType, refreshToken],
    );

    // access token making
    // const accessToken = jwt.sign(
    //   { username: data.username },
    //   process.env.JWTSIGN_ACCESS,
    //   {
    //     expiresIn: "15m",
    //   },
    // );

    return res
      .cookie("token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 1000 * 60,
      })
      .status(200)
      .json({
        success: true,
        message: "login successful",
        // token: accessToken,
        user: {
          fName: result.rows[0].fName,
          lName: result.rows[0].lName,
          username: data.username,
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

export default loginRoute;

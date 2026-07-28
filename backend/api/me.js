import express from "express";
import db from "../db.js";
import auth from "../middleware/authorised.js";
import jwt from "jsonwebtoken";

import { globalRateLimiter } from "../middleware/rateLimiter.js";

const findMe = express.Router();

findMe.get("/me", globalRateLimiter, auth, async (req, res) => {
  try {
    const data = await db.query("SELECT * from patients where username = $1", [
      req.user.username,
    ]);
    if (data.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const accessToken = jwt.sign(
      { username: data.rows[0].username },
      process.env.JWTSIGN_ACCESS,
      {
        expiresIn: "15m",
      },
    );
    return res.status(200).json({
      success: true,
      message: "User have valid credentials",
      token: accessToken,
      user: {
        fName: data.rows[0].fname,
        lName: data.rows[0].lName,
        username: data.rows[0].username,
      },
    });
  } catch (error) {
    console.log("error from findMe route : ", error);
    return res.status(500).json({
      success: false,
      message: "failed due to an internal server error",
    });
  }
});

export default findMe;

import express from "express";
import db from "../db.js";
import auth from "../middleware/authorised.js";

import { globalRateLimiter } from "../middleware/rateLimiter.js";

const findMe = express.Router();

findMe.get("/me", globalRateLimiter, auth, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT fName, lName from patient where username = $1",
      [req.user.username],
    );
    if (user.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User have valid credentials",
      user: {
        fName: user.rows[0].fname,
        lName: user.rows[0].lName,
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

import express from "express";
import auth from "../middleware/authorised.js";
import db from "../db.js";
const logoutRoute = express.Router();

logoutRoute.get("/logout", auth, async (req, res) => {
  try {
    const data = await db.query(
      "DELETE from refreshtokens where userid = $1 AND usertype = $2",
      [req.user.userid, req.user.userType],
    );
    if (data.rowCount === 0) {
      return res
        .clearCookie("token", { httpOnly: true, sameSite: "lax" })
        .status(200)
        .json({
          success: true,
          message: "user logout successfully",
        });
    }

    return res
      .clearCookie("token", { httpOnly: true, sameSite: "lax" })
      .status(200)
      .json({
        success: true,
        message: "user logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something wents wrong",
    });
  }
});

export default logoutRoute;

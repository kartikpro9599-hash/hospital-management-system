import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../db.js";

import { createAccountValidator } from "../../../shared/validator.js";
import { loginLimiter } from "../../middleware/rateLimiter.js";
import isWhitelisted from "../../../shared/whitelisting_email.domain.js";

const createAccountRoute = express.Router();
const pepper = process.env.PEPPER;

createAccountRoute.post(
  "/auth/create-account",
  loginLimiter,
  async (req, res) => {

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
        "SELECT username,email,phoneNo FROM patients where username = $1 OR email = $2 OR phoneNo= $3 ",
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

      await db.query("BEGIN");
      const patientId = await db.query(
        "INSERT INTO patients(fName,lName,username,age,gender,phoneNo,email,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
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
      console.log(patientId.rows[0].id);

      const refreshToken = jwt.sign(
        {
          userid: patientId.rows[0].id,
          userType: "patient",
          username: data.username,
        },
        process.env.JWTSIGN_REFRESH,
        {
          expiresIn: "1h",
        },
      );
      await db.query(
        "INSERT INTO refreshtokens(userid, usertype, token) VALUES ($1,'patient',$2)",
        [patientId.rows[0].id, refreshToken],
      );

      await db.query("COMMIT");

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
        .status(201)
        .json({
          success: true,
          token: accessToken,
          message: "Account Created Succesfully",
          user: {
            fName: data.fName,
            lName: data.lName,
          },
        });
    } catch (error) {
      await db.query("ROLLBACK");
      return res.status(500).json({
        success: false,
        message: "Registration failed due to an internal server error",
      });
    }
  },
);

export default createAccountRoute;

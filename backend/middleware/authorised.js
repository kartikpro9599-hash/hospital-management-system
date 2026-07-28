import jwt from "jsonwebtoken";
import db from "../db.js";

async function auth(req, res, next) {
  const refreshToken = req.cookies.token;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "token not found",
    });
  }
  try {
    if (req.body?.token) {
      const accessTokenValidation = req.body.token;

      const verifyAccess = jwt.verify(
        accessTokenValidation,
        process.env.JWTSIGN_ACCESS,
      );
      //currently my frontend does not send access token
      if (verifyAccess) {
        req.user = verifyAccess;
        next();
      }
    }
    const decode = jwt.verify(refreshToken, process.env.JWTSIGN_REFRESH);
    console.log(decode);
    const result = await db.query(
      "SELECT * from refreshtokens where userid = $1 AND usertype = $2",
      [decode.userid, decode.userType],
    );
    console.log(result);
    if (result.rowCount === 0 || result.rows[0].token !== refreshToken) {
      return res
        .clearCookie("token", { httpOnly: true, sameSite: "lax" })
        .status(401)
        .json({
          success: false,
          message: "you have been logout someone login in other device",
        });
    }
    req.user = decode;
    next();
  } catch (error) {
    console.log("error comes from authorization", error);
    return res.status(401).json({
      success: false,
      message: "invalid token or token is expired",
    });
  }
}
export default auth;

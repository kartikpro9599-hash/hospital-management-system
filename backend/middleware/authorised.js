import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const refreshToken = req.cookies.token;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "token not found",
    });
  }
  try {
    const accessTokenValidation = req.body.token;
    if (accessTokenValidation) {
      const verifyAccess = jwt.verify(refreshToken, process.env.JWTSIGN_ACCESS);

      if (verifyAccess) {
        return res.status(200).json({
          success: true,
          message: "Valid user",
        });
      }
    }

    const decode = jwt.verify(refreshToken, process.env.JWTSIGN_REFRESH);
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

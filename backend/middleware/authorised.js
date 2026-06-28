import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token not found",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWTSIGN);
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

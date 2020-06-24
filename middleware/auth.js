const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // 헤더에서 토큰 획득
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

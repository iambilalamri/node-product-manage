const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Autorization
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided!");

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token!");
  }
};

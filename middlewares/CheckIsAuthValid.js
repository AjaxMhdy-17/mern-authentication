const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("No token, authorization denied");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRATE);
      req.user = decoded.user;
      next() 
    } catch (error) {
      console.error(error);
      res.status(401).send("Token is not valid");
    }
  }
};

const jwt = require("jsonwebtoken");
require("dotenv").config()
module.exports = async(req, res, next) => {
    try {
      const jwtToken = req.header("token");
      if (!jwtToken) {
        console.log(5);
        return res.status(403).json("Not Authorise");
      }
      const payload = jwt.verify(jwtToken, process.env.jwtSecret);
      req.user = payload.user;
      console.log(req.user.id);
      next();
    } catch (err) {
      console.log(2);
      console.error(err.message);
      return res.status(403).json("Not Authorise");
    } 
};
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
        
      console.log("Token:", token);
console.log("JWT Secret:", process.env.JWT_SECRET);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded:", decoded);

      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
      console.log(error.message);
    return res.status(401).json({
      message: "Invalid token",
    
    });
  }
};

module.exports = protect;
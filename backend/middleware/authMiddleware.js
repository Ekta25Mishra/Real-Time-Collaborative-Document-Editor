const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // must be "Bearer <token>"
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1]; // split Bearer and token
    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("Decoded token:", decoded);

    req.user = { id: decoded.id }; // this is the key part
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
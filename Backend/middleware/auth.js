// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;

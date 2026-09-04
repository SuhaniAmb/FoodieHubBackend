const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {

  const bearerHeader = req.header('Authorization');
  console.log("FULL HEADER:", bearerHeader);

  if (!bearerHeader) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const token = bearerHeader.split(' ')[1]; // ✅ FIX
  console.log("PURE TOKEN:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;
    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message); // 🔥 debug
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;
// middlewares/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;

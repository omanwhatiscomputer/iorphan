const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {

  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded; 
    await next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authorization;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  console.log('Auth Middleware Triggered');
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


// Advanced middleware that fetches full user details (use in secure routes)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // console.log('Protect Middleware Triggered');
      console.log('Authorization Header:', req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token);
      const decoded = jwt.verify(token, "eW9%gE&12nx4X@Rvdz3pW!fhqz8MvKpF");
      console.log('Decoded Token:', decoded);
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) return res.status(401).json({ message: 'User not found' });
      console.log('User Found:', user);
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};



module.exports = {authMiddleware, protect};

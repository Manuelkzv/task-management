'use strict';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

//Import Controller

module.exports = (app) => {
  // Protected route
  app.get('/', verifyToken, (req, res) => {
    console.log('req.userId', req.userId);
    res.status(200).json({ message: 'Protected route accessed' });
  });

  // User registration
  app.post('/api/access/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });

      await user.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed' });
    }
  });

  // User login
  app.post('/api/access/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      return res.status(200).json({ username, token });
    } catch (error) {
      return res.status(500).json({ error: 'Login failed' });
    }
  });
};

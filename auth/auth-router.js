const router = require('express').Router();
const bcrypt = require('bcrypt');

const db = require('../database/dbConfig.js');
const authenticate = require('./authenticate-middleware.js');

router.post('/register', async (req, res) => {
  // implement registration
  const {username, password} = req.body;

  // field check
  if (username && password) {
    const hash = bcrypt.hashSync(password, 6);

    try {
      const register = await db('users').insert({ username, password: hash });

      // if register successful
      if (register) {
        res.status(201).json({
          message: 'Thank you for registering as a user!'
        })
      }
    } catch (err) {
      // failure to register
      res.status(500).json({
        message: err.message
      })
    }
  } else {
    res.status(500).json({
      message: 'All required fields not found'
    })
  }
});

router.post('/login', authenticate, async(req, res) => {
  // implement login
  res.status(202).json({
    message: 'thank you'
  })
});

module.exports = router;

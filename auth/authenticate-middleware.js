const bcrypt = require('bcrypt');

const db = require('../database/dbConfig.js');

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await db.select('password').from('users').first();
    
    if (bcrypt.compareSync(password, user.password)) {
      next();
    } else {
      res.status(401).json({ you: 'shall not pass!' });
    }
  } catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
}

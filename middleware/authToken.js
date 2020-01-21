const jwt = require('jsonwebtoken');
const config = require('config');

const authToken = (req,res,next) => {
  // check if there is a token in the header
  const token = req.header('auth-token');
  if(!token){
    return res.status(400).json({'Error':'User has not provided token'});
  }

  try {
    // verify token has not been tampered with
    const verifyToken = jwt.verify(token, config.get('jwtSecret'))
    req.userID = verifyToken.userID
    next();

  } catch (error) {
    res.status(400).json({'Error': error});
  }
}

module.exports = authToken;
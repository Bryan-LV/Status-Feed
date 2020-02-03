const jwt = require('jsonwebtoken');

const authToken = (req,res,next) => {
  // check if there is a token in the header
  const token = req.header('auth-token');
  if(!token){
    return res.status(400).json({error: 'User has not provided token'});
  }

  try {
    // verify token has not been tampered with
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userID = verifyToken.userID
    next();

  } catch (error) {
    res.status(400).json({error: error});
  }
}

module.exports = authToken;
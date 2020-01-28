const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const Status = require('../models/Status');
const authToken = require('../middleware/authToken');

// =Route /api/user/create
// =Desc Create a user
// =Access Public
router.post('/create',[
  check('username','Please enter username').not().isEmpty(),
  check('email','Please enter email').isEmail(),
  check('password','Password must be 6 characters').isLength({min:6})
] , async (req,res) => {
  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log('validation error');
    return res.status(400).json({error: errors.array()});
  }

  const {username, email, password} = req.body;

  try {
    // check if user doesn't already exists
    let user = await User.findOne({email: email});
    if(user){
      return res.status(400).json({error: 'User already exists'});
    }

    // create user and hash their password
    user = new User({username, email, password});
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    
    // save to db
    await user.save();

    // create jwt
    const payload = {
      userID: user.id
    }

    jwt.sign(payload, config.get('jwtSecret'), (error, token) => {
      if(error){
        console.log('jwt error');
        throw error;
      }

      res.json(token);
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({error: error});
  }
})

// =Route /api/user/login
// =Desc Login a user
// =Access Public
router.post('/login', [
  check('email','Please enter valid email').isEmail(),
  check('password','Please enter valid password').isLength({min:6})
], async (req,res) => {
  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error: errors.array()});
  }

  const {email, password} = req.body;

  try {
    // check if user email exists
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: 'User not found'});
    }

    // check if password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
      return res.status(400).json({error: 'Password does not match what we have on record'});
    }

    // create jwt
    const payload = {
      userID: user.id
    }

    jwt.sign(payload, config.get('jwtSecret'), (error,token) => {
      if(error){
        throw error;
      }
      res.json(token);
    })
  } catch (error) {
    res.status(400).json({error: error});
  }
})

// =Route /api/user
// =Desc Get the logged in user
// =Access Private
router.get('/', authToken, async (req,res) => {
  try {
    // find user with authToken
    let user = await User.findById(req.userID);
    if(!user){
      return res.status(400).json({error: 'User cannot be found'});
    }
    res.json(user);

  } catch (error) {
    res.status(400).json({error: error});
  }
})


// =Route /api/user
// =Desc Delete a user
// =Access Private
router.delete('/', authToken, async (req,res) => {
  try {
    // find user with authToken
    let user = await User.findById(req.userID);
    if(!user){
      return res.status(400).json({error: 'User cannot be found'});
    }

    // check if user is deleting their profile
    if(req.userID !== user.id.toString()){
      return res.status(400).json({error: 'User is not authenticated to delete this account'});
    }

    await Status.deleteMany({user: req.userID});
    await user.remove();
    res.json({ msg: 'User has been deleted'})

  } catch (error) {
    res.status(400).json({error: error});
  }
})

// =Route /api/user
// =Desc Update a user profile
// =Access Private
router.put('/', [authToken,
  check('username','Please enter username').not().isEmpty(),
  check('email','Please enter valid email').isEmail(),
  check('password','Please enter valid password').isLength({min:6})
  ], async (req,res) => {
    // validate inputs
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error: errors.array()});
    }

    const { username, email, password} = req.body;

    // build update object
    const updateObj = {};
    if(username) updateObj.username = username;
    if(email) updateObj.email = email;
    if(password) updateObj.password = password;

    try {
      // find user 
      let user = await User.findById(req.userID);
      if(!user){
        return res.status(400).json({error: 'User cannot be found'});
      }

      // update user 
      user = await User.findByIdAndUpdate(req.userID,{ $set: updateObj});
      res.json(user);

    } catch (error) {
      res.status(400).json({error: error});
    }

})

// =Route /api/user/all
// =Desc Get all users
// =Access Public

router.get('/all', async (req,res) => {
  try {
    let users = await User.find();
    if(users.length === 0){
      return res.status(400).json({error: 'No users found'});
    }

    res.json(users);

  } catch (error) {
    res.status(400).json({error: error});
  }
})

module.exports = router;
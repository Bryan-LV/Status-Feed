const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const authToken = require('../middleware/authToken');
const Status = require('../models/Status');

// =Route /api/feed
// =Desc Fetch status feed
// =Access Private
router.get('/', authToken, async (req,res) => {
  let statuses = await Status.find({});
  res.json({'feed': statuses});
})

// =Route /api/feed/:user
// =Desc Fetch a users statuses
// =Access Private
router.get('/:user', authToken, async (req,res) => {
  try {
    // find user with authToken middleware
    let statuses = await Status.find({user: req.userID})
    res.json({'feed': statuses});

  } catch (error) {
    res.status(400).json({'Error': error});
  }
})

// =Route /api/feed/
// =Desc Create a status
// =Access Private
router.post('/', [ authToken, check('text', 'Please enter a status').not().isEmpty()], 
  async (req,res) => {
  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({'Error': errors.array()});
  }

  const {text} = req.body;

  try {
    let status = new Status({text, user: req.userID});
    await status.save();
    res.json({status: status});
  } catch (error) {
    res.status(400).json({'Error': error});
  }
})

// =Route /api/feed/
// =Desc Delete a status
// =Access Private
router.delete('/:id', authToken, async (req,res) => {
  try {
    // find status
    let status = await Status.findById(req.params.id);
    if (!status){
    return res.status(404).json({ 'Error': 'Status not found' });
    }

    // check if status belongs to user
    if(req.userID !== status.user.toString()){
      return res.status(400).json({'Error': 'User is not owner of status'});
    }

    // delete status
    await status.remove();
    res.json({msg: 'Status has been deleted'});

  } catch (error) {
    res.status(400).json({'Error': error});
  }

})

// =Route /api/feed/:id
// =Desc Update a status
// =Access Private
router.put('/:id', [authToken, 
  check('text', 'Please enter a status').not().isEmpty() 
  ], async (req,res) => {
  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({'Error': errors.array()});
  }

  try {
    // find status
    let status = await Status.findById(req.params.id);
    if(!status){
      return res.status(404).json({ 'Error': 'Status not found' });
    }

    // make sure user is creator of that status
    if(status.user.toString() !== req.userID){
      return res.status(404).json({ 'Error': 'User cannot update a status that is not their own' });
    }

    // create update object
    const updateObj = {
      likes:{
        upvotes: status.likes.upvotes,
        downvotes: status.likes.downvotes
      }
    }
    const {text, upvote, downvote} = req.body;
    if(text){
      updateObj.text = text;
    }
    if(upvote) {
      updateObj.likes.upvotes += 1;
    }
    if(downvote) {
      updateObj.likes.downvotes -= 1;
    }
    

    // update status
    await Status.findByIdAndUpdate(req.params.id, {$set: updateObj });
    res.json({msg: 'Status has been updated'});

  } catch (error) {
    res.status(400).json({'Error': error});
  }
})

module.exports = router;
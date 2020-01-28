const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    res: 'users'
  },
  likes: {
    upvotes: {
      number: {type: Number, default: 0},
      voters: [{type: mongoose.Schema.Types.ObjectId}]
    },
    downvotes:{
      number: {type: Number, default: 0},
      voters: [{type: mongoose.Schema.Types.ObjectId}]
    }
  }
})

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
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
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0}
  }
})

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type:String, required: true},
  password: {type:String, required: true},
  statuses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Status'}]
})

const User = mongoose.model('User', UserModel);

module.exports = User;
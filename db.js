const mongoose = require('mongoose');
const config = require('config');

async function connectDB () {
  try {
    mongoose.connect(process.env.MONGO_URI,{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false})
    console.log('DB has connected');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
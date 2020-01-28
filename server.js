const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const express = require('express');
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to db
connectDB();

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/feed', require('./routes/feed'));

// Server static assets in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
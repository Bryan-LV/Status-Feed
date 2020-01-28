const cors = require('cors');
const connectDB = require('./config/db');
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
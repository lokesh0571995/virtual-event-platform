require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');


const authRoutes   = require('./routes/authRoutes');
const eventRoutes  = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/events',eventRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));



  module.exports = app;


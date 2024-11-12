const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// Initiate app
const app = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.json());

// Set up routes to handle implementation
app.use('/api/tasks', taskRoutes);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

//initiate app
const app = express();

//set up middleware
app.use(cors());
app.use(bodyParser.json());

//set up routes to handle implementation
app.use('/api/tasks', taskRoutes);

module.exports = app;
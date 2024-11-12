const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task Routes for processeing GET/POST/PUT/DELETE Requests
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
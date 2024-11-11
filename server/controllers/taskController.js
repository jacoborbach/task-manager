const taskModel = require('../models/taskModel');

// GET all tasks
const getTasks = async (req, res) => {
    taskModel.getTasks((err, tasks) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching tasks" });
        }
        res.status(200).json(tasks);
    });
};

// POST a new task
const createTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    taskModel.createTask(title, (err, newTask) => {
        if (err) {
            return res.status(500).json({ error: "Error creating task" });
        }
        res.status(201).json(newTask);
    });
};

// PUT to update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    taskModel.updateTask(id, title, completed, (err, updatedTask) => {
        if (err) {
            return res.status(500).json({ error: err.message || "Error updating task" });
        }
        res.status(200).json(updatedTask);
    });
};

// DELETE a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    taskModel.deleteTaskById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message || "Failed to delete task" });
        }
        res.status(200).json(result);
    });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

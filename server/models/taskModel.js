const db = require('../db');

//GET all existing tasks
const getTasks = (callback) => {
    const sql = "SELECT * FROM tasks";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows);
    });
};

// Add a new task
const createTask = (title, callback) => {
    const sql = "INSERT INTO tasks (title) VALUES (?)";
    db.run(sql, [title], function (err) {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id: this.lastID, title: title });
    });
};

// Update a task
const updateTask = (id, title, completed, callback) => {
    const sql = "UPDATE tasks SET title = COALESCE(?, title), completed = COALESCE(?, completed) WHERE id = ?";
    db.run(sql, [title, completed, id], function (err) {
        if (err) {
            return callback(err, null);
        }
        if (this.changes === 0) {
            return callback(new Error("Task not found"), null);
        }
        callback(null, { id: id, title: title });
    });
};

// Delete a task from the database
const deleteTaskById = (id, callback) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.run(sql, id, function (err) {
        if (err) {
            return callback(err, null);
        }
        if (this.changes === 0) {
            return callback(new Error("Task not found"), null);
        }
        callback(null, { message: "Task deleted successfully", deletedID: id });
    });
};

module.exports = {
    deleteTaskById,
    getTasks,
    createTask,
    updateTask
};

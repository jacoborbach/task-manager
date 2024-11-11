import React, { useState } from "react";

function AddTask({ addTask }) {
    const [newTask, setNewTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask) {
            addTask(newTask);
            setNewTask("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4 d-flex justify-content-center">
                <div className="form-group mr-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="form-control mr-2"
                        placeholder="Add New Task"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;

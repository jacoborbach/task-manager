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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task title"
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;

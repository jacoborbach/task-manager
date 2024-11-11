import React from "react";

function TaskList({ tasks, editTask, deleteTask, toggleTask }) {

    return (
        <div>
            <h3>Task List</h3>
            <ul className="tasks">
                {tasks.map ? tasks.map((task, i) => (
                    <li key={task.id}>
                        <span
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTask(task.id, task.completed)}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => editTask(task.id, task.title)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                )) : null}
            </ul>
        </div>
    );
}

export default TaskList;
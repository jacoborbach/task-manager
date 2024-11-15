import React from "react";

// Task List Component for viewing, editing and deleting tasks
function TaskList({ tasks, editTask, toggleTask, setShowModal, setTaskToDelete }) {

    return (
        <div>
            <ul className="list-group">
                {tasks.map ? tasks.map((task, i) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span
                            className="task-title"
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTask(task.id, task.completed)}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => editTask(task.id, task.title)} className="btn btn-secondary btn-sm mr-2 flex-end
                        ">Edit</button>
                        <button onClick={() => { setTaskToDelete(task.id); setShowModal(true); }} className="btn btn-danger btn-sm">Delete</button>
                    </li>
                )) : null}
            </ul>


        </div>
    );
}

export default TaskList;
import './App.css';
import React, { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import axios from "axios";



function App() {
  //initialize empty task array
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState("");

  //load tasks from backend on page load
  useEffect(() => {
    fetchTasks();
  }, []);  

const fetchTasks = async () => {
  try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data.tasks);
  } catch (error) {
      console.error('Error fetching tasks:', error);
  }
};
  
const addTask = async () => {
  if (newTask.trim()) {
    const res = await axios.post('http://localhost:3000/api/tasks', { title: newTask, completed: false });
    setTasks([...tasks, res.data]);
    setNewTask('');
  }
};

//mark as completed
  const toggleTask = async (id, completed) => {
    await axios.put(`${'http://localhost:3000/api/tasks'}/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${'http://localhost:3000/api/tasks'}/${id}`);
    fetchTasks();
  };

  // Edit a task title
  const editTask = async (id, currentTitle) => {
    const newTitle = prompt("Edit task title:", currentTitle);
    if (newTitle && newTitle !== currentTitle) {
        try {
            await axios.put(`http://localhost:3000/api/tasks/${id}`, { title: newTitle });
            setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle } : task)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }
};
  
  return (
    <div className="App">
      <h2 className="Header">Jake's Task List</h2>

      <input 
        type="text" 
        placeholder="Add task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>

      <ul className="tasks">
    {tasks.map ? tasks.map((task, i) => (
      <li key={task.id}>
        <span
          style={{textDecoration: task.completed ? 'line-through' : 'none'}}
          onClick={() => toggleTask(task.id, task.completed)}
        >
          {task.title}
        </span>    
        <button onClick={() => editTask(task.id, task.title)}>Edit</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    )):null}
    </ul>
    </div>
  );
}

export default App;

import './App.css';
import React, { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import axios from "axios";



function App() {
  //initialize empty task array
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState([])

  //load tasks from backend on page load
  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/tasks");
            setTasks(response.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    fetchTasks();
}, []);  
  
  const addtask = () => {
    console.log(newTask)
    // setTasks([...tasks, newTask]);
    setNewTask('');
  };
  
  return (
    <div className="App">
      <h2 className="Header">Jake's Task List</h2>

      <input 
        type="text" 
        placeholder="Add task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}/>
        <button onClick={addtask}>Add Task</button>

      <ul className="tasks">
    {tasks.map ? tasks.map((task, i) => (
      <li key={task.id}>
        <span>
          {task.title}
        </span>    
        {/* <button onClick={deletetask}>Delete</button>     */}
      </li>
    )):null}
    </ul>
    </div>
  );
}

export default App;

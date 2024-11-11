import './App.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  //initialize empty task array
  const [tasks, setTasks] = useState([])

  //load tasks from backend on page load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data.tasks);
      localStorage.setItem('tasks', JSON.stringify(response.data.tasks));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async (title) => {
    try {
      const response = await axios.post("http://localhost:3000/api/tasks", { title });
      const updatedTasks = [...tasks, response.data];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error adding task:", error);
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
        const updatedTasks = tasks.map(task => (task.id === id ? { ...task, title: newTitle } : task));
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div className="App container mt-5">
      <h2 className="text-center mb-4">Task Manager</h2>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} toggleTask={toggleTask} />
    </div>
  );
}

export default App;

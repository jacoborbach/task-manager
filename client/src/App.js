import './App.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import ConfirmationModal from './components/ConfirmationModal';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [tasks, setTasks] = useState([]) //initialize empty task array
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]); // stores tasks based on filter
  const [filter, setFilter] = useState("all"); // current filter status

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from cache on page load
    setTasks(savedTasks);
    fetchTasks();
  }, []);

  // Apply filter whenever the `filter` state changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredTasks(tasks);
    } else if (filter === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (filter === "incomplete") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
  }, [filter, tasks]);


  // Load tasks from backend and save in cache
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
      setFilteredTasks(response.data); // Initially show all tasks
      localStorage.setItem('tasks', JSON.stringify(response.data));
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

  // Toggle task as completed/incomplete
  const toggleTask = async (id, completed) => {
    await axios.put(`${'http://localhost:3000/api/tasks'}/${id}`, { completed: !completed });
    fetchTasks();
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`${'http://localhost:3000/api/tasks'}/${id}`);
    fetchTasks();
    setShowModal(false)
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

      <Filter filter={filter} setFilter={setFilter} />

      <TaskList tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} toggleTask={toggleTask} setShowModal={setShowModal} setTaskToDelete={setTaskToDelete} />

      {showModal && (
        <ConfirmationModal setShowModal={setShowModal} taskToDelete={taskToDelete} deleteTask={deleteTask} />
      )}
    </div>
  );
}

export default App;

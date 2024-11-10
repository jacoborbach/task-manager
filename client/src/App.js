import './App.css';
import React, { useState } from 'react';


const todos = [
  {"id": "1", "todo": "something"}, 
  {"id": "2", "todo": "somethingelse"}]

function App() {

  const [todo, setTodo] = useState('')

  const addtodo = () => {
    console.log(todo)
    todos.push({"id": "3", "todo": todo})
    console.log(todos)
    setTodo('')
  };
  const deleteTodo = {};

  
  return (
    <div className="App">
      <h2 className="Header">Jake's Task List</h2>

      <input 
        type="text" 
        placeholder="Add todo"
        value={todo}
        onChange={e => setTodo(e.target.value)}/>
        <button onClick={addtodo}>Add Task</button>

      <ul className="ToDos">
    {todos.map((todo, i) => (
      <li key={i}>
        <span>
          {todo.todo}
        </span>    
        <button onClick={deleteTodo}>Delete</button>    
      </li>
    ))}
    </ul>
    </div>
  );
}

export default App;

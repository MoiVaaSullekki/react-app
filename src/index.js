import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './todolist.jsx';
import axios from 'axios'

const promise = axios.get('http://localhost:3001/tasks')
promise.then(response => {
  console.log(response)
})

function App() {
  return(
    <h1>
    </h1>
  )
} 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToDoList></ToDoList>
  </React.StrictMode>
);

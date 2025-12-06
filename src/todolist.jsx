import React, {useState} from 'react'
import styles from './index.css'

function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");


    // Handle input for adding a task
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Add task to list if text-box is not empty
    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask])
            setNewTask("")
        }
    }

    // Add task to list if text-box is not empty and enter is pressed
    function addTaskEnter(event){
        if(newTask.trim() !== "" && event.key === 'Enter'){
            setTasks(t => [...t, newTask])
            setNewTask("")
        }
    }

    // Delete task at index when delete-button is pressed
    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

    }

    // Move task up to higher priority on list when up button is pressed
    function moveTaskUp(index){
        if (index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index -1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Move task to lower priority on list when down button is pressed
    function moveTaskDown(index) {
        if (index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // the HTML code for this thing
    return(
        <div className='to-do-list'>
        
            <h1>
                Your To-Do List
            </h1>

            <div>
                <input 
                    type="text"
                    placeholder='Enter task'
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={addTaskEnter}/>
                    
                <button
                    className='add-button'
                    onClick={addTask}
                    >            
                    Add new Task
                </button>
            </div>

            <o1>
                {tasks.map((task, index)=>
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button 
                            className='delete-button'
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button 
                            className='move-button'
                            onClick={() =>moveTaskUp(index)}>
                            Up
                        </button>
                        <button 
                            className='move-button'
                            onClick={() =>moveTaskDown(index)}>
                            Down
                        </button>
                    </li>)}
            </o1>

        </div>
    );
}
export default ToDoList
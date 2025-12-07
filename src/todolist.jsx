import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styles from './index.css'
import taskService from './services/tasks'

function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");



    useEffect(() => {
        console.log('effect')
        
        taskService
            .getAll()
            .then(response => {
            console.log('promise fulfilled')
            setTasks(response.data)
        })
    }, [])
    console.log('render', tasks.length, 'tasks')
    
    // Handle input for adding a task
    function handleInputChange(event) {
        console.log(tasks)
        setNewTask(event.target.value);
    }

    // Add task to list if text-box is not empty
    function addTask(){
        if(newTask.trim() !== ""){
            taskService
            .create({text: newTask, finished: false})
            .then(response => {
                console.log(response);
                setTasks(tasks.concat(response.data));
                setNewTask('');
            })
        }
    }

    // Add task to list if text-box is not empty and enter is pressed
    function addTaskEnter(event){
        if(newTask.trim() !== "" && event.key === 'Enter'){
             taskService
            .create({text: newTask, finished: false})
            .then(response => {
                console.log(response);
                setTasks(tasks.concat(response.data));
                setNewTask('');
            })
        }
    }

    // Delete task at index when delete-button is pressed
    function deleteTask(taskID){
        const updatedTasks = tasks.filter((task) => task.id !== taskID);
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


    function toggleFinished(taskID) {
        const task = tasks.find(t => t.id === taskID)
        const changedTask = { ...task, finished: !task.finished }

        taskService
            .update(taskID, changedTask)
            .then(response => {
            setTasks(tasks.map(task => task.id === taskID ? response.data : task))
        })


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
                {tasks.filter(t => !t.finished).map((task, index)=>
                    <li key={index}>
                        <span className='text'>{task.text}</span>
                        <input 
                            type='checkbox'
                            checked={task.finished}
                            onChange={() => toggleFinished(task.id)}/>
                        <button 
                            className='delete-button'
                            onClick={() => deleteTask(task.id)}>
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
            <h3>Finished Tasks</h3>
            <o1>
                {tasks.filter(t => t.finished).map((task, index)=>
                    <li key={index}>
                        <span className='text'>{task.text}</span>
                        <input 
                            type='checkbox'
                            checked={task.finished}
                            onChange={() => toggleFinished(task.id)}/>
                        <button 
                            className='delete-button'
                            onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>)}
            </o1>

        </div>
    );
}
export default ToDoList
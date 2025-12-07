import React, {useState} from 'react'
import styles from './index.css'

function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");


    
    // Handle input for adding a task
    function handleInputChange(event) {
        console.log(tasks)
        setNewTask(event.target.value);
    }

    // Add task to list if text-box is not empty
    function addTask(){
        if(newTask.trim() !== ""){
            const taskID = crypto.randomUUID();
            setTasks(t => [...t, {id:taskID, text: newTask, finished: false}])
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
        const updatedTasks = tasks.map(task =>
    task.id === taskID ? { ...task, finished: !task.finished } : task);
        console.log("SEURAAVA ON TOGGLE FINISHED")
        console.log(tasks)
        setTasks(updatedTasks)
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
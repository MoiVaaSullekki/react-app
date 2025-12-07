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
            .then(initialTasks => {
            console.log('promise fulfilled')
            setTasks(initialTasks)
        })
        .catch(error => {
            console.log('fail')
        })
    }, [])
    console.log('render', tasks.length, 'tasks')
    
    // Handle input for adding a task
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Add task to list if text-box is not empty
    function addTask(){

        if(newTask.trim() !== ""){
            const maxIndex = tasks.length
            ? Math.max(...tasks.map(t => t.index))
            : 0;

            console.log(maxIndex)
            taskService
            .create({text: newTask, finished: false, index: maxIndex+1})
            .then(returnedTask => {
                console.log(returnedTask);
                setTasks(tasks.concat(returnedTask));
                setNewTask('');
            })
            .catch(error => {
                console.log('The note could not be created')
            })
        }
    }

    // Add task to list if text-box is not empty and enter is pressed
    function addTaskEnter(event){
        if(newTask.trim() !== "" && event.key === 'Enter'){
            const maxIndex = tasks.length
            ? Math.max(...tasks.map(t => t.index))
            : 0;

            taskService
            .create({text: newTask, finished: false, index: maxIndex+1})
            .then(returnedTask => {
                console.log(returnedTask);
                setTasks(tasks.concat(returnedTask));
                setNewTask('');
            })
            .catch(error => {
                console.log('The note could not be created')
            })
        }
    }

    // Delete task at index when delete-button is pressed
    function deleteTask(taskID){

        taskService.taskDeletion(taskID)
            .then(
                setTasks(tasks.filter(task => task.id !== taskID)),
                console.log("deletion done")
            )
            .catch(error =>
                console.log(`Information of ${taskID} has already been removed from server`)
            )

    }

    // Move task up to higher priority on list when up button is pressed
    function moveTaskUp(taskID) {
        
        const upTask = tasks.find(t => t.id === taskID);
        console.log(upTask)
        if (!upTask || upTask.index === 1) return; 
        const upTaskIndex = tasks.sort((a, b) => a.index - b.index).findIndex(t => t.id === taskID)
        const aboveTask = tasks[upTaskIndex - 1]
        if (!aboveTask) return;

        const updatedTask = { ...upTask, index: upTaskIndex - 1};
        const updatedAbove = { ...aboveTask, index: upTaskIndex};
        
        taskService
            .update(taskID, updatedTask)
            .then(returnedTask => {
                taskService.update(updatedAbove.id, updatedAbove)
                .then(() => {
                    // update the local states
                    setTasks(tasks.map(t => {
                        if (t.id === taskID) return returnedTask;
                        if (t.id === updatedAbove) return updatedAbove;
                        return t;
                    }));
                });    
        })
        .catch(error => {
            console.log('Could not move task up')
        })
        
        
    }

    // Move task to lower priority on list when down button is pressed
    function moveTaskDown(taskID){
        const task = tasks.find(t => t.id === taskID)
        const changedTask = { ...task, finished: !task.finished }

        taskService
            .update(taskID, changedTask)
            .then(returnedTask => {
            setTasks(tasks.map(task => task.id === taskID ? returnedTask : task))
        })
        .catch(error => {
            console.log('The note could not be set as finished')
        })
    };


    function toggleFinished(taskID) {
        const task = tasks.find(t => t.id === taskID)
        const changedTask = { ...task, finished: !task.finished }

        taskService
            .update(taskID, changedTask)
            .then(returnedTask => {
            setTasks(tasks.map(task => task.id === taskID ? returnedTask : task))
        })
        .catch(error => {
            console.log('The note could not be set as finished')
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
                {tasks.filter(t => !t.finished).sort((a, b) => a.index - b.index).map((task, index)=>
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
                            onClick={() =>moveTaskUp(task.id)}>
                            Up
                        </button>
                        <button 
                            className='move-button'
                            onClick={() =>moveTaskDown(task.id)}>
                            Down
                        </button>
                    </li>)}
            </o1>
            <h3>Finished Tasks</h3>
            <o1 className='finished-tasks'>
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
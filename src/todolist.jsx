import React, {useState} from 'react'

function ToDoList(){

    const [tasks, setTasks] = useState(["asd", "wasd","ghsuodhfu"]);
    const [newTask, setNewTask] = useState("");
    

    function handleInputChange(event) {
        setNewTask(event.target.value);

        
    }

    function addTask(){


    }

    function deleteTask(index){

    }

    function moveTaskUp(index){

    }

    function moveTaskDown(index) {
        
    }
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
                    onChange={handleInputChange}/>

                <button
                    className='add-button'
                    onClick={addTask}>            
                    Add new Task
                </button>
            </div>

            <o1>
                {tasks.map((task, index)=>
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button 
                            className='delete-button'
                            onClick={deleteTask}>
                            Delete
                        </button>
                        <button 
                            className='up-button'
                            onClick={moveTaskUp(index)}>
                            Up
                        </button>
                        <button 
                            className='down-button'
                            onClick={moveTaskDown(index)}>
                            Down
                        </button>
                    </li>)}
            </o1>

        </div>
    );
}
export default ToDoList
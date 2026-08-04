import { useState } from "react";

function TodoForm() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask() {
        if(task.trim()===""){
    return;
} else {

        setTasks([...tasks, task]);//spread operator

        setTask("");
}
    }

    function deleteTask(indexToDelete){
        const updatedTasks = tasks.filter((item, index) => {

    return index !== indexToDelete;

});

setTasks(updatedTasks);



}

    return (

        <div>

            <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
            />

            <button onClick={addTask}>
                Add Task
            </button>
{tasks.length === 0 ? (
    <p>No tasks available.</p>
) : (
    <ul>
        {tasks.map((item, index) => (
            <li key={index}>
                {item}{"   "}
                <button onClick={() => deleteTask(index)}>
                    Delete
                </button>
            </li>
        ))}
    </ul>
)}

<p> the length of tasks to do is {tasks.length}</p>
        </div>

    );

}

export default TodoForm;
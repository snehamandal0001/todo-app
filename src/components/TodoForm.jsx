import { useState } from "react";

function TodoForm() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask() {

    if (
        tasks.some(
    (item) => item.text.toLowerCase() === task.toLowerCase()
)
    ) {
        alert("Task already exists!");
        return;
    }

    setTasks([
    ...tasks,
    {
        text: task,
        completed: false
    }
]);
    setTask("");
}

    function deleteTask(indexToDelete){
        const updatedTasks = tasks.filter((item, index) => {

    return index !== indexToDelete;

});

setTasks(updatedTasks);



}


function toggleComplete(indexToToggle) {

    const updatedTasks = tasks.map((item, index) => {

        if (index === indexToToggle) {

            return {
                ...item,
                completed: !item.completed
            };

        }

        return item;

    });

    setTasks(updatedTasks);

}
const completedTasks = tasks.filter(task => task.completed).length;
const remainingTasks = tasks.length - completedTasks;
// main starttttttttt
    return (

        <div>

            <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
            />

            <button onClick={addTask}
            disabled={task.trim() === ""}>
                Add Task
            </button>
            


{tasks.length === 0 ? (
    <p>No tasks available.</p>
) : (
    <ul>
        {tasks.map((item, index) => (
            <li key={index}>
                 <span
        style={{
            textDecoration: item.completed ? "line-through" : "none",
             color: item.completed ? "green" : "red"
        }}
    >
        {item.text} {"  "}
    </span>
                <button onClick={() => deleteTask(index)}>
                    Delete
                </button>
                
       <button onClick={() => toggleComplete(index)}>
    {item.completed ? "Undo" : "Complete"}
</button>
            </li>
        ))}
    </ul>
)}

<p> the length of tasks  is {tasks.length}</p>
<p>✅ Completed: {completedTasks}</p>
<p>📌 Remaining: {remainingTasks}</p>
        </div>

    );

}

export default TodoForm;
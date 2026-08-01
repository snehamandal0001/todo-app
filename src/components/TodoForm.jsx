import { useState } from "react";

function TodoForm() {

    const [task, setTask] = useState("");

    return (
        <div>

            <input
                type="text"
                placeholder="Enter Task"
                value={task}
                onChange={(event) => setTask(event.target.value)}
            />

            <button>Add Task</button>

            <h3>{task}</h3>
            <h2> helloooo {task}</h2>
            <p>Characters length is {task.length}</p>
            <p>{task.toUpperCase()}</p>
           


        </div>
    );

}

export default TodoForm;
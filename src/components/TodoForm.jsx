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
<div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      
       <div className="flex gap-3 mb-6">
            <input
                type="text"
                value={task}
                placeholder="What do you need to do today?"
                onChange={(event) => setTask(event.target.value)}
                className="
        flex-1
        border
        border-gray-300
        rounded-lg
        px-4 
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
    "
            />

            <button  className="bg-blue-600 
            text-white
             px-5 py-2
              rounded-lg 
              hover:bg-blue-700
               transition duration-200
        font-medium"
            onClick={addTask}
            disabled={task.trim() === ""}>
                Add Task
            </button>
            </div>
            
{/* ipuut area ended */}

{tasks.length === 0 ? (
   <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
    <p className="text-lg">
        No tasks available.
    </p>

    <p className="mt-2 text-sm">
        Add your first task above.
    </p>
</div>
) : (
    <ul className="space-y-4">
        {tasks.map((item, index) => (
            <li key={index}
            className="
        flex
        items-center
        justify-between
        bg-gray-50
        p-4
        rounded-xl
        shadow-sm
        hover:shadow-md
        hover:-translate-y-1
        transition-all
        duration-200
    " >
                 <span
    className={`
        text-lg
         
        ${
            item.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
        }
    `}
>
    {item.text}
</span>
        <div className ="flex gap -2">
            <button onClick={() => toggleComplete(index)}
        className={`
       
        text-white
        px-4
        py-2
        rounded-lg
        
        ${item.completed?"bg-yellow-500 hover:bg-yellow-600"
            :"bg-green-500 hover:bg-green-600 "}
    `}>
     {item.completed ? "↩ Undo" : "✔ Complete"} 
</button>
                <button onClick={() => deleteTask(index)}
                   className =" bg-red-500
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-red-600
        transition
    ">
                   🗑 Delete
                </button>
            
</div>
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
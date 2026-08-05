import { useState } from "react";

function TodoForm() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");

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


function startEditing(index) {
    setEditingIndex(index);
    setEditText(tasks[index].text);
}


function saveEdit(indexToSave) {

    if (editText.trim() === "") {
        return;
    }

    if (
    tasks.some(
        (item, index) =>
            index !== indexToSave &&
            item.text.toLowerCase() === editText.toLowerCase()
    )
) {
    alert("Task already exists!");
    return;
}

    const updatedTasks = tasks.map((item, index) => {

        if (index === indexToSave) {

            return {
                ...item,
                text: editText
            };

        }

        return item;

    });

    setTasks(updatedTasks);

    setEditingIndex(null);
    setEditText("");

}


function cancelEdit() {

    setEditingIndex(null);
    setEditText("");

}





// main starttttttttt
    return (


<div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      

       <div className="flex gap-3 mb-6">


            <input
                type="text"
                value={task}
                placeholder="What do you need to do today?"
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={(e) => {

    if (e.key === "Enter") {

       addTask();

    }

}}
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

{tasks.length === 0 ?

(
   <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
    <p className="text-lg">
        No tasks available.
    </p>

    <p className="mt-2 text-sm">
        Add your first task above.
    </p>
</div>
) :


(
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
    {editingIndex === index ? (


    <div className="flex flex-1 gap-2">

        <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {

    if (e.key === "Enter") {

        saveEdit(index);

    }

}}
            className="
                flex-1
                border
                rounded-lg
                px-3
                py-2
            "
        />

        <button
            onClick={() => saveEdit(index)}
            disabled={editText.trim() === ""}
            className="
                bg-blue-600
                text-white
                px-4
                rounded-lg
                hover:bg-blue-700
            "
        >
            💾 Save
        </button>

        <button
            onClick={cancelEdit}
            className="
                bg-gray-500
                text-white
                px-4
                rounded-lg
                hover:bg-gray-600
            "
        >
            ❌ Cancel

        </button>

    </div>

) : (

    <span
        className={`
            text-lg
            ${item.completed
                ? "line-through text-gray-400"
                : "text-gray-800"}
        `}
    >
        {item.text}
    </span>

)}
        <div className ="flex gap -2">

            <button onClick={() => toggleComplete(index)}
        className={`
       
        text-white
        px-4
        py-2
        rounded-lg
        
        ${item.completed?"bg-blue-500 hover:bg-blue-600"
            :"bg-green-500 hover:bg-green-600 "}
    `}>
     {item.completed ? "↩ Undo" : "✔ Complete"}
      </button>


     <button
    onClick={() => startEditing(index)}
    className="
        bg-yellow-500
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-yellow-600
        transition
    "
>
    ✏ Edit
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
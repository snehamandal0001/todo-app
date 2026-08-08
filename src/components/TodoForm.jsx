import TodoItem from "./TodoItem";
import { useState, useEffect } from "react";
import { Trash} from "lucide-react";

function TodoForm() {

 const [task, setTask] = useState("");

 const [tasks, setTasks] = useState(() => {
const savedTasks = localStorage.getItem("tasks");

        return savedTasks ? JSON.parse(savedTasks) : [];
});

 const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
    

useEffect(() => {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}, [tasks]);

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


function saveEdit(indexToSave, newText) {

    if (newText.trim() === "") {
        return;
    }

    if (
        tasks.some(
            (item, index) =>
                index !== indexToSave &&
                item.text.toLowerCase() === newText.toLowerCase()
        )
    ) {
        alert("Task already exists!");
        return;
    }

    const updatedTasks = tasks.map((item, index) => {

        if (index === indexToSave) {

            return {
                ...item,
                text: newText
            };

        }

        return item;

    });

    setTasks(updatedTasks);
}


function clearAllTasks() {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (!confirmDelete) {
        return;
    }

    setTasks([]);

}


const filteredTasks = tasks.filter((item) => {

    const matchesSearch = item.text
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
        filter === "all"
            ? true
            : filter === "active"
            ? !item.completed
            : item.completed;

    return matchesSearch && matchesFilter;

});





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
               disabled:opacity-80
        font-medium"
            onClick={addTask}
            disabled={task.trim() === ""}>
                Add Task
            </button>


            </div>

            <div className="mb-6">

{tasks.length>0&&(
    <input
        type="text"
        value={search}
        placeholder="🔍 Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
        className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-4
            py-2
            focus:ring-2
            focus:ring-blue-500
            focus:outline-none
        "
    />)}

</div>


<div className="flex gap-3 mb-6">

    <button
        onClick={() => setFilter("all")}
        className={`
            px-4 py-2 rounded-lg transition
            ${
                filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
            }
        `}
    >
        

  <p>   📋 All : <strong>{tasks.length}</strong>
    </p>

    </button>

    <button
        onClick={() => setFilter("active")}
        className={`
            px-4 py-2 rounded-lg transition
            ${
                filter === "active"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
            }
        `}
    >
         <p>   ⏳ Active : <strong>{tasks.filter(task => !task.completed).length}</strong>
    </p>
    </button>

    <button
        onClick={() => setFilter("completed")}
        className={`
            px-4 py-2 rounded-lg transition
            ${
                filter === "completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
            }
        `}
    >
        <p>   ✅ Completed : <strong>{tasks.filter(task => task.completed).length}</strong>
    </p>
    </button>

</div>

{search && (
    <p className = {"text-sm text-gray-500  "}>
        Searching for "{search}"
    </p>
)}


<p className="text-gray-500 text-sm mb-4">

    Showing
    <span className="font-semibold">
        {" "}{filter}
    </span>
    {" "}tasks

</p>


  {tasks.length > 0 && (

<div className="flex justify-end mb-4">

    <button
        onClick={clearAllTasks}
        className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-red-700
            transition
        "
    >
       <Trash size={18} /> Clear all tasks
    </button>

</div>

)}
    
   

            


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
) : filteredTasks.length===0?(
    <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
        <p className="text-lg">
            No {filter} tasks found.
        </p>
    </div>):

( <div>

    <p className="text-sm text-gray-500">
    Showing {filteredTasks.length} of {tasks.length} tasks
</p>



    <ul className="space-y-4">
        {
        filteredTasks.map((item, index) => (
<TodoItem
    key={index}
    text={item.text}
    completed={item.completed}
    index={index}
    deleteTask={deleteTask}
    toggleComplete={toggleComplete}
    saveEdit={saveEdit}
/>

        ))}
    </ul>
     </div>
)}


<div className="mt-6 flex justify-between bg-slate-100 rounded-lg p-4">

    <p> 📋 Total: <strong>{tasks.length}</strong></p>

    <p> ✅ Completed: <strong>{completedTasks}</strong></p>

    <p>  📌 Remaining: <strong>{remainingTasks}</strong> </p>

   

</div>

        </div>
    );

}

export default TodoForm;
import TodoItem from "./TodoItem";
import TaskInput from "./TaskInput";
import SearchFilter from "./SearchFilter";
import TaskStats from "./TaskStats";

import { Trash, AlertTriangle, X} from "lucide-react";
import { useState, useEffect } from "react";

function TodoForm() {

const [task, setTask] = useState("");
const [showConfirm, setShowConfirm] = useState(false);
const [error, setError] = useState("");
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


 useEffect(() => {

    if (!error) {
        return;
    }

    const timer = setTimeout(() => {
        setError("");
    }, 3000);

    return () => {
        clearTimeout(timer);
    };

}, [error]);

function addTask() {

    if (task.trim() === "") {
        setError("Task cannot be empty!");
        return;
    }

    if (
        tasks.some(
            (item) =>
                item.text.toLowerCase() ===
                task.trim().toLowerCase()
        )
    ) {
        setError("Task already exists!");
        return;
    }

    setTasks([
        ...tasks,
        {
            id: Date.now(),
            text: task.trim(),
            completed: false
        }
    ]);

    setTask("");
    setError("");
}


function deleteTask(taskId) {

    const updatedTasks = tasks.filter((item) => {

        return item.id !== taskId;

    });

    setTasks(updatedTasks);
}


function toggleComplete(taskId) {

    const updatedTasks = tasks.map((item) => {

        if (item.id === taskId) {

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
const progress =
    tasks.length === 0
        ? 0
        : Math.round((completedTasks / tasks.length) * 100);


function saveEdit(taskId, newText) {

    if (newText.trim() === "") {
        return;
    }

    if (
        tasks.some(
            (item) =>
                item.id !== taskId &&
                item.text.toLowerCase() === newText.toLowerCase()
        )
    ) {
        alert("Task already exists!");
        return;
    }

    const updatedTasks = tasks.map((item) => {

        if (item.id === taskId) {

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
    setShowConfirm(true);
}


function confirmClearAll() {
    setTasks([]);
    setShowConfirm(false);
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


<div className="
    w-full
    max-w-3xl
    mx-auto
    mt-8
    bg-white
    shadow-lg
    rounded-xl
    p-4
    md:p-6
">      

 <div>

    <TaskInput
    task={task}
    setTask={setTask}
    addTask={addTask}
    error={error}
    setError={setError}
/>
  </div>



  <SearchFilter
    search={search}
    setSearch={setSearch}
    filter={filter}
    setFilter={setFilter}
    tasks={tasks}
/>



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
            px-3 py-2 md:px-4
            rounded-lg
            hover:bg-red-700
            transition
        "
    >
       <Trash size={18} /> Clear all tasks
    </button>

</div>
)}
    
   {showConfirm && tasks.length > 0 && (
    <div className="
        mb-6
        bg-red-50
        border
        border-red-200
        rounded-xl
        p-5
    ">

        <div className="flex items-center gap-3 mb-4">

    <AlertTriangle
        size={24}
        className="text-red-600"
    />

    <p className="text-red-700 font-medium">
        Are you sure you want to delete all tasks?
    </p>

</div>

        <div className="flex gap-3">

            <button
                onClick={confirmClearAll}
                className="
                    bg-red-600
                    text-white
                    px-3 py-2 md:px-4
                    rounded-lg
                    hover:bg-red-700
                    transition
                "
            >
                Yes, delete all
            </button>

            <button
                onClick={() => setShowConfirm(false)}
                className="
                    bg-gray-500
                    text-white
                    px-3 py-2 md:px-4
                    rounded-lg
                    hover:bg-gray-600
                    transition
                "
            >
                Cancel
            </button>

        </div>

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
    filteredTasks.map((item) => (
    <TodoItem
        key={item.id}
        id={item.id}
        text={item.text}
        completed={item.completed}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        saveEdit={saveEdit}
    />
))}
    </ul>
     </div>
)}



<TaskStats
    tasks={tasks}
    completedTasks={completedTasks}
    remainingTasks={remainingTasks}
    progress={progress}
/>

        </div>
    );

}

export default TodoForm;
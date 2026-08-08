import { useState } from "react";
import { Trash2,Pencil, Check,X,Undo,Save} from "lucide-react";

function TodoItem({id, text,completed,deleteTask,toggleComplete,saveEdit}) {

const [isEditing, setIsEditing] = useState(false);
const [editText, setEditText] = useState(text);

 return (

<li className=" flex
        items-center
        justify-between
        bg-gray-50
        p-4
        rounded-xl
        shadow-sm
        hover:shadow-md
        hover:-translate-y-1
        transition-all
        duration-200">

    {isEditing ? (
        //EDIT MODE
        <div className="flex flex-1 gap-2">
    <input
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            saveEdit(id, editText);
            setIsEditing(false);
        }
    }}
    className="
        flex-1
        border
        border-gray-300
        rounded-lg
        px-3
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
    "
/>

            <button
    onClick={() => {
        saveEdit(id, editText);
        setIsEditing(false);
    }}
    disabled={editText.trim() === ""}
    className="
        flex
        items-center
        gap-2
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-blue-700
        disabled:opacity-50
        transition
    "
>
    <Save size={18} />
    <span>Save</span>
</button>

            <button
    onClick={() => {
        setIsEditing(false);
        setEditText(text);
    }}
    className="
        flex
        items-center
        gap-2
        bg-gray-500
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-gray-600
        transition
    "
>
    <X size={18} />
    <span>Cancel</span>
</button>

        </div>

    ) : (

        //NORMAL MODE

        <div className="flex justify-between items-center">

          <span className={` text-lg flex-1
        ${completed
            ? "line-through text-gray-400"
            : "text-gray-800"} `} >
                {text}
            </span> 

            <div className="flex gap-2">

             <button onClick={() => toggleComplete(id)}
    className={`
        flex
        items-center
        gap-2
        text-white
        px-4
        py-2
        rounded-lg
        transition
        ${
            completed
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
        }
    `}
>
    {completed ? (
        <>
            <Undo size={18} />
            <span>Undo</span>
        </>
    ) : (
        <>
            <Check size={18} />
            <span>Complete</span>
        </>
    )}
</button>

     <button onClick={() => {
        setEditText(text);
        setIsEditing(true);
    }}
    className="
        flex
        items-center
        gap-2
        bg-yellow-500
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-yellow-600
        transition
    "
>
    <Pencil size={18} />
    <span>Edit</span>
</button>

        <button onClick={() => deleteTask(id)}
    className="
        flex
        items-center
        gap-2
        bg-red-500
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-red-600
        transition
    "
>
    <Trash2 size={18} />
    <span>Delete</span>
</button>
            </div>

        </div>

    )}

</li>

);

}

export default TodoItem;
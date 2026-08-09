import { X} from "lucide-react";

function TaskInput({
    task,
    setTask,
    addTask,
    error,
    setError
}) {

    return (
        <div>

            <div className="flex flex-col gap-3 mb-6 sm:flex-row">

                <input
                    type="text"
                    value={task}
                    placeholder="What do you need to do today?"
                    onChange={(event) => {
                        setTask(event.target.value);
                        setError("");
                    }}
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
                        px-3
                        py-2
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

                <button
                    onClick={addTask}
                    disabled={task.trim() === ""}
                    className="
                        bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                        transition
                        duration-200
                        font-medium
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    Add Task
                </button>

            </div>

            {error && (
                <div className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    bg-red-50
                    border
                    border-red-200
                    text-red-600
                    px-4
                    py-3
                    rounded-lg
                ">

                    <p>⚠️ {error}</p>

                    <button
                        onClick={() => setError("")}
                        className="hover:text-red-800"
                    >
                         <X size={18} />
                    </button>

                </div>
            )}

        </div>
    );
}

export default TaskInput;
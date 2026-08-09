function SearchFilter({
    search,
    setSearch,
    filter,
    setFilter,
    tasks
}) {

    return (
        <div className="mb-6">

            {/* Search */}
            {tasks.length > 0 && (
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
                        px-3 py-2 md:px-4
                        focus:ring-2
                        focus:ring-blue-500
                        focus:outline-none
                    "
                />
            )}

            {/* Filter buttons */}
            <div className="
                flex
                flex-wrap
                gap-3
                mb-6
            ">

                <button
                    onClick={() => setFilter("all")}
                    className={`
                        px-3 py-2 md:px-4
                        rounded-lg
                        transition
                        ${
                            filter === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        }
                    `}
                >
                    📋 All :
                    <strong className="ml-1">
                        {tasks.length}
                    </strong>
                </button>


                <button
                    onClick={() => setFilter("active")}
                    className={`
                          px-3 py-2 md:px-4
                        rounded-lg
                        transition
                        ${
                            filter === "active"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        }
                    `}
                >
                    ⏳ Active :
                    <strong className="ml-1">
                        {tasks.filter(
                            task => !task.completed
                        ).length}
                    </strong>
                </button>


                <button
                    onClick={() => setFilter("completed")}
                    className={`
                        px-3 py-2 md:px-4
                        rounded-lg
                        transition
                        ${
                            filter === "completed"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        }
                    `}
                >
                    ✅ Completed :
                    <strong className="ml-1">
                        {tasks.filter(
                            task => task.completed
                        ).length}
                    </strong>
                </button>

            </div>

        </div>
    );
}

export default SearchFilter;
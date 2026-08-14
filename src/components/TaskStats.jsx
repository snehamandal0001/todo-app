function TaskStats({
    tasks,
    completedTasks,
    remainingTasks,
    progress
}) {

    return (
        <div className="mt-6">

            {/* Progress */}
            <div className="mb-6">

                <div className="flex justify-between mb-2">

                    <p className="text-sm font-medium text-gray-700">
                        Progress
                    </p>

                    <p className="text-sm font-medium text-blue-600">
                        {progress}%
                    </p>

                </div>

                <div className="
                    w-full
                    h-3
                    bg-gray-200
                    rounded-full
                    overflow-hidden
                ">

                    <div
                        className="
                            h-full
                            bg-blue-600
                            rounded-full
                            transition-all
                            duration-500
                        "
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <p className="text-sm text-gray-500 mt-2">
                    {completedTasks} of {tasks.length} tasks completed
                </p>


                 <p className="text- lg text-gray-700 mt-2">
        {progress === 100
    ? "🎉 All tasks completed!"
    : progress >= 50
    ? "💪 You're doing great!"
    : "🚀 Keep going!"
}
    </p>

            </div>


            {/* Statistics */}

            <div className="
                mt-6
    flex
    flex-col
    gap-3
    bg-slate-100
    rounded-lg
    p-4
    sm:flex-row
   justify-between
            ">

                <p>
                    📋 Total:
                    <strong className="ml-1">
                        {tasks.length}
                    </strong>
                </p>

                <p>
                    ✅ Completed:
                    <strong className="ml-1">
                        {completedTasks}
                    </strong>
                </p>

                <p>
                    📌 Remaining:
                    <strong className="ml-1">
                        {remainingTasks}
                    </strong>
                </p>

            </div>

        </div>
    );
}

export default TaskStats;
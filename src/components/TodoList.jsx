function TodoList() {

    const tasks = [
        
        "Go to Gym",
        "Read a horror Book"
    ];

    return (
        <div>
            <h2>Today's Tasks</h2>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
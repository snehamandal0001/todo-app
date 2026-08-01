import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    function increase() {
        setCount(count + 1);
    }

    return (
        <>
            <h1>Count : {count}</h1>

            <button onClick={increase}>
                Increase
            </button>
        </>
    );

}

export default Counter;
import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Counter from "./components/Counter";

function App() {
    return (
         <>
            <Header />
            <TodoForm />
            <TodoList />
             <Counter />
        </>
    );
}

export default App;
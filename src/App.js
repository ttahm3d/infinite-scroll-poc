import axios from "axios";
import "./App.css";
import { useState, useEffect, useCallback, useRef } from "react";
import Todo from "./Todo";

const APIURL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [limitTodos, setLimitTodos] = useState(12);
  const loadingRef = useRef(null);

  const fetchTodos = useCallback(async () => {
    const response = await axios.get(APIURL);
    const todosToShow = response.data.slice(0, limitTodos);
    setTodos(todosToShow);
  }, [limitTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLimitTodos((limit) => limit + 12);
        }
      },
      { threshold: 0.5 }
    );
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => {
      if (observer.current) {
        observer.unobserve(observer.current);
      }
    };
  }, [loadingRef]);

  return (
    <div className="App">
      <h1>Todos</h1>
      <div className="todo-container">
        {todos.map((todo) => (
          <Todo key={todo.id} title={todo.title} />
        ))}
      </div>
      <div className="loader" ref={loadingRef}>
        <h3>Loading....</h3>
      </div>
    </div>
  );
}

export default App;

import axios from "axios";
import "./App.css";
import { useState, useEffect, useCallback, useRef } from "react";
import Todo from "./Todo";
import InfiniteScroll from "react-infinite-scroll-component";

const APIURL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [todosToShow, setTodosToShow] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState(20);

  const fetchTodos = useCallback(async () => {
    const response = await axios.get(APIURL);
    if (limit === response?.data.length) {
      setHasMore(false);
    } else {
      setLimit((limit) => limit + 20);
      setHasMore(true);
    }
    setTodosToShow(response?.data.slice(0, limit));
  }, [limit]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={limit}
        next={fetchTodos}
        loader={<h4>Loading...</h4>}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        <div className="todo-container">
          {todosToShow.map((todo) => (
            <Todo key={todo.id} title={todo.title} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;

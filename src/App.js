import React from "react";
import "./App.css";
import TodoList from "./components/todo_list/todoList/TodoList";
import "./static/monteserrat.css";

const App = () => {
  return (
    <div className="app">
      <TodoList />
    </div>
  );
};

export default App;

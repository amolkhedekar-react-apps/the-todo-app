import React from "react";
import "./Form.css";
import datetime from "../utils/date-time";
function Form({ inputText, tasks, setInput, setTasks }) {
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const submitTaskHandler = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: Math.floor(Math.random() * 10000),
        title: inputText,
        completed: false,
        createdAt: datetime.getCurrentTime(),
      },
    ]);
    setInput("");
  };
  let btnClass =
    inputText === "" || /^\s*$/.test(inputText) ? "hide" : "button__add";
  return (
    <form className="form">
      <input
        className="form__input"
        type="text"
        placeholder="Add a task ..."
        value={inputText}
        onChange={inputChangeHandler}
      />
      <button className={btnClass} type="submit" onClick={submitTaskHandler}>
        <i className="fa fa-plus"></i>
      </button>
    </form>
  );
}

export default Form;

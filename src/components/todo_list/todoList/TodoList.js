import React, { useState, useEffect } from "react";
import Form from "../form/Form";
import Task from "../task/Task";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState("all");

  const filterTaskHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTasks(tasks.filter((item) => item.completed == true));
        break;
      case "pending":
        setFilteredTasks(tasks.filter((item) => item.completed == false));
        break;
      default:
        setFilteredTasks(tasks);
    }
  };

  const completeTaskHandler = (index) => {
    const userTasks = [...tasks];
    const task = userTasks[index];
    task.completed = !clicked;
    userTasks[index] = task;
    setTasks(userTasks);
    setClicked(!clicked);
  };

  const editTaskHandler = (index, newTitle) => {
    const editedTaskList = tasks.map((task) => {
      if (index === task.id) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const deleteTaskHandler = (index) => {
    const userTasks = [...tasks];
    setTasks(userTasks.filter((el) => el.id !== index));
  };

  const clearAllTasksHandler = () => {
    setTasks([]);
  };

  const saveLocalTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getLocalTasks = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      let localTasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(localTasks);
    }
  };

  useEffect(() => {
    getLocalTasks();
  }, []);
  useEffect(() => {
    saveLocalTasks();
  }, [tasks]);
  useEffect(() => {
    filterTaskHandler();
  }, [tasks, status]);

  let allCount,
    completedCount = 0,
    pedingCount = 0;
  allCount = tasks.length;
  tasks.map((item, index) => {
    if (item.completed) {
      completedCount = completedCount + 1;
    } else {
      pedingCount = pedingCount + 1;
    }
  });
  const showAll = () => {
    setStatus("all");
  };
  const showCompleted = () => {
    setStatus("completed");
  };
  const showPending = () => {
    setStatus("pending");
  };
  let contentToDisplay;
  if (allCount == 0) {
    contentToDisplay = <p className="todo__noTasks">You have no tasks yet.</p>;
  } else {
    contentToDisplay = (
      <div>
        {" "}
        <div className={allCount == 0 ? "hide" : "todo__filter"}>
          <div className="todo__filter__button">
            <div className="filter__buttonDiv">
              <button className="filter__button" onClick={showAll}>
                All <i className="fa fa-angle-down"></i>
              </button>
              <p className="filter__count">{allCount}</p>
            </div>
            <div className="filter__buttonDiv">
              <button className="filter__button" onClick={showCompleted}>
                Completed <i className="fa fa-angle-down"></i>
              </button>
              <p className="filter__count">{completedCount}</p>
            </div>
            <div className="filter__buttonDiv">
              <button className="filter__button" onClick={showPending}>
                Pending <i className="fa fa-angle-down"></i>
              </button>
              <p className="filter__count">{pedingCount}</p>
            </div>
          </div>
        </div>
        <div className="todo__container">
          <ul className="todo__list">
            {filteredTasks.map((item, index) => {
              return (
                <Task
                  key={index}
                  id={item.id}
                  task={item}
                  completeTaskHandler={() => {
                    completeTaskHandler(index);
                  }}
                  editTaskHandler={editTaskHandler}
                  deleteTaskHandler={() => {
                    deleteTaskHandler(item.id);
                  }}
                />
              );
            })}
          </ul>
          <button
            className={allCount == 0 ? "hide" : "button--clear"}
            onClick={clearAllTasksHandler}
          >
            Clear All
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="todo">
      <header>To Do List</header>
      <Form
        inputText={input}
        tasks={tasks}
        setInput={setInput}
        setTasks={setTasks}
      />
      {contentToDisplay}
    </div>
  );
}

export default TodoList;

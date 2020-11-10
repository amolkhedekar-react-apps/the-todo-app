import React, { useState } from "react";
import UpdateForm from "../form/UpdateForm";
import "./Task.css";
function Task({
  id,
  task,
  completeTaskHandler,
  editTaskHandler,
  deleteTaskHandler,
}) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  let taskClass;
  let editClass;
  if (task) {
    taskClass = task.completed === true ? "task completed" : "task";
    editClass = task.completed === true ? "hide" : "btn--edit";
  }
  const toggleEditForm = () => {
    setEdit(!edit);
  };
  const updateTaskHandler = (e) => {
    e.preventDefault();
    if (title) {
      editTaskHandler(id, title);
      setEdit(!edit);
    }
  };
  let view;
  if (edit == false) {
    view = (
      <div className={taskClass}>
        <span className="task__createdAt">{task ? task.createdAt : ""} </span>
        <li>{task ? task.title : ""}</li>
        <button className="btn--complete" onClick={completeTaskHandler}>
          <i className="fa fa-check"></i>
        </button>
        <button className={editClass} onClick={toggleEditForm}>
          <i className="fa fa-pencil"></i>
        </button>
        <button className="btn--delete" onClick={deleteTaskHandler}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    );
  } else {
    view = (
      <UpdateForm
        updateTaskHandler={updateTaskHandler}
        title={title}
        setTitle={setTitle}
        closeEdit={toggleEditForm}
      />
    );
  }

  return <div className="task__main">{view}</div>;
}

export default Task;

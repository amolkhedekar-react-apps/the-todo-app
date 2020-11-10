import React, { useState } from "react";
import "./UpdateForm.css";

function UpdateForm({ updateTaskHandler, title, setTitle, closeEdit }) {
  const inputChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form className="update__form">
      <h3 className="update__form__title">Edit task </h3>
      <div className="update__formContainer">
        <textarea
          id="update__input"
          type="text"
          placeholder=""
          className="update__input"
          onChange={inputChangeHandler}
          value={title}
        />
        <div className="update__buttonDiv">
          <button
            className="button__update"
            type="submit"
            onClick={updateTaskHandler}
          >
            Save
          </button>
          <button className="button__cancel" type="button" onClick={closeEdit}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateForm;

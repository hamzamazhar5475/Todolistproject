import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function Task({
  task,
  index,
  columnId,
  deleteTask,
  toggleTaskCompleted,
  toggleFavorite,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  function handleBlur() {
    setIsEditing(false);
    const trimmed = editedText.trim();
    if (trimmed && trimmed !== task.text) {
      toggleTaskCompleted(columnId, task.id, trimmed);
    } else {
      setEditedText(task.text);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  }

  return (
    <div className="keeperbook-task">
      <label className="task_detail">
        <input
          type="checkbox"
          className="checkboxc"
          checked={task.completed}
          onChange={() => toggleTaskCompleted(columnId, task.id)}
        />
        {isEditing ? (
          <textarea
            className="task-edit-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </label>
      <button
        onClick={() => setIsEditing(true)}
        className="keeperbook-task-edit"
        title="Edit"
      >
        <MdEdit />
      </button>
      <button
        onClick={() => toggleFavorite(columnId, task.id)}
        className="keeperbook-task-fav"
        title="Favorite"
      >
        {task.favorite ? <MdFavorite color="red" /> : <MdFavoriteBorder />}
      </button>

      <button
        onClick={() => deleteTask(columnId, task.id)}
        className="keeperbook-task-delete"
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default Task;

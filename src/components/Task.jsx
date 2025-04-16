import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, index, columnId, deleteTask, toggleTaskCompleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      className="keeperbook-task"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <label className="task_detail">
        <input
          type="checkbox"
          className="checkboxc"
          onChange={() => toggleTaskCompleted(columnId, task.id)}
          checked={task.completed}
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
        onClick={() => deleteTask(columnId, task.id)}
        className="keeperbook-task-delete"
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default Task;

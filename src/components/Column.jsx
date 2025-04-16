import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Task from "./Task";

function Column({
  column,
  index,
  moveLeft,
  moveRight,
  deleteColumn,
  addTask,
  handleTaskChange,
  toggleTaskCompleted,
  deleteTask,
  newTaskTexts,
  updateColumnTitle,
  toggleFavorite,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTitleBlur() {
    setIsEditing(false);
    updateColumnTitle(column.id, title.trim() || column.title);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTitleBlur();
    }
  }

  return (
    <div className="keeperbook-column">
      <div className="keeperbook-header">
        <button onClick={() => moveLeft(index)} className="button-lr">
          <FaChevronLeft />
        </button>

        {isEditing ? (
          <input
            className="column-title-input"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="spans" onDoubleClick={() => setIsEditing(true)}>
            {column.title}
          </span>
        )}

        <button onClick={() => setIsEditing(true)} className="button-edit">
          <MdEdit />
        </button>

        <button onClick={() => moveRight(index)} className="button-lr">
          <FaChevronRight />
        </button>

        <button
          onClick={() => deleteColumn(column.id)}
          className="keeperbook-delete"
        >
          <MdDelete />
        </button>
      </div>

      <div className="keeperbook-body">
        {[...column.tasks]
          .sort((a, b) => {
            if (a.favorite === b.favorite) return 0;
            return a.favorite ? -1 : 1;
          })
          .map((task, taskIndex) => (
            <Task
              key={task.id}
              task={task}
              index={taskIndex}
              columnId={column.id}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              toggleFavorite={toggleFavorite}
            />
          ))}
        <div className="keeperbook-task-input-area">
          <textarea
            value={newTaskTexts[column.id] || ""}
            onChange={(e) => handleTaskChange(column.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addTask(column.id);
              }
            }}
            placeholder="New task"
            className="keeperbook-task-input"
          />
          <button
            onClick={() => addTask(column.id)}
            className="keeperbook-task-add"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Column;

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      className="keeperbook-column"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="keeperbook-header" {...listeners}>
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

      <SortableContext
        items={column.tasks.map((task) => task.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="keeperbook-body">
          {column.tasks.map((task, taskIndex) => (
            <Task
              key={task.id}
              task={task}
              index={taskIndex}
              columnId={column.id}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
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
      </SortableContext>
    </div>
  );
}

export default Column;

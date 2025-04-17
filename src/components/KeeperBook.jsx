import React, { useState, useRef } from "react";
import Column from "./Column";
import ColumnInput from "./ColumnInput";

function KeeperBook() {
  const [columns, setColumns] = useState([
    { id: 1, title: "To DO", tasks: [] },
    { id: 2, title: "Development", tasks: [] },
    { id: 4, title: "In Review", tasks: [] },
  ]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newTaskTexts, setNewTaskTexts] = useState({});

  function handleTaskChange(columnId, value) {
    setNewTaskTexts((prev) => ({ ...prev, [columnId]: value }));
  }

  function updateColumnTitle(columnId, newTitle) {
    const updated = columns.map((col) =>
      col.id === columnId ? { ...col, title: newTitle } : col
    );
    setColumns(updated);
  }

  function addTask(columnId) {
    const text = newTaskTexts[columnId]?.trim();
    if (!text) return;
    const updated = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            tasks: [
              ...col.tasks,
              {
                id: Date.now().toString(),
                text,
                completed: false,
                favorite: false,
              },
            ],
          }
        : col
    );
    setColumns(updated);
    setNewTaskTexts((prev) => ({ ...prev, [columnId]: "" }));
  }

  function deleteTask(columnId, taskId) {
    const updated = columns.map((col) =>
      col.id === columnId
        ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
        : col
    );
    setColumns(updated);
  }

  function toggleTaskCompleted(columnId, taskId, newText) {
    const updated = columns.map((col) => {
      if (col.id !== columnId) return col;

      const updatedTasks = col.tasks.map((task) => {
        if (task.id !== taskId) return task;

        const updatedTask = { ...task };

        if (newText === undefined) {
          updatedTask.completed = !task.completed;
        } else {
          updatedTask.text = newText;
        }

        return updatedTask;
      });

      return { ...col, tasks: updatedTasks };
    });

    setColumns(updated);
  }

  function toggleFavorite(columnId, taskId) {
    const updated = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId ? { ...task, favorite: !task.favorite } : task
            ),
          }
        : col
    );
    setColumns(updated);
  }

  function deleteTask(columnId, taskId) {
    const updated = columns.map((col) =>
      col.id === columnId
        ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
        : col
    );
    setColumns(updated);
  }
  function moveLeft(index) {
    if (index === 0) return;
    const updated = [...columns];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setColumns(updated);
  }

  function moveRight(index) {
    if (index === columns.length - 1) return;
    const updated = [...columns];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setColumns(updated);
  }

  function addColumn() {
    if (newColumnName.trim() === "") return;
    const newCol = {
      id: Date.now(),
      title: newColumnName,
      tasks: [],
    };
    setColumns([...columns, newCol]);
    setNewColumnName("");
  }

  function deleteColumn(id) {
    setColumns(columns.filter((col) => col.id !== id));
  }

  const dragTaskRef = useRef(null);
  const dragSourceColRef = useRef(null);

  function handleTaskDragStart(e, task, columnId) {
    dragTaskRef.current = task;
    dragSourceColRef.current = columnId;
    e.target.style.opacity = "0.5";
  }

  function handleTaskDragEnd(e) {
    e.target.style.opacity = "1";
  }

  function handleTaskDrop(targetColId) {
    const task = dragTaskRef.current;
    const sourceColId = dragSourceColRef.current;

    if (!task || sourceColId === targetColId) return;

    setColumns((prev) => {
      return prev.map((col) => {
        if (col.id === sourceColId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== task.id),
          };
        }
        if (col.id === targetColId) {
          return {
            ...col,
            tasks: [...col.tasks, task],
          };
        }
        return col;
      });
    });

    dragTaskRef.current = null;
    dragSourceColRef.current = null;
  }

  return (
    <div className="keeperbook-container">
      <ColumnInput
        newColumnName={newColumnName}
        setNewColumnName={setNewColumnName}
        addColumn={addColumn}
      />
      <div className="keeperbook-board">
        {columns.map((col, index) => (
          <div className="fullname" key={col.id}>
            <Column
              column={col}
              index={index}
              newTaskTexts={newTaskTexts}
              handleTaskChange={handleTaskChange}
              addTask={addTask}
              deleteTask={deleteTask}
              toggleTaskCompleted={toggleTaskCompleted}
              moveLeft={moveLeft}
              moveRight={moveRight}
              deleteColumn={deleteColumn}
              updateColumnTitle={updateColumnTitle}
              toggleFavorite={toggleFavorite}
              handleTaskDragStart={handleTaskDragStart}
              handleTaskDragEnd={handleTaskDragEnd}
              handleTaskDrop={handleTaskDrop}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeeperBook;

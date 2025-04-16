import React, { useState } from "react";
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
              { id: Date.now().toString(), text, completed: false },
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
    const updated = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    completed:
                      newText === undefined ? !task.completed : task.completed,
                    text: newText !== undefined ? newText : task.text,
                  }
                : task
            ),
          }
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeeperBook;

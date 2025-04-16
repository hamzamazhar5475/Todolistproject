import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function KeeperBook() {
  const [columns, setColumns] = useState([
    { id: 1, title: "To DO", tasks: [] },
    { id: 2, title: "Development", tasks: [] },
    { id: 3, title: "In Review", tasks: [] },
  ]);

  const [newTaskTexts, setNewTaskTexts] = useState({});

  function handleTaskChange(columnId, value) {
    setNewTaskTexts(function (prevState) {
      const updatedState = {
        ...prevState,
        [columnId]: value,
      };

      return updatedState;
    });
  }

  function addTask(columnId) {
    const text = newTaskTexts[columnId]?.trim();

    if (!text) return;

    const updatedColumns = columns.map(function (col) {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: [...col.tasks, { id: Date.now(), text }],
        };
      }
      return col;
    });
    setColumns(updatedColumns);

    setNewTaskTexts(function (prevState) {
      const updatedState = {
        ...prevState,
        [columnId]: "",
      };
      return updatedState;
    });
  }

  function deleteTask(columnId, taskId) {
    const updatedColumns = columns.map(function (col) {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: col.tasks.filter(function (task) {
            return task.id !== taskId;
          }),
        };
      }

      return col;
    });
    setColumns(updatedColumns);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter(function (column) {
      return column.id !== id;
    });
    setColumns(filteredColumns);
  }

  function moveLeft(index) {
    if (index === 0) {
      return;
    }

    const updatedColumns = [...columns];
    const temp = updatedColumns[index];
    updatedColumns[index] = updatedColumns[index - 1];
    updatedColumns[index - 1] = temp;

    setColumns(updatedColumns);
  }

  function moveRight(index) {
    if (index === columns.length - 1) {
      return;
    }

    const updatedColumns = [...columns];
    const temp = updatedColumns[index];
    updatedColumns[index] = updatedColumns[index + 1];
    updatedColumns[index + 1] = temp;

    setColumns(updatedColumns);
  }

  const [newColumnName, setNewColumnName] = useState("");

  function handleChange(event) {
    setNewColumnName(event.target.value);
  }

  function addColumn() {
    if (newColumnName.trim() === "") {
      return;
    }

    const newColumn = {
      id: Date.now(),
      title: newColumnName,
    };

    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
    setNewColumnName("");
  }

  return (
    <div className="keeperbook-container">
      <div className="keeperbook-add">
        <input
          type="text"
          value={newColumnName}
          onChange={handleChange}
          placeholder="New project"
          className="keeperbook-input"
        />
        <button onClick={addColumn} className="keeperbook-button">
          Add
        </button>
      </div>

      // <div className="keeperbook-board">
      //   {columns.map(function (col, index) {
      //     return (
      //       <div key={col.id} className="keeperbook-column">
      //         <div className="keeperbook-header">
      //           <button
      //             onClick={function () {
      //               moveLeft(index);
      //             }}
      //             className="button-lr"
      //           >
      //             <FaChevronLeft />
      //           </button>
      //           <span>{col.title}</span>
      //           <button
      //             onClick={function () {
      //               moveRight(index);
      //             }}
      //             className="button-lr"
      //           >
      //             <FaChevronRight />
      //           </button>
      //           <button
      //             onClick={function () {
      //               deleteColumn(col.id);
      //             }}
      //             className="keeperbook-delete"
      //           >
      //             <MdDelete />
      //           </button>
      //         </div>

      //         // <div className="keeperbook-body">
      //         //   {Array.isArray(col.tasks) &&
      //         //     col.tasks.map((task) => (
      //         //       <div key={task.id} className="keeperbook-task">
      //         //         {task.text}
      //         //         <button
      //         //           onClick={() => deleteTask(col.id, task.id)}
      //         //           className="keeperbook-task-delete"
      //         //         >
      //         //           <MdDelete />
      //         //         </button>
      //         //       </div>
      //         //     ))}

      //         //   <div className="keeperbook-task-input-area">
      //         //     <textarea
      //         //       value={newTaskTexts[col.id] || ""}
      //         //       onChange={(e) => handleTaskChange(col.id, e.target.value)}
      //         //       placeholder="New task"
      //         //       className="keeperbook-task-input"
      //         //     />
      //         //     <button
      //         //       onClick={() => addTask(col.id)}
      //         //       className="keeperbook-task-add"
      //         //     >
      //         //       Add
      //         //     </button>
      //         //   </div>
      //         // </div>
      //       </div>
      //     );
      //   })}
      // </div>
    </div>
  );
}

export default KeeperBook;
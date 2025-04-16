🔧 1. Update KeeperBook.js with drag logic:

Add this near the top, after useState:

import { useRef } from "react";

Then inside the KeeperBook function, add:

const dragTaskRef = useRef(null);
const dragSourceColRef = useRef(null);

function handleDragStart(task, columnId) {
  dragTaskRef.current = task;
  dragSourceColRef.current = columnId;
}

function handleDragEnd(e) {
  e.target.style.opacity = "1";
}

function handleDrop(targetColId) {
  const task = dragTaskRef.current;
  const sourceColId = dragSourceColRef.current;

  if (!task || sourceColId === targetColId) return;

  setColumns((prevCols) => {
    const newCols = prevCols.map((col) => {
      if (col.id === sourceColId) {
        return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) };
      }
      if (col.id === targetColId) {
        return { ...col, tasks: [...col.tasks, task] };
      }
      return col;
    });
    return newCols;
  });

  dragTaskRef.current = null;
  dragSourceColRef.current = null;
}

Then pass these down to Column:

<Column
  ...
  handleDragStart={handleDragStart}
  handleDragEnd={handleDragEnd}
  handleDrop={handleDrop}
/>

🔧 2. Update Column.js to support dropping:

Update the component props to include the new handlers:

function Column({
  ...
  handleDragStart,
  handleDragEnd,
  handleDrop
})

In the return JSX, add drag-over and drop handlers on the column body:

<div
  className="keeperbook-body"
  onDragOver={(e) => e.preventDefault()}
  onDrop={() => handleDrop(column.id)}
>
  ...
</div>

Then, update the Task component render inside Column:

<Task
  ...
  handleDragStart={handleDragStart}
  handleDragEnd={handleDragEnd}
/>

🔧 3. Update Task.js to be draggable:

Update props:

function Task({
  ...
  handleDragStart,
  handleDragEnd
})

Add to the main task container:

<div
  className="keeperbook-task"
  draggable
  onDragStart={() => handleDragStart(task, columnId)}
  onDragEnd={handleDragEnd}
>


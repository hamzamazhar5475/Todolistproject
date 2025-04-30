🔌 At the top:
js
Copy
Edit
import { useRef } from "react";
🧠 Inside KeeperBook:
Add these refs and functions:

js
Copy
Edit
// Stores the task being dragged
const dragTaskRef = useRef(null);

// Stores the ID of the column the task is being dragged from
const dragSourceColRef = useRef(null);


function handleTaskDragStart(task, columnId) {
  // When a task starts dragging, store the task itself
  dragTaskRef.current = task;

  // Store which column it's coming from
  dragSourceColRef.current = columnId;

  e.target.style.opacity = "0.5";
}

function handleTaskDragEnd(e) {
  // Reset the opacity of the dragged element back to normal
  e.target.style.opacity = "1";
}


function handleTaskDrop(targetColId) {
  const task = dragTaskRef.current;         // Task being dragged
  const sourceColId = dragSourceColRef.current; // Column it came from

  // If no task is being dragged or the source and target are the same column, do nothing
  if (!task || sourceColId === targetColId) return;

  // Update the columns state to reflect the moved task
  setColumns((prev) => {
    return prev.map((col) => {
      // If this is the column the task came from, remove the task
      if (col.id === sourceColId) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== task.id),
        };
      }

      // If this is the column the task is being dropped into, add the task to the end
      if (col.id === targetColId) {
        return {
          ...col,
          tasks: [...col.tasks, task],
        };
      }

      // For all other columns, return them unchanged
      return col;
    });
  });

  // Clear the drag references now that the task has been dropped
  dragTaskRef.current = null;
  dragSourceColRef.current = null;
}

🔁 Pass these to Column:
In your .map() where you're rendering columns:

jsx
Copy
Edit

<Column
  ...
  handleTaskDragStart={handleTaskDragStart}
  handleTaskDragEnd={handleTaskDragEnd}
  handleTaskDrop={handleTaskDrop}
/>

🧩 2. Update Column.js
✏️ Update the props:
js
Copy
Edit

function Column({
  ...
  handleTaskDragStart,
  handleTaskDragEnd,
  handleTaskDrop
})

🧲 Add onDrop and onDragOver to the task container:
Find this in your JSX:

jsx
Copy
Edit

<div className="keeperbook-body">

Change it to:

jsx
Copy
Edit

<div
  className="keeperbook-body"
  onDragOver={(e) => e.preventDefault()}
  onDrop={() => handleTaskDrop(column.id)}
>

🧠 Pass the drag handlers to each task:
In your .map() of tasks:

jsx
Copy
Edit

<Task
  handleDragStart={handleTaskDragStart}
  handleDragEnd={handleTaskDragEnd}
/>

🎯 3. Update Task.js to make it draggable
✏️ Add new props:
js
Copy
Edit

function Task({
  ...
  handleDragStart,
  handleDragEnd
})

🔁 Wrap the outer div:
Update the main container to be draggable with cursor styling:

jsx
Copy
Edit

<div
  className="keeperbook-task"
  draggable
  onDragStart={(e) => handleDragStart(e, task, columnId)}
  onDragEnd={handleDragEnd}
  style={{ cursor: "move" }}
>
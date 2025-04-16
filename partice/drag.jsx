✅ 1. Add State for Editing and Text

Inside Task.jsx:

const [isEditing, setIsEditing] = useState(false); // controls edit mode
const [text, setText] = useState(task.text);       // local editable text

✅ 2. Start Editing

Allow the user to enter edit mode by double-clicking the task label or clicking an edit icon:

<span
  onDoubleClick={() => setIsEditing(true)}
  style={{ marginLeft: "8px", textDecoration: task.completed ? "line-through" : "none" }}
>
  {task.text}
</span>

<button onClick={() => setIsEditing(true)} className="button-edit">
  <MdEdit />
</button>

    This sets isEditing to true → shows the <input> instead of the text.

✅ 3. Render Editable Input

When editing is active, show the input field:

{isEditing ? (
  <input
    className="task-edit-input"
    value={text}
    onChange={(e) => setText(e.target.value)}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
    autoFocus
  />
) : (
  // the span and edit button above
)}

✅ 4. Handle Save on Blur or Enter

function handleBlur() {
  setIsEditing(false);
  if (text.trim() !== task.text) {
    updateTaskText(columnId, task.id, text.trim());
  }
}

function handleKeyDown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleBlur();
  }
}

✅ 5. Add updateTaskText() in KeeperBook

In KeeperBook.jsx:

function updateTaskText(columnId, taskId, newText) {
  const updated = columns.map((col) =>
    col.id === columnId
      ? {
          ...col,
          tasks: col.tasks.map((task) =>
            task.id === taskId ? { ...task, text: newText } : task
          ),
        }
      : col
  );
  setColumns(updated);
}

✅ 6. Pass updateTaskText to Task

From Column.jsx, pass it to each <Task />:

<Task
  ...
  updateTaskText={updateTaskText}
/>

Make sure Column.jsx receives updateTaskText as a prop from KeeperBook.
✅ Summary

So the task editing flow works like this:

    User double-clicks a task or clicks ✏️ edit →
    setIsEditing(true) →
    input is shown →
    user types →
    on blur or Enter →
    handleBlur() →
    updateTaskText() from KeeperBook →
    columns state is updated →
    task re-renders with new text 🎉
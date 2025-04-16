const [isEditing, setIsEditing] = useState(false); // controls whether we're in edit mode
const [title, setTitle] = useState(column.title); // local state for editing title

<span onDoubleClick={() => setIsEditing(true)}>
  {column.title}
</span>

<button onClick={() => setIsEditing(true)} className="button-edit">
  <MdEdit />
</button>

<input
  className="column-title-input"
  value={title}
  onChange={handleTitleChange}
  onBlur={handleTitleBlur}
  onKeyDown={handleKeyDown}
  autoFocus
/>


function handleTitleBlur() {
  setIsEditing(false);
  updateColumnTitle(column.id, title.trim() || column.title);
}

function updateColumnTitle(columnId, newTitle) {
  const updated = columns.map((col) =>
    col.id === columnId ? { ...col, title: newTitle } : col
  );
  setColumns(updated);
}


User double-clicks title or clicks ✏️ edit →
  setIsEditing(true) →
    input box shown →
      user types →
        onBlur or Enter →
          handleTitleBlur() →
            updateColumnTitle() passed from KeeperBook →
              columns state is updated →
                re-render with new title 🎉
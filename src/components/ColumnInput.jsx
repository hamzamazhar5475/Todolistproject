import React from "react";

function ColumnInput({ newColumnName, setNewColumnName, addColumn }) {
  return (
    <div className="keeperbook-add">
      <input
        type="text"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addColumn()}
        placeholder="New project"
        className="keeperbook-input"
      />
      <button onClick={addColumn} className="keeperbook-button">
        Add
      </button>
    </div>
  );
}

export default ColumnInput;

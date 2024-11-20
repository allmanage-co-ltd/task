function KanbanColumn({ title, tasks, onMoveTask }) {
  const handleMove = (taskId, direction) => {
    const newStatus =
      direction === "next"
        ? title === "未着手"
          ? "in-progress"
          : "done"
        : title === "進行中"
        ? "todo"
        : "in-progress";

    onMoveTask(taskId, newStatus);
  };

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        flex: 1,
      }}
    >
      <h3>{title}</h3>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              margin: "8px 0",
              borderRadius: "4px",
              background: "#fff",
            }}
          >
            <p>{task.title}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleMove(task.id, "prev")}>
                ← 戻す
              </button>
              <button onClick={() => handleMove(task.id, "next")}>
                進める →
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KanbanColumn;

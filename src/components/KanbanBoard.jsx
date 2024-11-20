import React, { useState } from "react";
import KanbanColumn from "./KanbanColumn";

function KanbanBoard() {
  const columns = [
    { id: "todo", title: "未着手" },
    { id: "in-progress", title: "進行中" },
    { id: "done", title: "完了" },
  ];

  const [tasks, setTasks] = useState([
    { id: "1", title: "プロジェクト計画の作成", status: "todo" },
    { id: "2", title: "デザインレビュー", status: "in-progress" },
    { id: "3", title: "バグ修正", status: "done" },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title: newTask, status: "todo" },
    ]);
    setNewTask("");
  };

  return (
    <div>
      <div style={{ padding: "16px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <button onClick={addTask}>追加</button>
      </div>
      <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.id)}
            onMoveTask={(taskId, newStatus) => {
              setTasks(
                tasks.map((task) =>
                  task.id === taskId ? { ...task, status: newStatus } : task
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;

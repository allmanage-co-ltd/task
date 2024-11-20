import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { MoreHorizontal, Trash2 } from "lucide-react";

// KanbanColumn.jsx を修正
const KanbanColumn = ({
  id,
  title,
  tasks,
  color,
  tags,
  onToggleTag,
  onDelete,
}) => {
  // tags とonToggleTag を props に追加
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className="flex flex-col bg-white rounded-lg shadow">
      <div className="column-header">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <span className="px-2.5 py-0.5 text-sm font-medium bg-gray-100 text-gray-600 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className={`column-content ${color}`}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            tags={tags} // tags を渡す
            onToggleTag={onToggleTag} // onToggleTag を渡す
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from './KanbanBoard';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, tasks, color }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${color} rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <span className="px-3 py-1 text-sm font-medium bg-white rounded-full text-gray-600 shadow-sm">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
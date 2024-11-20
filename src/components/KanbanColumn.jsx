import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { MoreHorizontal } from 'lucide-react';

const KanbanColumn = ({ id, title, tasks, color }) => {
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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { Task } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-move hover:shadow-md transition-shadow"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-gray-700">{task.title}</p>
      </div>
    </div>
  );
};

export default TaskCard;
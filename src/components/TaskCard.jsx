import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, AlertCircle, Clock, MoreHorizontal, Tag as TagIcon } from 'lucide-react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

const TaskCard = ({ task, tags, onToggleTag }) => {
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
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
      className="task-card relative"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-gray-900 font-medium mb-2">{task.title}</p>
            
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {task.tags.map(tagName => {
                  const tag = tags.find(t => t.name === tagName);
                  return tag ? (
                    <span
                      key={tag.id}
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                      }}
                    >
                      {tag.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <AlertCircle className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                <span>{task.priority}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>3日後</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <TagIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {isTagMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => {
                onToggleTag(task.id, tag.name);
                setIsTagMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              <span>{tag.name}</span>
              {task.tags.includes(tag.name) && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
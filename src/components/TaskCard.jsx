import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  GripVertical,
  AlertCircle,
  MoreHorizontal,
  Tag as TagIcon,
} from "lucide-react";

const TaskCard = ({ task, tags, onToggleTag }) => {
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleTagClick = () => {
    setIsTagMenuOpen(!isTagMenuOpen);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow relative"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* ドラッグハンドルのみにリスナーを適用 */}
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex-1">
            <p className="text-gray-900 font-medium mb-2">{task.title}</p>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {task.tags.map((tagName) => {
                  const tag = tags.find((t) => t.name === tagName);
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
                <AlertCircle className="w-4 h-4" />
                <span>{task.priority}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTagClick}
            className="p-1 hover:bg-gray-100 rounded-full"
            type="button"
          >
            <TagIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {isTagMenuOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => {
                onToggleTag(task.id, tag.name);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              type="button"
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

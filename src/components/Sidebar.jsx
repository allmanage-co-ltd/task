import React, { useState } from "react";
import { Tag, Plus, X, Edit2, Check, Trash2 } from "lucide-react";

const Sidebar = ({ isOpen, tags, onAddTag, onUpdateTag, onDeleteTag }) => {
  const [newTag, setNewTag] = useState({ name: "", color: "#3B82F6" });
  const [editingTagId, setEditingTagId] = useState(null);
  const [editingTag, setEditingTag] = useState({ name: "", color: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTag.name.trim()) return;

    onAddTag(newTag);
    setNewTag({ name: "", color: "#3B82F6" });
  };

  const startEditing = (tag) => {
    setEditingTagId(tag.id);
    setEditingTag({ name: tag.name, color: tag.color });
  };

  const saveEdit = (tagId) => {
    if (!editingTag.name.trim()) return;

    onUpdateTag(tagId, editingTag);
    setEditingTagId(null);
    setEditingTag({ name: "", color: "" });
  };

  return (
    <div
      className={`
      fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30
      ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"}
    `}
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">タグ管理</h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="space-y-3">
            <input
              type="text"
              value={newTag.name}
              onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              placeholder="新しいタグ名"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newTag.color}
                onChange={(e) =>
                  setNewTag({ ...newTag, color: e.target.value })
                }
                className="w-8 h-8 rounded cursor-pointer"
              />
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                タグを追加
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg group"
            >
              {editingTagId === tag.id ? (
                <>
                  <input
                    type="text"
                    value={editingTag.name}
                    onChange={(e) =>
                      setEditingTag({ ...editingTag, name: e.target.value })
                    }
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="color"
                    value={editingTag.color}
                    onChange={(e) =>
                      setEditingTag({ ...editingTag, color: e.target.value })
                    }
                    className="w-6 h-6 rounded cursor-pointer"
                  />
                  <button
                    onClick={() => saveEdit(tag.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Check size={16} className="text-green-600" />
                  </button>
                  <button
                    onClick={() => setEditingTagId(null)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="flex-1 text-gray-700">{tag.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                    <button
                      onClick={() => startEditing(tag)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => onDeleteTag(tag.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

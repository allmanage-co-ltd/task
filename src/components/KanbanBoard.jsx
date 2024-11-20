import React, { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import Sidebar from './Sidebar';
import { Plus, Layout, Search, Menu } from 'lucide-react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'プロジェクト計画の作成', 
      status: 'todo', 
      priority: 'high',
      tags: ['企画', '重要']
    },
    { 
      id: '2', 
      title: 'デザインレビュー', 
      status: 'in-progress', 
      priority: 'medium',
      tags: ['デザイン']
    },
    { 
      id: '3', 
      title: 'バグ修正', 
      status: 'done', 
      priority: 'low',
      tags: ['開発']
    },
  ]);

  const [tags, setTags] = useState([
    { id: '1', name: '企画', color: '#EF4444' },
    { id: '2', name: 'デザイン', color: '#3B82F6' },
    { id: '3', name: '開発', color: '#10B981' },
    { id: '4', name: '重要', color: '#F59E0B' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const columns = [
    { id: 'todo', title: '未着手', color: 'bg-gray-50 hover:bg-gray-100' },
    { id: 'in-progress', title: '進行中', color: 'bg-blue-50 hover:bg-blue-100' },
    { id: 'done', title: '完了', color: 'bg-green-50 hover:bg-green-100' },
  ];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overColumn = over.id;

    if (activeTask && typeof overColumn === 'string') {
      setTasks(tasks.map(task => 
        task.id === activeTask.id 
          ? { ...task, status: overColumn }
          : task
      ));
    }
  };

  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask,
      status: 'todo',
      priority: 'medium',
      tags: [],
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const addTag = (tagData) => {
    setTags([...tags, { id: Date.now().toString(), ...tagData }]);
  };

  const updateTag = (tagId, updatedData) => {
    setTags(tags.map(tag => 
      tag.id === tagId ? { ...tag, ...updatedData } : tag
    ));
  };

  const deleteTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    setTasks(tasks.map(task => ({
      ...task,
      tags: task.tags.filter(tagName => 
        tags.find(t => t.id === tagId)?.name !== tagName
      )
    })));
  };

  const toggleTaskTag = (taskId, tagName) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const hasTag = task.tags.includes(tagName);
        return {
          ...task,
          tags: hasTag
            ? task.tags.filter(t => t !== tagName)
            : [...task.tags, tagName]
        };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={isSidebarOpen}
        tags={tags}
        onAddTag={addTag}
        onUpdateTag={updateTag}
        onDeleteTag={deleteTag}
      />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <Layout className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">カンバンボード</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="タスクを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <form onSubmit={addNewTask} className="flex">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="新しいタスクを入力..."
                    className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                  >
                    <Plus size={20} />
                    追加
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  color={column.color}
                  tasks={filteredTasks.filter(task => task.status === column.id)}
                  tags={tags}
                  onToggleTag={toggleTaskTag}
                />
              ))}
            </div>
          </DndContext>
        </main>
      </div>
    </div>
  );
};

export default KanbanBoard;
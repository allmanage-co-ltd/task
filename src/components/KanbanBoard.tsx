import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import { Plus } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  status: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'プロジェクト計画の作成', status: 'todo' },
    { id: '2', title: 'デザインレビュー', status: 'in-progress' },
    { id: '3', title: 'バグ修正', status: 'done' },
  ]);

  const [newTask, setNewTask] = useState('');

  const columns = [
    { id: 'todo', title: '未着手', color: 'bg-rose-50' },
    { id: 'in-progress', title: '進行中', color: 'bg-amber-50' },
    { id: 'done', title: '完了', color: 'bg-emerald-50' },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
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

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj: Task = {
      id: Date.now().toString(),
      title: newTask,
      status: 'todo',
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">カンバンボード</h1>
        
        <form onSubmit={addNewTask} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="新しいタスクを入力..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus size={20} />
              追加
            </button>
          </div>
        </form>

        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                color={column.color}
                tasks={tasks.filter(task => task.status === column.id)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
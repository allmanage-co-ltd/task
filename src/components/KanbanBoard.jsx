import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import Sidebar from "./Sidebar";
import { Plus, Layout, Search, Menu } from "lucide-react";
import { initialData } from "../data/initialData";

const KanbanBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState(initialData.tasks);
  const [tags, setTags] = useState(initialData.tags);
  const [columns, setColumns] = useState(initialData.columns);

  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask,
      status: "todo",
      priority: "medium",
      tags: [],
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const handleAddList = (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    const newList = {
      id: newListTitle.toLowerCase().replace(/\s+/g, "-"),
      title: newListTitle,
      color: "bg-gray-50 hover:bg-gray-100",
    };

    setColumns((prev) => [...prev, newList]);
    setNewListTitle("");
    setIsAddingList(false);
  };

  const handleDeleteList = (listId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.status === listId ? { ...task, status: "todo" } : task
      )
    );
    setColumns((prev) => prev.filter((col) => col.id !== listId));
  };

  const addTag = (tagData) => {
    setTags((prevTags) => [
      ...prevTags,
      {
        id: `tag-${Date.now()}`, // より確実に一意のIDを生成
        ...tagData,
      },
    ]);
  };

  const deleteTag = (tagId) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        tags: task.tags.filter(
          (tagName) => tags.find((tag) => tag.id === tagId)?.name !== tagName
        ),
      }))
    );
  };

  const toggleTaskTag = (taskId, tagName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              tags: task.tags.includes(tagName)
                ? task.tags.filter((t) => t !== tagName)
                : [...task.tags, tagName],
            }
          : task
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        tags={tags}
        onAddTag={addTag}
        onDeleteTag={deleteTag}
      />

      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mr-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <Layout className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">進捗管理</h1>
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

        <main className=" mr-auto px-4 sm:px-6 lg:px-8 py-8">
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <div className="list-g flex gap-6 overflow-x-auto pb-4">
              {columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 w-80">
                  <KanbanColumn
                    id={column.id}
                    title={column.title}
                    color={column.color}
                    tasks={filteredTasks.filter(
                      (task) => task.status === column.id
                    )}
                    tags={tags}
                    onToggleTag={toggleTaskTag}
                    onDelete={() => handleDeleteList(column.id)}
                  />
                </div>
              ))}

              <div className="flex-shrink-0 w-80">
                {isAddingList ? (
                  <form
                    onSubmit={handleAddList}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        placeholder="リスト名を入力..."
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          追加
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingList(false);
                            setNewListTitle("");
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingList(true)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 text-gray-600"
                  >
                    <Plus className="w-5 h-5" />
                    リストを追加
                  </button>
                )}
              </div>
            </div>
          </DndContext>
        </main>
      </div>
    </div>
  );
};

export default KanbanBoard;

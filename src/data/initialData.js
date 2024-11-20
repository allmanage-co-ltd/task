export const initialData = {
  tasks: [
    {
      id: "1",
      title: "プロジェクト計画の作成",
      status: "todo",
      priority: "high",
      tags: ["企画", "重要"],
    },
    {
      id: "2",
      title: "デザインレビュー",
      status: "in-progress",
      priority: "medium",
      tags: ["デザイン"],
    },
    {
      id: "3",
      title: "バグ修正",
      status: "done",
      priority: "low",
      tags: ["開発"],
    },
    {
      id: "4",
      title: "完了済み",
      status: "archive",
      priority: "low",
      tags: ["開発"],
    },
  ],

  tags: [
    { id: "tag-1", name: "企画", color: "#EF4444" },
    { id: "tag-2", name: "デザイン", color: "#3B82F6" },
    { id: "tag-3", name: "開発", color: "#10B981" },
    { id: "tag-4", name: "重要", color: "#F59E0B" },
  ],

  columns: [
    { id: "todo", title: "未着手", color: "bg-gray-50 hover:bg-gray-100" },
    {
      id: "in-progress",
      title: "進行中",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    { id: "done", title: "完了", color: "bg-green-50 hover:bg-green-100" },
    { id: "archive", title: "アーカイブ", color: "bg-green-50 hover:bg-green-100" },
  ],
};
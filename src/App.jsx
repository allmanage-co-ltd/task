import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./styles/style.scss";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <KanbanBoard />
    </div>
  );
}

export default App;

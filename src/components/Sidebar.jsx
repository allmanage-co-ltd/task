import React from "react";

function Sidebar({ isOpen }) {
  if (!isOpen) return null; // isOpenがfalseの場合、何も表示しない

  return (
    <div style={{ width: "200px", backgroundColor: "#ddd", padding: "16px" }}>
      <h2>Sidebar</h2>
      <p>サイドバーが表示されています。</p>
    </div>
  );
}

export default Sidebar;

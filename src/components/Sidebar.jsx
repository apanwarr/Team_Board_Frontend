import React from 'react';

function Sidebar({ boards, onSelect }) {
  return (
    <div className="sidebar">
      <h2>Boards</h2>
      {boards.map(board => (
        <div key={board._id} onClick={() => onSelect(board)} className="sidebar-item">
          {board.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;

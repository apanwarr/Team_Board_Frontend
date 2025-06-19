import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import BoardView from './components/BoardView';
import './App.css';

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newBoardName, setNewBoardName] = useState('');

  const fetchBoards = () => {
    fetch(`${import.meta.env.VITE_API_URL}/boards`)
      .then(res => res.json())
      .then(setBoards);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    await fetch(`${import.meta.env.VITE_API_URL}/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newBoardName })
    });
    setNewBoardName('');
    fetchBoards();
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Boards</h2>
        <form onSubmit={handleCreateBoard} className="board-form">
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="New Board Name"
            required
          />
          <button type="submit" className="create-btn">Create</button>
        </form>
        <div className="board-list">
          {boards.map((board) => (
            <div
              key={board._id}
              className={`sidebar-item ${selectedBoard?._id === board._id ? 'active' : ''}`}
              onClick={() => setSelectedBoard(board)}
            >
              {board.name}
            </div>
          ))}
        </div>
      </div>
      <div className="main-view">
        {selectedBoard ? (
          <BoardView board={selectedBoard} />
        ) : (
          <p className="placeholder">Select a board to view tasks</p>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';

function BoardView({ board, onBoardDelete }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    assignedTo: '',
    dueDate: ''
  });
  const [editTask, setEditTask] = useState(null);

  const statuses = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    if (board) {
      fetch(`${import.meta.env.VITE_API_URL}/boards/${board._id}/tasks`)
        .then(res => res.json())
        .then(setTasks);
    }
  }, [board]);

  const handleCreate = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/boards/${board._id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    const created = await res.json();
    setTasks(prev => [...prev, created]);
    setNewTask({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Low',
      assignedTo: '',
      dueDate: ''
    });
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/boards/${board._id}`, {
      method: 'DELETE'
    });
    setTasks(prev => prev.filter(task => task._id !== id));
  };

  const handleUpdate = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${editTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editTask)
    });
    setTasks(prev =>
      prev.map(t => (t._id === editTask._id ? editTask : t))
    );
    setEditTask(null);
  };

  const handleBoardDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this board?');
    if (!confirmDelete) return;

    await fetch(`${import.meta.env.VITE_API_URL}/boards/${board._id}`, {
      method: 'DELETE'
    });

    if (typeof onBoardDelete === 'function') {
      onBoardDelete(board._id);
    }
  };

  return (
    <div className="board-view">
      <button
        className="delete-board-btn"
        style={{ backgroundColor: 'crimson', color: 'white', marginBottom: '10px' }}
        onClick={handleBoardDelete}
      >
        Delete This Board
      </button>

      <div className="task-form">
        <input placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
        <input placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
        <select value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input placeholder="Assigned To" value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} />
        <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className="columns">
        {statuses.map(status => (
          <div key={status} className="task-column">
            <h3>{status}</h3>
            {tasks.filter(task => task.status === status).map(task => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p><strong>Assigned To:</strong> {task.assignedTo}</p>
                <p><strong>Due:</strong> {task.dueDate?.slice(0, 10)}</p>
                <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <div className="task-actions">
                  <button onClick={() => setEditTask(task)}>Edit</button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editTask && (
        <div className="modal">
          <div className="modal-content">
            <input value={editTask.title} onChange={e => setEditTask({ ...editTask, title: e.target.value })} />
            <input value={editTask.description} onChange={e => setEditTask({ ...editTask, description: e.target.value })} />
            <select value={editTask.status} onChange={e => setEditTask({ ...editTask, status: e.target.value })}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={editTask.priority} onChange={e => setEditTask({ ...editTask, priority: e.target.value })}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input value={editTask.assignedTo} onChange={e => setEditTask({ ...editTask, assignedTo: e.target.value })} />
            <input type="date" value={editTask.dueDate?.slice(0, 10)} onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardView;

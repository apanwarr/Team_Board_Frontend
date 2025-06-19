import React, { useState } from 'react';

function CreateTaskForm({ boardId, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/boards/${boardId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority, status, assignedTo, dueDate })
    });

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setStatus('To Do');
    setAssignedTo('');
    setDueDate('');
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Assigned To" />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default CreateTaskForm;

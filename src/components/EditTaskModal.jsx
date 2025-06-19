import React, { useState } from 'react';

function EditTaskModal({ task, onClose, onUpdated }) {
  const [form, setForm] = useState({ ...task });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    onClose();
    onUpdated();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-content">
        <input name="title" value={form.title} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input name="assignedTo" value={form.assignedTo} onChange={handleChange} />
        <input type="date" name="dueDate" value={form.dueDate?.slice(0, 10)} onChange={handleChange} />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default EditTaskModal;


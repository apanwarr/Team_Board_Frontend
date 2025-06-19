import React from 'react';

function TaskCard({ task }) {
  return (
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Assigned:</strong> {task.assignedTo}</p>
      <p><strong>Due:</strong> {task.dueDate?.slice(0, 10)}</p>
      <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
    </div>
  );
}

export default TaskCard;

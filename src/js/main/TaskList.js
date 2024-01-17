import React from 'react';

function TaskList({ tasks, onDelete, onComplete, isActive, username }) {
    return (
        <ul className="task-list">
            {tasks.map((task, idx) => (
                <li key={task.taskId || idx}>
                    <div className="task-details">
                        <strong>{task.taskName}</strong>
                        <p>{task.taskDesc}</p>
                        {isActive && (
                            <p>Due at: {new Date(task.dueTime).toLocaleString()}</p>
                        )}
                        {!isActive && task.completedTime && (
                            <p>Completed at: {new Date(task.completedTime).toLocaleString()} by {task.completedBy || username}</p>
                        )}
                        <p>Assigned by: {username}</p>
                    </div>
                    <div className="task-buttons">
                        {isActive && onComplete && (
                            <button className="complete-button" onClick={() => onComplete(idx)}>✔️</button>
                        )}
                        <button className="delete-button" onClick={() => onDelete(idx)}>&#x1F5D1;</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

function formatNextDue(recurrence, dueTime) {
    const [x1,] = recurrence.split(',').map(Number);
    const taskDueDate = new Date(dueTime);
    taskDueDate.setDate(taskDueDate.getDate() + x1);
    return `Next due on ${taskDueDate.toLocaleDateString()} at ${taskDueDate.toLocaleTimeString()}.`;
}

export default TaskList;

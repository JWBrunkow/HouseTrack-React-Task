import React from 'react';

function TaskList({ tasks, onDelete, onComplete, isActive }) {
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
                        {task.recurrence && (
                            <>
                                <p>{formatNextDue(task.recurrence, task.dueTime)}</p>
                            </>
                        )}
                        <p>User ID: {task.userId}</p>
                    </div>
                    <div className="task-buttons">
                        {onComplete && (
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

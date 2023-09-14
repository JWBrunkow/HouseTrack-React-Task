import React from 'react';

function TaskList({ tasks, onDelete, onComplete, onUpdate, isCompleted }) {
    return (
        <ul className="task-list">
            {tasks.map((task, idx) => (
                <li key={idx}>
                    <div className="task-details">
                        <strong>{task.taskName}</strong>
                        <p>{task.taskDesc}</p>
                        <p>Due at: {new Date(task.dueTime).toLocaleString()}</p>
                    </div>
                    <div className="task-buttons">
                        {!isCompleted && (
                            <button className="complete-button" onClick={() => {
                                const currentTime = new Date().toISOString();
                                const updatedTask = { ...task, completedTime: currentTime };
                                onUpdate(task.taskId, updatedTask);
                                onComplete(idx);
                            }}>✓</button>
                        )}
                        <button className="delete-button" onClick={() => onDelete(idx)}>&#x1F5D1;</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}


export default TaskList;
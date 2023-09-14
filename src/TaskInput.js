import React, { useState } from 'react';

function TaskInput({ onAdd }) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDateTime, setDueDateTime] = useState('');

    const handleSubmit = () => {
        const taskPayload = {
            name: taskName,
            description: taskDescription,
            dueDateTime: dueDateTime,
            completedTime: null,
            userId: 1
        };

        console.log('Submitting:', taskPayload);
        onAdd(taskPayload);
        setTaskName('');
        setTaskDescription('');
        setDueDateTime('');
    };

    return (
        <div className="task-input">
            <input
                type="text"
                placeholder="Task name"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
            />
            <textarea
                placeholder="Task description"
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
            />
            <label>
                Due Date & Time:
                <input
                    type="datetime-local"
                    value={dueDateTime}
                    onChange={e => setDueDateTime(e.target.value)}
                />
            </label>
            <pre>{'\n'}</pre>
            <button onClick={handleSubmit}>Add Task</button>
        </div>
    );
}

export default TaskInput;

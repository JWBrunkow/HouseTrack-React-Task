import React, { useState } from 'react';
import { X } from 'react-bootstrap-icons';
import { CSSTransition } from 'react-transition-group';
import { handleTaskSubmit } from './handlers';

function TaskInput({ onAdd }) {
    const [showInput, setShowInput] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDateTime, setDueDateTime] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringDays, setRecurringDays] = useState(null);

    const handleSubmit = () => {
        const taskData = {
            taskName,
            taskDescription,
            dueDateTime,
            isRecurring,
            recurringDays
        };

        handleTaskSubmit(taskData, onAdd);
        setTaskName('');
        setTaskDescription('');
        setDueDateTime('');
        setIsRecurring(false);
        setRecurringDays(null);
        setShowInput(false);
    };

    return (
        <div className="task-input">
            {!showInput ? (
                <button onClick={() => setShowInput(true)}>Add Task</button>
            ) : (
                <CSSTransition
                    in={showInput}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div>
                        <X className="close-icon" onClick={() => setShowInput(false)} />
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

                        <div>
                            <label>
                                Recurring Task:
                                <input
                                    type="checkbox"
                                    checked={isRecurring}
                                    onChange={e => setIsRecurring(e.target.checked)}
                                />
                            </label>
                            {isRecurring && (
                                <span>
                                    Recurring every &nbsp;
                                    <input
                                        type="number"
                                        min="1"
                                        max="999"
                                        style={{ width: '30px' }}
                                        value={recurringDays === null ? '' : recurringDays}
                                        onChange={e => setRecurringDays(e.target.value)}
                                    />
                                    &nbsp; days after this due date.
                                </span>
                            )}
                        </div>

                        <pre>{'\n'}</pre>
                        <button onClick={handleSubmit}>Add Task</button>
                    </div>
                </CSSTransition>
            )}
        </div>
    );
}

export default TaskInput;

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskList from './TaskList';

test('renders no tasks when tasks array is empty', () => {
    render(<TaskList tasks={[]} onDelete={jest.fn()} isActive={false} />);
    expect(screen.queryByRole('listitem')).toBeNull();
});

test('renders tasks with correct details', () => {
    const testTask = {
        taskId: '1',
        taskName: 'Test Task',
        taskDesc: 'Test Description',
        dueTime: new Date().toISOString(),
        userId: '123',
        recurrence: '5,5'
    };

    render(<TaskList tasks={[testTask]} onDelete={jest.fn()} isActive={true} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/^Due at:/)).toBeInTheDocument();
    expect(screen.getByText(/^Next due on/)).toBeInTheDocument();
    expect(screen.getByText('User ID: 123')).toBeInTheDocument();
});

test('onDelete callback is called with correct index when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    const tasks = [{ taskId: '1', taskName: 'Test Task' }];

    render(<TaskList tasks={tasks} onDelete={onDeleteMock} isActive={false} />);
    fireEvent.click(screen.getByText('🗑️'));
    expect(onDeleteMock).toHaveBeenCalledWith(0);
});

test('onComplete callback is called with correct index when complete button is clicked', () => {
    const onCompleteMock = jest.fn();
    const tasks = [{ taskId: '1', taskName: 'Test Task' }];

    render(<TaskList tasks={tasks} onComplete={onCompleteMock} onDelete={jest.fn()} isActive={false} />);
    fireEvent.click(screen.getByText('✔️'));
    expect(onCompleteMock).toHaveBeenCalledWith(0);
});

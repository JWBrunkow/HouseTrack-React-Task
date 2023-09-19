import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskInput from './TaskInput';

test('renders the Add Task button initially', () => {
    render(<TaskInput onAdd={jest.fn()} />);
    const addButton = screen.getByText('Add Task');
    expect(addButton).toBeInTheDocument();
});


test('clicking the Add Task button reveals the input form', () => {
    render(<TaskInput onAdd={jest.fn()} />);
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);
    const taskNameInput = screen.getByPlaceholderText('Task name');
    expect(taskNameInput).toBeInTheDocument();
});

test('filling out the form and clicking the Add Task button calls the onAdd prop function with correct data', () => {
    const onAddMock = jest.fn();
    render(<TaskInput onAdd={onAddMock} />);
    fireEvent.click(screen.getByText('Add Task'));

    fireEvent.change(screen.getByPlaceholderText('Task name'), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText('Task description'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(onAddMock).toHaveBeenCalledWith({
        taskName: 'Test Task',
        taskDescription: 'Test Description',
        dueDateTime: '',
        isRecurring: false,
        recurringDays: null
    });
});

test('checking the Recurring Task checkbox reveals the input for recurring days', () => {
    render(<TaskInput onAdd={jest.fn()} />);
    fireEvent.click(screen.getByText('Add Task'));

    const recurringCheckbox = screen.getByLabelText('Recurring Task:');
    fireEvent.click(recurringCheckbox);

    const recurringDaysInput = screen.getByLabelText(/Recurring every/);
    expect(recurringDaysInput).toBeInTheDocument();
});

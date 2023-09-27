import {
    loadTasks, loadIncompleteTasks, loadCompletedTasks, loadRecurringTasks,
    handleAddTask, handleUpdateTask, handleDeleteTask, handleTaskCompletion, handleTaskSubmit
} from './handlers';

import * as Api from './Api';
jest.mock('./Api');

describe('loadTasks', () => {
    it('should fetch all tasks', async () => {
        const mockTasks = [{ id: 1, name: 'task1' }, { id: 2, name: 'task2' }];
        Api.getTasks.mockResolvedValueOnce({ data: mockTasks });
        const setTasks = jest.fn();
        await loadTasks(setTasks);
        expect(setTasks).toHaveBeenCalledWith(mockTasks);
    });

    it('should handle errors', async () => {
        Api.getTasks.mockRejectedValueOnce(new Error('API error'));
        const setTasks = jest.fn();
        await loadTasks(setTasks);
        expect(setTasks).not.toHaveBeenCalled();
    });
});


describe('handleAddTask', () => {
    it('should add a task', async () => {
        const task = {
            name: 'task1', description: 'desc1', dueDateTime: '2022-12-12T12:00:00.000Z',
            completedTime: null, userId: 1, recurrence: null
        };
        const mockResponse = { ...task, id: 1 };
        Api.postTask.mockResolvedValueOnce({ data: mockResponse });
        const loadIncompleteTasks = jest.fn();
        await handleAddTask(task, loadIncompleteTasks);
        expect(loadIncompleteTasks).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        const task = {
            name: 'task1', description: 'desc1', dueDateTime: '2022-12-12T12:00:00.000Z',
            completedTime: null, userId: 1, recurrence: null
        };
        Api.postTask.mockRejectedValueOnce(new Error('API error'));
        const loadIncompleteTasks = jest.fn();
        await handleAddTask(task, loadIncompleteTasks);
        expect(loadIncompleteTasks).not.toHaveBeenCalled();
    });
});

describe('handleUpdateTask', () => {
    it('should update a task and execute the callback if provided', async () => {
        const taskId = 1;
        const updatedTask = { id: 1, name: 'updatedTask' };
        const callback = jest.fn();
        Api.updateTask.mockResolvedValueOnce({ data: updatedTask });
        await handleUpdateTask(taskId, updatedTask, callback);
        expect(Api.updateTask).toHaveBeenCalledWith(taskId, updatedTask);
        expect(callback).toHaveBeenCalled();
    });

    it('should handle errors and not execute the callback', async () => {
        const taskId = 1;
        const updatedTask = { id: 1, name: 'updatedTask' };
        const callback = jest.fn();
        Api.updateTask.mockRejectedValueOnce(new Error('API error'));
        await handleUpdateTask(taskId, updatedTask, callback);
        expect(callback).not.toHaveBeenCalled();
    });
});

describe('handleDeleteTask', () => {
    const tasks = [{ taskId: 1 }, { taskId: 2 }];
    const completedTasks = [{ taskId: 3 }, { taskId: 4 }];

    it('should delete a task from active tasks', async () => {
        const indexToDelete = 0;
        Api.deleteTask.mockResolvedValueOnce();
        const setTasks = jest.fn();
        await handleDeleteTask(indexToDelete, tasks, completedTasks, setTasks, jest.fn());
        expect(Api.deleteTask).toHaveBeenCalledWith(tasks[indexToDelete].taskId);
        expect(setTasks).toHaveBeenCalledWith([{ taskId: 2 }]);
    });

    it('should delete a task from completed tasks', async () => {
        const indexToDelete = 1;
        Api.deleteTask.mockResolvedValueOnce();
        const setCompletedTasks = jest.fn();
        await handleDeleteTask(indexToDelete, tasks, completedTasks, jest.fn(), setCompletedTasks, true);
        expect(Api.deleteTask).toHaveBeenCalledWith(completedTasks[indexToDelete].taskId);
        expect(setCompletedTasks).toHaveBeenCalledWith([{ taskId: 3 }]);
    });
});

describe('handleTaskCompletion', () => {
    const tasks = [{ taskId: 1, name: 'task1' }, { taskId: 2, name: 'task2' }];

    it('should complete a task and update lists', async () => {
        const indexToComplete = 0;
        const setTasks = jest.fn();
        const setCompletedTasks = jest.fn();
        await handleTaskCompletion(indexToComplete, tasks, setTasks, handleUpdateTask, setCompletedTasks);
        expect(setTasks).toHaveBeenCalledWith([{ taskId: 2, name: 'task2' }]);
        expect(Api.updateTask).toHaveBeenCalled();
        expect(setCompletedTasks).toHaveBeenCalledWith(expect.any(Array));
    });
});

describe('handleTaskSubmit', () => {
    it('should submit a task', () => {
        const taskData = {
            taskName: 'test',
            taskDescription: 'description',
            dueDateTime: '2023-09-19T12:00:00.000Z',
            isRecurring: true,
            recurringDays: '2,2'
        };
        const onAdd = jest.fn();
        handleTaskSubmit(taskData, onAdd);
        expect(onAdd).toHaveBeenCalledWith({
            name: taskData.taskName,
            description: taskData.taskDescription,
            dueDateTime: taskData.dueDateTime,
            completedTime: null,
            userId: 1,
            recurrence: taskData.recurringDays
        });
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

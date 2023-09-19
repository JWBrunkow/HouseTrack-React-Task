import axios from 'axios';
import {
    postTask, getTasks, getIncompleteTasks, getCompleteTasks, getRecurringTasks, updateTask, deleteTask
} from './Api';

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});
describe('postTask', () => {
    it('should post a task successfully', async () => {
        const payload = { task: 'test' };

        axios.post.mockResolvedValueOnce({ data: payload });

        const response = await postTask(payload);

        expect(response.data).toEqual(payload);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/v1/task', payload);
    });

    it('should handle post errors', async () => {
        const payload = { task: 'test' };
        const error = new Error('API error');

        axios.post.mockRejectedValueOnce(error);

        await expect(postTask(payload)).rejects.toThrow(error);
    });
});
describe('getTasks', () => {
    it('should fetch all tasks', async () => {
        const tasks = [{ id: 1 }, { id: 2 }];

        axios.get.mockResolvedValueOnce({ data: tasks });

        const response = await getTasks();

        expect(response.data).toEqual(tasks);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/task');
    });

    it('should handle getTasks errors', async () => {
        const error = new Error('API error');

        axios.get.mockRejectedValueOnce(error);

        await expect(getTasks()).rejects.toThrow(error);
    });
});
describe('updateTask', () => {
    it('should update a task successfully', async () => {
        const taskId = 1;
        const updatedTask = { id: 1, name: 'updatedTask' };

        axios.put.mockResolvedValueOnce({ data: updatedTask });

        const response = await updateTask(taskId, updatedTask);

        expect(response.data).toEqual(updatedTask);
        expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/v1/task/1', updatedTask);
    });

    it('should handle update errors', async () => {
        const taskId = 1;
        const updatedTask = { id: 1, name: 'updatedTask' };
        const error = new Error('API error');

        axios.put.mockRejectedValueOnce(error);

        await expect(updateTask(taskId, updatedTask)).rejects.toThrow(error);
    });
});
describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
        const taskId = 1;
        const deleteResponse = { success: true };

        axios.delete.mockResolvedValueOnce({ data: deleteResponse });

        const response = await deleteTask(taskId);

        expect(response).toEqual(deleteResponse);
        expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/v1/task/1');
    });

    it('should handle delete errors', async () => {
        const taskId = 1;
        const error = new Error('API error');

        axios.delete.mockRejectedValueOnce(error);

        await expect(deleteTask(taskId)).rejects.toThrow(error);
    });
});

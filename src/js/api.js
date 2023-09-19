import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/task';

export const postTask = async (payload) => {
    try {
        return await axios.post(baseURL, payload);
    } catch (error) {
        console.error('Error posting task:', error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        return await axios.get(baseURL);
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
};

export const getIncompleteTasks = async () => {
    try {
        return await axios.get(`${baseURL}/incomplete`);
    } catch (error) {
        console.error('Error getting incomplete tasks:', error);
        throw error;
    }
};

export const getCompleteTasks = async () => {
    try {
        return await axios.get(`${baseURL}/completed`);
    } catch (error) {
        console.error('Error getting completed tasks:', error);
        throw error;
    }
};

export const getRecurringTasks = async () => {
    try {
        return await axios.get(`${baseURL}/recurring`);
    } catch (error) {
        console.error('Error getting recurring tasks:', error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        return await axios.put(`${baseURL}/${taskId}`, updatedTask);
    } catch (error) {
        console.error(`Error updating task with ID ${taskId}:`, error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${baseURL}/${taskId}`);
        console.log('Delete response:', response);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/task';

export const postTask = (payload) => {
    return axios.post(baseURL, payload);
};
export const updateTask = (taskId, updatedTask) => {
    return axios.put(`${baseURL}/${taskId}`, updatedTask);
};
export const getIncompleteTasks = () => {
    return axios.get(`${baseURL}/incomplete`);
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
}

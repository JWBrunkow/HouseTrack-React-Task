import { getIncompleteTasks, postTask, updateTask, deleteTask } from './api';

export const loadIncompleteTasks = (setTasks) => {
    getIncompleteTasks()
        .then(response => {
            setTasks(response.data.map(task => JSON.stringify(task)));
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}

export const handleAddTask = (task, loadIncompleteTasks) => {
    const payload = {
        taskName: task.name,
        taskDesc: task.description,
        dueTime: task.dueDateTime,
        completedTime: task.completedTime,
        userId: 1,
        taskId: null,
        recurrence: task.recurrence
    };

    postTask(payload)
        .then(response => {
            console.log('Task added successfully:', response.data);
            loadIncompleteTasks();
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
};

export const handleUpdateTask = (taskId, updatedTask) => {
    updateTask(taskId, updatedTask)
        .then(response => {
            console.log('Task updated successfully:', response.data);
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
};

export const handleDeleteTask = (indexToDelete, tasks, completedTasks, setTasks, setCompletedTasks, isCompletedTask = false) => {
    const taskList = isCompletedTask ? completedTasks : tasks;
    const taskIdToDelete = JSON.parse(taskList[indexToDelete]).taskId;

    deleteTask(taskIdToDelete)
        .then(() => {
            console.log('Task deleted successfully.');
            if (isCompletedTask) {
                setCompletedTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToDelete));
            } else {
                setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToDelete));
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
};

export const handleTaskCompletion = (indexToComplete, tasks, setTasks, handleUpdateTask, setCompletedTasks) => {
    let taskToComplete = JSON.parse(tasks[indexToComplete]);
    taskToComplete.completedTime = new Date().toISOString();
    handleUpdateTask(taskToComplete.taskId, taskToComplete);
    setTasks(prevTasks => prevTasks.filter((_, idx) => idx !== indexToComplete));
    setCompletedTasks(prevCompleted => [...prevCompleted, JSON.stringify(taskToComplete)]);
};

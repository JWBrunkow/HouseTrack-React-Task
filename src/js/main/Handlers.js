import {
    getTasks, getIncompleteTasks, getCompleteTasks, getRecurringTasks, postTask, updateTask, deleteTask, fetchUserDetails
} from './Api';

export const loadTasks = (setTasks) => {
    getTasks()
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error('Error fetching all tasks:', error);
        });
}

export const loadIncompleteTasks = (setTasks) => {
    getIncompleteTasks()
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error('Error fetching incomplete tasks:', error);
        });
}

export const loadCompletedTasks = (setCompletedTasks) => {
    getCompleteTasks()
        .then(response => {
            setCompletedTasks(response.data);
        })
        .catch(error => {
            console.error('Error fetching completed tasks:', error);
        });
}

export const loadRecurringTasks = (setRecurringTasks) => {
    getRecurringTasks()
        .then(response => {
            setRecurringTasks(response.data);
        })
        .catch(error => {
            console.error('Error fetching recurring tasks:', error);
        });
}


export const handleAddTask = (task, userId) => {
    const payload = {
        taskName: task.name,
        taskDesc: task.description,
        dueTime: task.dueDateTime,
        completedTime: task.completedTime,
        userId: userId,
        taskId: null,
        recurrence: task.recurrence
    };

    return postTask(payload)
        .then(response => {
            console.log('Task added successfully:', response.data);
            loadIncompleteTasks();
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
};

export const handleUpdateTask = (taskId, updatedTask, callback) => {
    updateTask(taskId, updatedTask)
        .then(response => {
            console.log('Task updated successfully:', response.data);
            if (callback) { callback(); }
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
};


export const handleDeleteTask = (indexToDelete, tasks, completedTasks, setTasks, setCompletedTasks, isCompletedTask = false) => {
    const taskList = isCompletedTask ? completedTasks : tasks;
    const taskIdToDelete = taskList[indexToDelete].taskId;

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
    let taskToComplete = tasks[indexToComplete];
    taskToComplete.completedTime = new Date().toISOString();
    handleUpdateTask(taskToComplete.taskId, taskToComplete);
    setTasks(prevTasks => prevTasks.filter((_, idx) => idx !== indexToComplete));
    setCompletedTasks(prevCompleted => [...prevCompleted, JSON.stringify(taskToComplete)]);
};

export const handleTaskSubmit = (taskData, userId, onAdd) => {
    let recurrenceString = null;
    if (taskData.isRecurring && taskData.recurringDays) {
        recurrenceString = `${taskData.recurringDays},${taskData.recurringDays}`;
    }

    const taskPayload = {
        name: taskData.taskName,
        description: taskData.taskDescription,
        dueDateTime: taskData.dueDateTime,
        completedTime: null,
        userId: userId,
        recurrence: recurrenceString
    };

    console.log('Submitting:', taskPayload);
    onAdd(taskPayload);
};
export const fetchUserInfo = async (userId) => {
    try {
        const data = await fetchUserDetails(userId);
        return data;
    } catch (error) {
        console.error('Error in fetching user information:', error);
        return null;
    }
};

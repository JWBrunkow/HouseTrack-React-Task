import './App.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';
import {
  handleAddTask, handleDeleteTask, handleUpdateTask, loadCompletedTasks, loadIncompleteTasks, loadRecurringTasks,
} from './handlers';

import { ChevronDoubleRight, ChevronDoubleDown } from 'react-bootstrap-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [showActiveTasks, setShowActiveTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [showRecurringTasks, setShowRecurringTasks] = useState(true);

  useEffect(() => {
    loadIncompleteTasks(setTasks);
    loadCompletedTasks(setCompletedTasks);
    loadRecurringTasks(setRecurringTasks);
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let shouldReload = false;
    recurringTasks.forEach(task => {
      const taskDueDate = new Date(task.dueTime);
      taskDueDate.setHours(0, 0, 0, 0);
      if (taskDueDate.getTime() === today.getTime()) {
        shouldReload = true;
        const updatedTask = { ...task, completedTime: null };
        const daysToAdd = parseInt(task.recurrence.split(',')[0]);
        const newDueTime = new Date(task.dueTime);
        newDueTime.setDate(newDueTime.getDate() + daysToAdd);
        updatedTask.dueTime = newDueTime.toISOString();
        handleUpdateTask(task.taskId, updatedTask);
      }
    });

    if (shouldReload) {
      loadIncompleteTasks(setTasks);
      loadCompletedTasks(setCompletedTasks);
      loadRecurringTasks(setRecurringTasks);
    }
  }, [recurringTasks]);

  return (
    <div className="App">
      <h1>HouseTrack</h1>
      <TaskInput onAdd={(task) => handleAddTask(task, () => {
        loadIncompleteTasks(setTasks);
        loadCompletedTasks(setCompletedTasks);
        loadRecurringTasks(setRecurringTasks);
      })} />

      <h2>Active Tasks
        <span
          className="icon-right"
          onClick={() => setShowActiveTasks(!showActiveTasks)}
        >
          {showActiveTasks ? <ChevronDoubleDown /> : <ChevronDoubleRight />}
        </span>
      </h2>
      {showActiveTasks && (
        <TaskList
          tasks={tasks}
          onDelete={(idx) => handleDeleteTask(idx, tasks, completedTasks, setTasks, setCompletedTasks)}
          onComplete={(idx) => {
            const updatedTask = { ...tasks[idx], completedTime: new Date().toISOString() };
            handleUpdateTask(tasks[idx].taskId, updatedTask, () => {
              loadIncompleteTasks(setTasks);
              loadCompletedTasks(setCompletedTasks);
              loadRecurringTasks(setRecurringTasks);
            });
          }}
          onUpdate={handleUpdateTask}
          isActive={true}
        />
      )}

      <h2>Completed Tasks
        <span
          className="icon-right"
          onClick={() => setShowCompletedTasks(!showCompletedTasks)}
        >
          {showCompletedTasks ? <ChevronDoubleDown /> : <ChevronDoubleRight />}
        </span>
      </h2>
      {showCompletedTasks && (
        <TaskList
          tasks={completedTasks}
          onDelete={(idx) => handleDeleteTask(idx, tasks, completedTasks, setTasks, setCompletedTasks, true)}
          isActive={false}
        />
      )}

      <h2>Recurring Tasks
        <span
          className="icon-right"
          onClick={() => setShowRecurringTasks(!showRecurringTasks)}
        >
          {showRecurringTasks ? <ChevronDoubleDown /> : <ChevronDoubleRight />}
        </span>
      </h2>
      {showRecurringTasks && (
        <TaskList
          tasks={recurringTasks}
          onDelete={(idx) => handleDeleteTask(idx, recurringTasks, setRecurringTasks)}
          onUpdate={(taskId, updatedTask) => handleUpdateTask(taskId, updatedTask, () => {
            loadIncompleteTasks(setTasks);
            loadCompletedTasks(setCompletedTasks);
            loadRecurringTasks(setRecurringTasks);
          })}
          isActive={false}
        />
      )}
    </div>
  );
}

export default App;

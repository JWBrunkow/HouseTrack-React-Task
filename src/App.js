import './App.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';
import {
  loadIncompleteTasks,
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
  handleTaskCompletion
} from './handlers';
import { ChevronDoubleRight, ChevronDoubleDown } from 'react-bootstrap-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showActiveTasks, setShowActiveTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  useEffect(() => {
    loadIncompleteTasks(setTasks);
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskInput onAdd={(task) => handleAddTask(task, () => loadIncompleteTasks(setTasks))} />

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
          tasks={tasks.map(task => JSON.parse(task))}
          onDelete={(idx) => handleDeleteTask(idx, tasks, completedTasks, setTasks, setCompletedTasks)}
          onComplete={(idx) => handleTaskCompletion(idx, tasks, setTasks, handleUpdateTask, setCompletedTasks)}
          onUpdate={handleUpdateTask}
          isCompleted={false}
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
          tasks={completedTasks.map(task => JSON.parse(task))}
          onDelete={(idx) => handleDeleteTask(idx, tasks, completedTasks, setTasks, setCompletedTasks, true)}
          isCompleted={true}
        />
      )}
    </div>
  );
}

export default App;

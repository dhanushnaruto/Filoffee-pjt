import React, { useState } from 'react';
import { useTaskContext } from '../App';

const TaskForm = () => {
  const { addTask } = useTaskContext();
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    status: 'Pending',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return alert('Title is required');
    addTask({ ...task, id: Date.now() });
    setTask({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: '',
      status: 'Pending',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-teal-400 via-green-300 to-cyan-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 p-4 rounded shadow-md my-4"
      data-aos="fade-up"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white animate-pulse">
        Add Task
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border p-2 rounded w-full mt-4 dark:bg-gray-700 dark:text-white"
      ></textarea>
      <button
        type="submit"
        className="mt-4 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 dark:bg-gray-700 dark:hover:bg-gray-600 animate-bounce"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

import React, { useState } from 'react';
import { useTaskContext } from '../App';

const TaskList = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [filterDate, setFilterDate] = useState('');

  const filteredTasks = filterDate
    ? tasks.filter((task) => task.dueDate === filterDate)
    : tasks;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Task List
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label
          htmlFor="filterDate"
          className="text-gray-700 dark:text-gray-300 font-medium"
        >
          Filter by Due Date:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={() => setFilterDate('')} 
          className="bg-teal-500 text-white py-1 px-4 rounded hover:bg-teal-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Clear Filter
        </button>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <div
            key={task.id}
            className="flex flex-col gap-2 border p-4 rounded bg-gray-50 dark:bg-gray-700 shadow-md"
            data-aos="flip-left"
          >          
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {task.title}
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-300">
                  {task.dueDate}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Priority: {task.priority}</span>
                <span>Status: {task.status}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => updateTask({ ...task, status: 'Completed' })}
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 text-center">
          No tasks found.
        </p>
      )}
    </div>
  );
};

export default TaskList;

import React, { useState, useEffect, useContext, createContext } from 'react';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import { FiSun, FiMoon } from 'react-icons/fi';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const TaskContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,    
      mirror: true,   
    });
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      <div
        className={`min-h-screen p-4 bg-gradient-to-r ${
          isDarkMode
            ? 'from-gray-800 via-gray-900 to-black'
            : 'from-teal-300 via-green-200 to-cyan-200'
        }`}
      >
        <header
          className="flex justify-between items-center mb-4"
          data-aos="fade-down"
        >
          <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-300 animate-bounce">
            TaskMate
          </h1>
          <button
            onClick={toggleTheme}
            className="text-2xl bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            data-aos="zoom-in"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </header>
        <TaskForm />
        <TaskList />
      </div>
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

export default App;

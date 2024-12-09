import { getTasksUtils, saveTasksUtils } from "../utils/utils";

// Fetch tasks (simulate API call)
const getTasks = () => {
    return getTasksUtils();;
};

// Add task (simulate saving task)
const addTask = (task) => {
    const tasks = getTasks();
    tasks.push({ ...task });
    saveTasksUtils(tasks);
};

// Edit task
const editTask = (updatedTask) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    saveTasksUtils(updatedTasks);
};

// Delete task
const deleteTask = (taskId) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasksUtils(updatedTasks);
};

export { getTasks, addTask, editTask, deleteTask };

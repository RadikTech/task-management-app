import React, { useEffect, useState } from 'react'
import { addTask, deleteTask, editTask, getTasks } from '../data/tasks';
import TaskModal from '../components/TaskModal';
import { toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';
import { getUser } from '../utils/utils';
import { logout } from '../utils/loginUtils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = getUser();
    const navigation = useNavigate();

    const [isUpdate, setUpdate] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const [sortOption, setSortOption] = useState("priority"); // Default sort
    const [filterStatus, setFilterStatus] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
    var fetchedTasks = getTasks();
    var filteredTasks = [];
    var userTasks = [];

    useEffect(() => {
        fetchedTasks = getTasks();
    }, [isUpdate]);

    const createTask = (newTask) => {
        addTask(newTask);
        toast.success(`Task "${newTask.title}" created successfully!`);
        setUpdate(true);
    };

    // Update an existing task
    const updateTask = (updatedTask) => {
        editTask(updatedTask);
        toast.success(`Task "${updatedTask.title}" updated successfully!`);
        setEditMode(false);
        setTaskToEdit(null);
        setUpdate(true);
    };

    // Delete a task
    const deleteT = (taskId) => {
        deleteTask(taskId);
        toast.error("Task deleted!");
        setUpdate(true);
    };

    useEffect(() => {
        console.log(user);
    }, [])

    userTasks = user != null
        ? fetchedTasks
        : fetchedTasks.filter((task) => task.assignedTo === user.id);

    const sortedTasks = [...userTasks].sort((a, b) => {
        if (sortOption === "priority") {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortOption === "dueDate") {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortOption === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    filteredTasks =
        filterStatus === "all"
            ? sortedTasks
            : sortedTasks.filter((task) => task.status === filterStatus);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(currentTasks.length / tasksPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className='flex flex-col mb-6 md:flex-row'>
                {user && (user.role === "admin" || user.id === userTasks[0]?.assignedTo) && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="text-sm p-2 bg-blue-500 text-white rounded">
                        Create New Task
                    </button>
                )}

                <h1 className="flex-1 text-xl font-bold text-center">Task Management</h1>
                
                <button
                    onClick={() => {
                        logout();
                        navigation("/login");

                    }}
                    className="px-5 bg-red-500 text-white rounded text-center cursor-pointer"
                >
                    Logout
                </button>
            </div>

            <div className="flex justify-between mb-4">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg flex-1 mx-2"
                >
                    <option value="priority">Sort by Priority</option>
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="category">Sort by Category</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg flex-1 mx-2"
                >
                    <option value="all">All Tasks</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-4 bg-white rounded-lg shadow-md border-l-4"
                        style={{
                            borderColor:
                                task.priority === "High"
                                    ? "red"
                                    : task.priority === "Medium"
                                        ? "orange"
                                        : "green",
                        }}
                    >
                        <h2 className="text-xl font-bold">{task.title}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                        <p
                            className={`text-sm ${task.status === "Completed" ? "text-green-500" : "text-yellow-500"
                                }`}
                        >
                            Status: {task.status}
                        </p>
                        <button
                            className="mt-2 text-sm text-blue-500 hover:underline"
                            onClick={() => setSelectedTask(task)}
                        >
                            View Details
                        </button>

                        {user && (user.id === task.assignedTo || user.role === "admin") && (
                            <div className="mt-2">
                                <button
                                    className="text-sm text-yellow-500 hover:underline"
                                    onClick={() => {
                                        setTaskToEdit(task);
                                        setEditMode(true);
                                    }}>
                                    Edit
                                </button>
                                <button
                                    className="text-sm text-red-500 hover:underline ml-2"
                                    onClick={() => deleteT(task.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />

            {editMode && (
                <TaskForm
                    task={taskToEdit}
                    onSave={(task) => {
                        taskToEdit ? updateTask(task) : createTask(task);
                        setEditMode(false);
                    }
                    }
                    onCancel={() => {
                        setEditMode(false);
                        setTaskToEdit(null);
                    }}
                />
            )}

            <div className="flex justify-center items-center mt-6">
                <button
                    onClick={prevPage}
                    className="min-w-[100px] p-2 bg-blue-500 text-white rounded mx-2 cursor-pointer"
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    className="min-w-[100px] p-2 bg-blue-500 text-white rounded mx-2 cursor-pointer"
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Dashboard
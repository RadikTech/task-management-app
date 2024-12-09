import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../utils/utils";

const TaskForm = ({ task, onSave, onCancel }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [status, setStatus] = useState("In Progress");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("Work");
    const user = getUser();

    useEffect(()=>{
        console.log(user);
    },[])

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setStatus(task.status);
            setDueDate(task.dueDate);
            setCategory(task.category);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: task ? task.id : Date.now(),
            title,
            description,
            priority,
            status,
            dueDate,
            category,
            assignedTo: user.id, // This should be dynamically assigned based on the logged-in user
        };
        onSave(newTask);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
                <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Create Task"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="mb-4 flex space-x-2">
                        <select
                            className="p-2 border border-gray-300 rounded"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <select
                            className="p-2 border border-gray-300 rounded"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <input
                        type="date"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;

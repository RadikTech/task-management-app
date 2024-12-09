import React from "react";

function TaskModal({ task, onClose }) {
    if (!task) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`p-6 rounded-lg shadow-lg w-96 
            ${task.priority === "High" ? `bg-red-100` :
                    task.priority === "Medium" ? `bg-orange-100` : `bg-green-100`}
                `}>

                <h2 className="text-3xl font-bold text-center">{task.title}</h2>

                <p className="text-xl">{task.description}</p>

                <p className="text-sm text-gray-500 mt-4">Priority:
                    <span className={`ml-2 `}>
                        {task.priority}
                    </span>
                </p>

                <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-500 text-end">Status: {task.status}</p>
                <button
                    onClick={onClose}
                    className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default TaskModal;

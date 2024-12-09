import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routers from "./Routes/Router.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import { getTasksUtils, saveTasksUtils } from "./utils/utils.js";

function App() {
  let predefinedTasks = [
    {
      id: 1, 
      title: "Complete quarterly financial report", 
      description: "Finish compiling the data for the financial report", 
      priority: "High",
      status: "In Progress",
      assignedTo: 1,
      dueDate: "2024-12-01", 
      category: "Work"
    },
    {
      id: 2, 
      title: "Grocery shopping for the week", 
      description: "Buy groceries for meals for the week", 
      priority: "Medium",
      status: "Completed", 
      assignedTo: 2, 
      dueDate: "2024-12-02", 
      category: "Personal"
    },
    {
      id: 3,
      title: "Prepare presentation for team meeting",
      description: "Create slides and practice the presentation", 
      priority: "High",
      status: "In Progress", 
      assignedTo: 1, 
      dueDate: "2024-12-05", 
      category: "Work" 
    },
  ];


  useEffect(() => {
    const existingTasks = getTasksUtils();

    const mergedTasks = [...existingTasks];
    predefinedTasks.forEach((preTask) => {
      const exists = existingTasks.some((task) => task.id === preTask.id);
      if (!exists) {
        mergedTasks.push(preTask);
      }
    });

    saveTasksUtils(mergedTasks);
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routers />
      </div>
    </BrowserRouter>
  );
}

export default App;

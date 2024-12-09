import React from 'react'
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { AuthProvider } from '../context/AuthContext';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" exact={true} element={
                <AuthProvider>
                    <Dashboard />
                </AuthProvider>
            } />
            <Route path="*" exact={true} element={
                <AuthProvider>
                    <Dashboard />
                </AuthProvider>
            } />

            <Route path="/login" exact={true} element={<LoginPage />} />
            <Route path="/register" exact={true} element={<RegisterPage />} />
            <Route path="/dashboard" exact={true} element={
                <AuthProvider>
                    <Dashboard />
                </AuthProvider>
            } />
        </Routes>
    )
}

export default Routers

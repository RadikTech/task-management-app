import React, { useState } from 'react'
import NavigationLoginReg from '../components/NavigationLoginReg';
import {addUser} from "../data/users";

const RegisterPage = () => {
    const [name, setName] = useState("test");
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123");
    const [role, setRole] = useState("admin"); // Added state for role

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration logic
        const newUser = {
            id: 2,
            name,
            role,
            email,
            password
        };
        addUser(newUser);
        console.log("Registration attempt:", { name, email, password });
    };

    return (
        <div className="flex items-center justify-center h-screen m-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Select Role</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="admin"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={() => setRole("admin")}
                                className="mr-2"
                            />
                            <label htmlFor="admin" className="mr-4">Admin</label>

                            <input
                                type="radio"
                                id="user"
                                name="role"
                                value="user"
                                checked={role === "user"}
                                onChange={() => setRole("user")}
                                className="mr-2"
                            />
                            <label htmlFor="user">User</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Register
                    </button>
                </form>

                <NavigationLoginReg isLoginPage={false} className="mt-4 items-center text-center" />

            </div>
        </div>
    );
}

export default RegisterPage
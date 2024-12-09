import React, { useState } from "react";
import NavigationLoginReg from "../components/NavigationLoginReg";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/loginUtils";

const LoginPage = () => {
    const [email, setEmail] = useState("user@gmail.com");
    const [password, setPassword] = useState("123");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic
        var isLoginSuccess = login(email, password);
        if (isLoginSuccess) {
            navigate("/dashboard")
        }
    };

    return (
        <div className="flex items-center justify-center h-screen m-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    
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
                    
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Login
                    </button>
                </form>

                <NavigationLoginReg isLoginPage={true} className="mt-4 items-center text-center" />
            </div>
        </div>
    );
}

export default LoginPage;

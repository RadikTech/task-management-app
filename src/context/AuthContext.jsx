import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigation = useNavigate();

    useEffect(() => {
        var token = localStorage.getItem("token");
        if (token) {
            try {
                token = JSON.parse(token);
                // setUser(decodedUser);
            } catch (error) {
                navigation("/login")
                console.error("Invalid token", error);
            }
        } else {
            navigation("/login");
        }
    }, []);

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

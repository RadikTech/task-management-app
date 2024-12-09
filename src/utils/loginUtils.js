import { getUsersUtils } from "./utils";

export const login = (email, password) => {
    var users = getUsersUtils();
    var loggedInUser = users?.find((u) => u.email === email && u.password === password);
    if (loggedInUser) {
        loggedInUser = JSON.stringify(loggedInUser);
        localStorage.setItem("token", loggedInUser);
        // setUser(loggedInUser);
        return true;
    } else {
        alert("Invalid Credential");
    }
    return false;
};

export const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
};
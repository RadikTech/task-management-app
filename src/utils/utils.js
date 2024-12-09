const TASKS_KEY = "tasks";
const USER_KEY = "users";

// Retrieve tasks from localStorage
export const getTasksUtils = () => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to localStorage
export const saveTasksUtils = (tasks) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getUsersUtils = () => {
    const users = localStorage.getItem(USER_KEY);
    return users ? JSON.parse(users) : [];
}

// Save tasks to localStorage
export const saveUsersUtils = (users) => {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const getUser = () => {
    var token = localStorage.getItem("token");
    if (token) {
        try {
            token = JSON.parse(token);
            return token;
        } catch (error) {
        }
    }

    return {};
}
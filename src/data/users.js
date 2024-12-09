import { getUsersUtils, saveUsersUtils } from "../utils/utils";

export const addUser = (user) => {
    const users = getUsersUtils();
    users.push({ ...user });
    saveUsersUtils(users);
};

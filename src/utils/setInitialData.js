import { EXECUTIVE, MANAGER } from "./roles";

const setInitialData = () => {
  const usersData = localStorage.getItem("users");
  if (!usersData) {
    const users = [
      {
        username: "test-admin",
        password: "test-admin",
        role: MANAGER,
      },
      {
        username: "test-sales",
        password: "test-sales",
        role: EXECUTIVE,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
};

const setLocalStorageData = (path, data) => {
  localStorage.setItem(path, JSON.stringify(data));
};

const getLocalStorageData = (path) => {
  const data = localStorage.getItem(path);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const setLoggedIn = (data) => {
  localStorage.setItem("loginData", JSON.stringify(data));
  localStorage.setItem("loggedInRole", JSON.stringify(data.role));
};

const setLogout = () => {
  const keysToClear = ["loginData", "loggedInRole"];
  keysToClear.forEach((key) => {
    localStorage.removeItem(key);
  });
};

const generateId = (data = []) => {
  return data.length === 0 ? 1 : Math.max(...data.map((d) => d.id)) + 1;
};

export {
  setInitialData,
  getLocalStorageData,
  setLoggedIn,
  setLogout,
  setLocalStorageData,
  generateId,
};

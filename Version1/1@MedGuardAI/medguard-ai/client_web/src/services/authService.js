// src/services/authService.js
import API from "./api";

export const loginUser = async (data) => {
  const res = await API.post("/api/auth/login/", data);
  return res.data.data; 
};

export const registerUser = async (data) => {
  const res = await API.post("/api/auth/register/", data);
  return res.data; 
};

export const logoutUser = async () => {
  const refresh = localStorage.getItem("refresh_token");
  return API.post("/api/auth/logout/", { refresh });
};
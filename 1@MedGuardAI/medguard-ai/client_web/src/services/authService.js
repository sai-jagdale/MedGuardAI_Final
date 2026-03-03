// src/services/authService.js
import api from "./api";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/api/auth/login/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await api.post("/api/auth/register/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refresh) => {
  try {
    const response = await api.post("/api/auth/refresh/", {
      refresh: refresh,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
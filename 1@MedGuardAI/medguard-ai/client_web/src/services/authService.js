import API from "./api";

// Login
export const loginUser = (data) => {
  return API.post("/api/auth/login/", data);
};

// Register
export const registerUser = (data) => {
  return API.post("/api/auth/register/", data);
};
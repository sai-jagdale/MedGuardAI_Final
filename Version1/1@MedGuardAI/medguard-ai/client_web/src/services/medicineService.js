import API from "./api";

export const verifyMedicine = (data) => {
  return API.post("/api/medicine/verify/", data);
};
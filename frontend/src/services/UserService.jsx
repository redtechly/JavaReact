import axios from "axios";
import { REST_API_BASE_URL } from "../App";

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${REST_API_BASE_URL}/user/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${REST_API_BASE_URL}/user/${id}`);
  return response.data;
};
export const listUsers = async () => {
  const response = await axios.get(`${REST_API_BASE_URL}/user`);
  return response.data;
};
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${REST_API_BASE_URL}/user/${id}`);
    toast.success("User deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Cannot delete User please try again later");
  }
};

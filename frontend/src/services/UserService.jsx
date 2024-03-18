import axios from "axios";
import { REST_API_BASE_URL } from "../App";
import { toast } from "react-toastify";

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

export const updateUser = async (id, name, email, password, address, age, token) => {
  try {
    const response = await axios.put(
      `${REST_API_BASE_URL}/user/${id}`,
      {
        name,
        email,
        password,
        address,
        age
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to update user details. Please try again later.");
    throw error;
  }
};


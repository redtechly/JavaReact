import axios from "axios";
import { toast } from "react-toastify";
import { REST_API_BASE_URL } from "../App";

export const listFoods = async () => {
  const response = await axios.get(`${REST_API_BASE_URL}/food`);
  return response.data;
};

export const getFood = async (id) => {
  const response = await axios.get(`${REST_API_BASE_URL}/food/${id}`);
  return response.data;
};

export const deleteFood = async (id) => {
  try {
    const response = await axios.delete(`${REST_API_BASE_URL}/food/${id}`);
    toast.success("Food deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Cannot delete food, it is being used by an order");
  }
};

export const createFood = async (food) => {
  const response = await axios.post(`${REST_API_BASE_URL}/food`, food);
  return response.data;
};

export const updateFood = async (id, food) => {
  const response = await axios.put(`${REST_API_BASE_URL}/food/${id}`, food);
  return response.data;
};

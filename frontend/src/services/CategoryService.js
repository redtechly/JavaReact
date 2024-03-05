import axios from "axios";
import { toast } from "react-toastify";

import { REST_API_BASE_URL } from "../App";

export const listCategories = async () => {
  const response = await axios.get(`${REST_API_BASE_URL}/category`);
  return response.data;
};
export const updateCategory = async (id, category) => {
  const response = await axios.put(
    `${REST_API_BASE_URL}/category/${id}`,
    category
  );
  return response.data;
};
export const getCategory = async (id) => {
  const response = await axios.get(`${REST_API_BASE_URL}/category/${id}`);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(`${REST_API_BASE_URL}/category`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${REST_API_BASE_URL}/category/${id}`);
    toast.success("Category deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Cannot delete category, it is being used by a product");
  }
};

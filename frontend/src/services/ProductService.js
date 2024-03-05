import axios from "axios";
import { toast } from "react-toastify";
import { REST_API_BASE_URL } from "../App";

export const listProducts = async () => {
  const response = await axios.get(`${REST_API_BASE_URL}/product`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${REST_API_BASE_URL}/product/${id}`);
  return response.data;
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${REST_API_BASE_URL}/product/${id}`);
    toast.success("Product deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Cannot delete product, it is being used by an order");
  }
};

export const createProduct = async (product) => {
  const response = await axios.post(`${REST_API_BASE_URL}/product`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(
    `${REST_API_BASE_URL}/product/${id}`,
    product
  );
  return response.data;
};

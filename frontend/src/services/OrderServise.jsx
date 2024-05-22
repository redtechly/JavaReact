import axios from "axios";
import { REST_API_BASE_URL } from "../App";
import { toast } from "react-toastify";

export const createOrder = async (
  useremail,
  products,
  address,
  totalAmount,
  ctxDispatch
) => {
  try {
    const response = await axios.post(
      `${REST_API_BASE_URL}/order/createorder`,
      { useremail, products, address, totalAmount }
    );
    toast.success("Order placed successfully");
    ctxDispatch({ type: "CART_CLEAR" });
    return response.data;
  } catch (error) {
    toast.error("Failed to place order. Please try again later.");
    throw error;
  }
};

export const listOrdersByUser = async (userEmail) => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/order/byUser/${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const listAllOrders = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/order/all`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.post(
      `${REST_API_BASE_URL}/order/updatestatus/${orderId}/${status}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};

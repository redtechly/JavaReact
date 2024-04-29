import axios from "axios";
import { REST_API_BASE_URL } from "../App";
import { toast } from "react-toastify";


export const createOrder = async ( useremail , products, address, totalAmount) => {
    try {
      const response = await axios.post(
        `${REST_API_BASE_URL}/order/createorder`,
        { useremail, products, address, totalAmount } // Include address and totalAmount
      );
      toast.success("Order placed successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to place order. Please try again later.");
      throw error;
    }
  };
  

// export const getOrder = async (orderId) => {
//   const response = await axios.get(`${REST_API_BASE_URL}/order/${orderId}`);
//   return response.data;
// };

// export const listOrders = async () => {
//   const response = await axios.get(`${REST_API_BASE_URL}/order`);
//   return response.data;
// };

// export const deleteOrder = async (orderId) => {
//   try {
//     const response = await axios.delete(`${REST_API_BASE_URL}/order/${orderId}`);
//     toast.success("Order deleted successfully");
//     return response.data;
//   } catch (error) {
//     toast.error("Cannot delete order. Please try again later.");
//   }
// };

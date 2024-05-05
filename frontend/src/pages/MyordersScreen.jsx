import React, { useContext, useEffect, useState } from "react";
import { useQuery} from "react-query";
import { listOrdersByUser,updateOrderStatus } from "../services/OrderServise";
import LoadingBox from "../components/LoadingBox";
import { Store } from "../Store";

const MyordersScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const userEmail = userInfo?.user?.email;

  const { data: orders, isLoading,refetch } = useQuery("Orders", () => listOrdersByUser(userEmail));

  
  const handleCancelOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "Cancelled"); 
      refetch(); // Refresh the orders data after updating the status
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  
  useEffect(() => {
    console.log("suiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log(orders); // Log the orders data to inspect its structure
  }, [orders]);


  if (isLoading) return <LoadingBox />;

  
  return (
    <div className="container">
      <h2 className="text-center">List of Orders</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
           
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Address</th>
            <th>Status</th>
            <th>Order Items</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(orders).map((order) => (
            <tr key={order.id}>
             
              <td>{order.orderDate}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>
                <ul>
                  {Object.entries(order.products).map(([productName, quantity]) => (
                    <li key={productName}>
                      {productName} - Quantity: {quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                  {order.status === "Processing" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel 
                    </button>
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyordersScreen;


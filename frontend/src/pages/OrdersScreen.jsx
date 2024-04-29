import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { listAllOrders, updateOrderStatus } from "../services/OrderServise";
import LoadingBox from "../components/LoadingBox";
import { Store } from "../Store";

const OrdersScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const userEmail = userInfo?.user?.email;

  const { data: orders, isLoading, refetch } = useQuery("Orders", listAllOrders);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      refetch(); // Refresh the orders data after updating the status
    } catch (error) {
      console.error(`Error updating order status to ${status}:`, error);
    }
  };

  useEffect(() => {
    console.log("Orders:", orders); // Log the orders data to inspect its structure
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
            <th>Actions</th>
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
                {order.status !== "Cancelled" &&order.status !== "Delivered" && (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUpdateOrderStatus(order.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => handleUpdateOrderStatus(order.id, "Shipped")}
                    >
                      Mark as Shipped
                    </button>

                    <button
                    className="btn btn-primary ml-2"
                    onClick={() => handleUpdateOrderStatus(order.id, "Delivered")}
                  >
                    Mark as Delivered
                  </button>
                  </>
                  
                )}
                
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersScreen;

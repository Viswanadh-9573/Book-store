import React, { useContext, useEffect, useState } from "react";

import toast from 'react-hot-toast'; 
import { AppContext } from "../../context/AppContext";

const MyOrders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const { axios, navigate, isAdmin } = useContext(AppContext);

  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/order/admin");
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      getAllOrders();
    }
  }, [isAdmin]);


  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-xl lg:text-lg font-medium">Orders List ({orders.length})</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300/70 text-gray-800"
        >
          <div className="flex flex-col gap-2">
            <p className="flex justify-between items-center gap-6">
              <span className="font-semibold text-sm">OrderID: </span>
              <span className="text-xs font-mono">{order._id}</span>
            </p>
            <p className="font-medium text-base my-auto text-black/70">
              Total Amount: <span className="text-lg font-bold">${order.amount}</span>
            </p>
          </div>

          <div className="flex flex-col text-sm gap-1 md:col-span-2">
            <p>
              <span className="font-medium">Payment Method:</span> {order.paymentType}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Status:</span> {order.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
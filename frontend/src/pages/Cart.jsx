import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState([]); 
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const {
    cartCount,
    totalCartPrice,
    updateCart,
    removeFromCart,
    cart,
    navigate,
    axios,
    setCart,
    user
  } = useContext(AppContext);

  const taxRate = 0.02;
  const tax = (totalCartPrice * taxRate).toFixed(2);
  const grandTotal = (totalCartPrice + parseFloat(tax)).toFixed(2);
  

  const placeOrder = async () => {
    if (!selectedAddress) {
      return toast.error("Please select a delivery address");
    }

    try {
      let data = null;

      if (paymentOption === "COD") {
        const response = await axios.post("/order/cod", {
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
          totalAmount: grandTotal,
          paymentMethod: "COD"
        });
        data = response.data;
      }

      else if (paymentOption === "Online") {
        toast.error("Online payment is not yet implemented.");
        return;
      }

      if (data && data.success) {
        toast.success(data.message || "Order placed successfully!");
        setCart([]);
        navigate("/my-orders");
      } else if (data) {
        toast.error(data.message || "Failed to place order.");
      }

    } catch (error) {
      console.error("Order placement error:", error);
      console.error("Error response:", error.response);
      toast.error(error.response?.data?.message || "An error occurred while placing the order.");
    }
  };



  const getAddresses = async () => {
    try {
      const { data } = await axios.get("/address/get");
      if (data.success) {
        const addresses = data.addresses || data.address || [];
        setAddress(addresses);
        if(addresses.length > 0){
          setSelectedAddress(addresses[0]);
        }
      } else {
         toast.error(data.message || "Failed to fetch addresses");
      }
    } catch (error) {
       toast.error(error.response?.data?.message || "Error fetching addresses");
    }
  };
  
  useEffect(() => {
     if(user){
       getAddresses();
     }
  }, [user]);

  const displaySelectedAddress = () => {
    if (selectedAddress) {
      return (
        <p className="text-gray-500">
          {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country}
        </p>
      );
    }
    return <p className="text-gray-500">No address found</p>;
  };

  const handleAddressSelection = (addr) => {
    setSelectedAddress(addr);
    setShowAddress(false);
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-indigo-500">{cartCount} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cart?.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full h-full object-cover"
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${product.image}`}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.title}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Size: <span>{product.size || "N/A"}</span></p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={product.quantity}
                      onChange={(e) => {
                        updateCart(product._id, parseInt(e.target.value));
                      }}
                    >
                      {Array(10).fill('').map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">${product.offerPrice * product.quantity}</p>
            <button
              onClick={() => removeFromCart(product)}
              className="cursor-pointer mx-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/books");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            {displaySelectedAddress()}
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {address.map((addr, index) => (
                  <p
                    key={index}
                    onClick={() => handleAddressSelection(addr)}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.city}, {addr.state}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/address-details");
                    setShowAddress(false);
                  }}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span><span>${totalCartPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span><span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span><span>${tax}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span><span>${grandTotal}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer text-white font-medium transition"
          style={{ backgroundColor: "#111e5c" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d1747")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#111e5c")}
        >
          {paymentOption === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
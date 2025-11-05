import { useState , useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

export default function Address() {
  const {axios,navigate,user}=useContext(AppContext);
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  const handleChange = (e) => {
    // Ensuring postalCode input is treated as text here, but the backend expects a Number.
    // Consider adding validation or type casting for number fields.
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const addressToSend = {
           ...address,
           postalCode: parseInt(address.postalCode, 10), 
       };
       
       const {data} = await axios.post("/address/add",{
         address: addressToSend 
       });
        
        if(data.success){
          toast.success(data.message);
          navigate("/cart");
        } else{
          toast.error(data.message);
        } 
     } catch (error) {
       // Using error.response?.data?.message for better error reporting from the server
       const errorMessage = error.response?.data?.message || "Failed to add address";
       toast.error(errorMessage);
     }
  };
  
  // CORRECTION: Added useEffect and dependencies (user, navigate)
  // Assuming the intent is to redirect unauthorized users to login.
  useEffect(() => {
    if (!user) { 
      // Redirect if user is null/undefined (not logged in)
      navigate("/login"); 
      toast.error("Please log in to add an address.");
    }
  }, [user, navigate]); // Added dependencies

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[500px] mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add Address
        </h2>

        <input
          id="fullName"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          value={address.fullName}
          name="fullName"
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          id="phoneNumber"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          value={address.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        <input
          id="email"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="email"
          value={address.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          id="street"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          value={address.street}
          name="street"
          onChange={handleChange}
          placeholder="Street"
          required
        />

        <input
          id="city"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          value={address.city}
          name="city"
          onChange={handleChange}
          placeholder="City"
          required
        />

        <input
          id="state"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          value={address.state}
          name="state"
          onChange={handleChange}
          placeholder="State"
          required
        />

        <input
          id="postalCode"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text" // Keep as text, but ensure backend parses it as Number
          value={address.postalCode}
          name="postalCode"
          onChange={handleChange}
          placeholder="Postal Code"
          required
        />

        <input
          id="country"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          value={address.country}
          name="country"
          onChange={handleChange}
          placeholder="Country"
          required
        />

        <button
          className="w-full my-3 bg-gray-800 active:scale-95 transition py-2.5 rounded text-white"
          style={{ backgroundColor: "#111e5c" }}
        >
          Add Address
        </button>

      </form>
    </div>
  );
}
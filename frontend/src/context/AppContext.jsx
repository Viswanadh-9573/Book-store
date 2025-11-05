import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { books } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const[isAdmin, setIsAdmin]=useState(false);

const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/admin/check-auth");
      if (data.success) {
        setIsAdmin(true);
      } else {
         // Silently fail for auth checks on app load
      }
    } catch (error) {
        // Silently fail for auth checks on app load
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/is-auth");
      if (data.success) {
        setUser(data.user);
      } else {
         // Silently fail for auth checks on app load
      }
    } catch (error) {
        // Silently fail for auth checks on app load
    }
  }


  const fetchBooks = async () => {
     try {
        const {data}= await axios.get("/book/get-books");
        if(data.success){
           setBooksData(data.books);
        }
      
        else{
           toast.error(error.message);
        }
     } catch (error) {
        toast.error(error.message);
     }
  }
  useEffect(() => {
    fetchBooks();
    fetchUser(); // Always check user auth on app load
    fetchAdmin(); // Always check admin auth on app load
  }, []);
  const addToCart = (book) => {
    const existingBook = cart.find((item) => item._id === book._id);
  
    if (existingBook) {
      const updatedCart = cart.map((item) =>
        item._id === book._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      toast.success("added to cart");
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
      toast.success("added to cart");
    }
  };
  
  const removeFromCart = (book) => {
    const existingBook = cart.find((item) => item._id === book._id);
  
    if (existingBook) {
      if (existingBook.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(updatedCart);
        toast.success("removed one item from cart");
      } else {
        const updatedCart = cart.filter((item) => item._id !== book._id);
        setCart(updatedCart);
        toast.success("removed from cart");
      }
    }
  };
  
  const updateCart = (productId, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );
    toast.success("quantity updated");
  };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.quantity * item.offerPrice,
    0
  );
  
  
  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        booksData,
        setBooksData,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cartCount,
        totalCartPrice,
        updateCart,
        removeFromCart,
        addToCart,
        cart,
        setCart,
        axios

      }}
    >
      {children}
    </AppContext.Provider>
  );
}


import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FiShoppingCart } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { navigate, user, setUser ,cartCount,axios} = useContext(AppContext);

  // NOTE: logout no longer accepts an 'e' event object
  const logout =  async () => {
     try {
        const {data} = await axios.get("/user/logout");
        if(data.success){
          setUser(null);
          toast.success(data.message);
          navigate("/");
        } 
        else{ 
          toast.error(data.message);
        }
     } catch (error) {
        toast.error(error.message || "Logout failed");
     }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <Link to={"/"}>
        <img className="h-20 w-30 ml-0" src= {assets.booksLogo} alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        {/* Changed the separate Cart Link to be the icon/count */}
        
        {/* CORRECTED: Cart icon/count is now a Link */}
        <Link to="/cart" className="relative cursor-pointer">
          <FiShoppingCart className="w-6 h-6" />
          <button 
            className="absolute -top-2 -right-3 text-xs text-white w-[18px] h-[18px] rounded-full" 
            style={{ backgroundColor: '#111e5c' }}
            // Add a preventDefault so the button click doesn't interfere with the Link
            onClick={(e) => e.preventDefault()} 
          >
            {cartCount?cartCount:0}
          </button>
        </Link>

        <div>
          {user ? (
            <div className="flex items-center gap-5">
              <button
                onClick={() => {
                  navigate("/my-orders");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-1 text-white rounded-full cursor-pointer" style={{ backgroundColor: '#111e5c' }}
              >
                My Orders
              </button>
              {/* CORRECTED: Changed <p> to <button> for semantic correctness */}
              <button
                onClick={logout}
                className="cursor-pointer hover:underline"
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer px-8 py-2 text-white rounded-full" style={{ backgroundColor: '#111e5c' }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-20`}
      >
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/books" onClick={() => setOpen(false)}>Books</Link>
        <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2">
            Cart
            <div className="relative cursor-pointer">
                <FiShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 text-[10px] text-white w-[15px] h-[15px] flex items-center justify-center rounded-full" style={{ backgroundColor: '#111e5c' }}>
                    {cartCount?cartCount:0}
                </span>
            </div>
        </Link>

        {user ? (
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => {
                navigate("/my-orders");
                window.scrollTo({ top: 0, behavior: "smooth" });
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 text-white rounded-full text-sm" style={{ backgroundColor: '#111e5c' }}
            >
              My Orders
            </button>
            {/* CORRECTED: Changed <p> to <button> for semantic correctness */}
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="cursor-pointer hover:underline text-sm text-left" // Added text-left for alignment
              type="button"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="cursor-pointer px-6 py-2 mt-2 text-white rounded-full text-sm" style={{ backgroundColor: '#111e5c' }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
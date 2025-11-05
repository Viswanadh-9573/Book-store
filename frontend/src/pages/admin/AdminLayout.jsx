import React, { useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const AdminLayout = () => {
 const { setIsAdmin,axios,navigate } = useContext(AppContext);


  const sidebarLinks = [
    { name: "All books", path: "/admin", icon: assets.list_icon },
    { name: "Add book", path: "/admin/add-product", icon: assets.add_icon },
    { name: "Orders", path: "/admin/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
     try {
        const  {data} = await axios.get("/admin/logout");
         if(data.success){  
            setIsAdmin(false);  
            navigate("/");
         } else {
            toast.error(data.message || "Logout failed");
         }  
    } catch (error) {
        toast.error(error.message || "Logout failed");
    } 
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <Link to="/admin">
          <img className="h-9" src={assets.logo} alt="logo" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex min-h-[550px]">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
          {sidebarLinks.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center py-3 px-4 gap-3 transition-colors duration-200
                  ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-indigo-100 border-indigo-500 text-indigo-600"
                      : "hover:bg-indigo-50 hover:text-indigo-600 text-gray-700"
                  }`}
              >
                <img src={item.icon} alt={item.name} className="h-5 w-5" />
                <p className="md:block hidden">{item.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Nested Routes */}
        <div className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

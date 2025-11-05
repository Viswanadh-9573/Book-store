import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Address from "./pages/Address";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";

// admin imports
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AddProduct from "./pages/admin/Addproduct";
import ProductList from "./pages/admin/productList";
import Orders from "./pages/admin/orders";



const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.includes("admin");
  const { isAdmin } = useContext(AppContext);

  return (
    <>
      {!isAdminPath && <Navbar />}
      <main className="px-6 md:px-16 lg:px-24 xl:px-32">{children}</main>
      {!isAdminPath && <Footer />}
    </>
  );
};

const App = () => {
  const { isAdmin } = useContext(AppContext);

  return (
    <div className="w-full">
      <Toaster />
      <AppLayout>
        <Routes>
          {/* user routes */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address-details" element={<Address />} />

          {/* admin routes */}
          <Route
            path="/admin"
            element={isAdmin ? <AdminLayout /> : <AdminLogin />}
          >
            <Route index element={<ProductList />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </AppLayout>
    </div>
  );
};

export default App;

import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import Cart from "./components/cart/Cart";
import ChangePass from "./components/changepassword/ChangePass";
import ForgotPass from "./components/changepassword/ForgotPass";
import NewPass from "./components/changepassword/NewPass";
import Contact from "./components/contact/Contact";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/Footer/Footer";
import About from "./components/Hero/About";
import Hero from "./components/Hero/Hero";
import Login from "./components/login/Login";
import Navbar from "./components/Navbar/Navbar";
import NumberCounter from "./components/NumberCounter/NumberCounter";
import ProductDetail from "./components/product/ProductDetail";
import Product from "./components/product/Products";
import Story from "./components/Stories/Story";
import Testimonial from "./components/Testimonial/Testimonial";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import { UserContext, UserProvider } from "./context/UserContext";
import AccessDenied from "./protected/AccessDenied";
import ProtectedRoute from "./protected/ProtectedRoute";
import Register from "./components/register/Register";

const AppContent = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/dashboard"; 

  const authRedirect = (element) => {
    return user ? <Navigate to="/" replace /> : element;
  };

  return (
    <main className="overflow-x-hidden">
    <Toaster position="top-right" reverseOrder={false} />

      {!hideNavbarFooter && <Navbar />} 

      <Routes>
     
        <Route path="/" element={<><Hero /><NumberCounter /><About /><WhyChooseUs /><Testimonial /><Contact /></>} />
        <Route path="/stories" element={<Story />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/login" element={authRedirect(<Login />)} />
        <Route path="/register" element={authRedirect(<Register />)} />
        <Route path="/forgotpass" element={authRedirect(<ForgotPass />)} />
        <Route path="/reset-password/:token" element={authRedirect(<NewPass />)} />

        <Route path="/changepass" element={<ChangePass />} />


        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Access Denied Route */}
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>

      {!hideNavbarFooter && <Footer />} 
    </main>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;

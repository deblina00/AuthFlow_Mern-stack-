import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./store/authStore";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import ProtectedRoute from "./middleware/ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Products from "./pages/Crud/Products";
import AddProduct from "./pages/Crud/AddProduct";
import EditProduct from "./pages/Crud/EditProduct";
import ChangePassword from "./pages/ChangePassword";
import { useEffect } from "react";

function LayoutWrapper() {
  const location = useLocation();
  // const token = useAuthStore((state) => state.token);
  const { token, role } = useAuthStore();

  // ✅ Debug Zustand state on load
  useEffect(() => {
    // console.log("Zustand state on load:");
    // console.log("Token:", token);
    // console.log("Role:", role);
    // console.log("From localStorage (raw):", localStorage.getItem("auth"));
  }, []);

  const hideLayoutOnRoutes = [
    "/",
    "/register",
    "/login",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldHideLayout = hideLayoutOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && token && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected: Any Authenticated User */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/products" element={<Products />} />
        </Route>

        {/* Protected: Admin-Only */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
      {!shouldHideLayout && token && <Footer />}
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark" />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

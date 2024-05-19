import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import AuthProvider from "./components/AuthProvider";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "./apis/userAPI";
import Header from "./components/Header";

//component imports
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Home = lazy(() => import("@/pages/Home"));
const Shop = lazy(() => import("@/pages/Shop"));
const Cart = lazy(() => import("@/pages/Cart"));
const Shipping = lazy(() => import("@/pages/Shipping"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Orders = lazy(() => import("@/pages/Orders"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const App = () => {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
  });

  return (
    <Router>
      <Header userData={userData?.data} />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <AuthProvider>
                <Home user={userData?.data} />
              </AuthProvider>
            }
          />
          <Route
            path="/shop"
            element={
              <AuthProvider>
                <Shop user={userData?.data} />
              </AuthProvider>
            }
          />
          <Route
            path="/cart"
            element={
              <AuthProvider>
                <Cart user={userData?.data} />
              </AuthProvider>
            }
          />
          <Route
            path="/shipping"
            element={
              <AuthProvider>
                <Shipping />
              </AuthProvider>
            }
          />
          <Route
            path="/pay"
            element={
              <AuthProvider>
                <Checkout />
              </AuthProvider>
            }
          />
          <Route
            path="/orders"
            element={
              <AuthProvider>
                <Orders user={userData?.data} />
              </AuthProvider>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layouts/MainLayout";

import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import Cart from "./pages/Cart/Cart";
import CounterContextProvider from "./contexts/counterContext";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRouts from "./protectedRouts/ProtectedRouts";
import ProtectedAuthRouts from "./protectedRouts/ProtectedAuthRouts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import Address from "./pages/Address/Address";
import Orders from "./pages/Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
// import { store } from "./Redux/Store";
import WishList from "./pages/WishList/WishList";
import ForgotPassward from "./pages/ForgetPassward/ForgetPassward";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassward from "./pages/ResetPassward/ResetPassward";

// import { WishlistProvider } from "./wishlistContext";



const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouts>
              <Home />
            </ProtectedRouts>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedAuthRouts>
              <Login />
            </ProtectedAuthRouts>
          ),
        },
        {
          path: "/forgotpassword",
          element: (
            <ProtectedAuthRouts>
              <ForgotPassward/>
            </ProtectedAuthRouts>
          ),
        },
        {
          path: "/verify-code",
          element: (
            <ProtectedAuthRouts>
              <VerifyCode/>
            </ProtectedAuthRouts>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <ProtectedAuthRouts>
              <ResetPassward/>
            </ProtectedAuthRouts>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedAuthRouts>
              <Register />
            </ProtectedAuthRouts>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRouts>
              <Categories />{" "}
            </ProtectedRouts>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRouts>
              <Brands />{" "}
            </ProtectedRouts>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRouts>
              <Cart />
            </ProtectedRouts>
          ),
        },
        {
          path: "/address/:cartId",
          element: (
            <ProtectedRouts>
              <Address />
            </ProtectedRouts>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRouts>
              <Orders />
            </ProtectedRouts>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRouts>
              <WishList />
            </ProtectedRouts>
          ),
        },
        {
          path: "/productDetails/:id",
          element: (
            <ProtectedRouts>
              <ProductDetails />
            </ProtectedRouts>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
    {/* <Provider store={store}> */}
      <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <CounterContextProvider>
                  <RouterProvider router={router}></RouterProvider>
                  <ToastContainer />
                </CounterContextProvider>
            </QueryClientProvider>
      </AuthContextProvider>
    {/* </Provider> */}
    </>
  );
}

export default App;

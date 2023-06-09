import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Admin from "./pages/Admin/Admin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./auth/protectRoute";
import AdminProtectdRoute from "./auth/adminProtectdRoute";
import Update from "./pages/update/Update";
import DeleteAccountPage from "./pages/DeleteAccount/DeleteAccountPage";
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute Component={Home} />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <AdminProtectdRoute Component={Admin} />,
      },
      {
        path: "/account/:id",
        element: <ProtectedRoute Component={Account} />,
      },
      {
        path: "/update/:id",
        element: <ProtectedRoute Component={Update} />,
      },
      {
        path: "/delete/:id",
        element: <ProtectedRoute Component={DeleteAccountPage} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

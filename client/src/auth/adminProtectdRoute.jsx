import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    if (!token || !user.isAdmin) { // modified conditional statement
      navigate("/login");
    }
  }, [token, user, navigate]); // added dependencies for useEffect

  if (token && user.isAdmin) { // added conditional rendering
    return <Component />;
  } else {
    return null;
  }
};

export default AdminProtectedRoute;

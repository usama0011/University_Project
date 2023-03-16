import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;

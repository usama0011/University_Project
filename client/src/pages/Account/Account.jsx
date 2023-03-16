import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  
  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
    
    const fetchUser = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setUser(response.data);
    };
    
    fetchUser();
  }, [accessToken, navigate]);

  return (
    <div className="account-container">
      <h1>User Account</h1>
      <div className="account-details">
        <p>
          <span>Username:</span> {user.username}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Password:</span> {user.password}
        </p>
        <p>
          <span>Full Name:</span> {user.fullName}
        </p>
        <p>
          <span>Is Admin:</span> {user.isAdmin ? "Yes" : "No"}
        </p>
        <p>
          <span>Created At:</span> {new Date(user.createdAt).toLocaleString()}
        </p>
        <p>
          <span>Updated At:</span> {new Date(user.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Wrap your component with the withAuth higher-order component
export default Account

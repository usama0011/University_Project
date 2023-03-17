import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:5000/api/users");
      setUsers(data);
    };
    getUsers();
  }, []);
  const handleDeleteAccount = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>isAdmin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <button
                  disabled={user.isAdmin}
                  onClick={() => handleDeleteAccount(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

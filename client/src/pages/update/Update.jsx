import React, { useState, useEffect } from "react";
import "../../styles/update.css";
import axios from "axios";
const Update = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setFullName(user.fullName);
        setPassword(user.password);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  // Update user's information
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        {
          username,
          email,
          fullName,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const updatedUser = response.data;
      console.log(updatedUser); // Handle success response
      setUpdateSuccess(true);
    } catch (error) {
      console.error(error); // Handle error response
    }
  };
  // Render form
  return (
    <div>
      {updateSuccess && (
        <div className="alert alert-success" role="alert">
          User has been updated successfully.
        </div>
      )}
      <form className="update-form" onSubmit={handleUpdate}>
        <input
          className="update-input"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          className="update-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          className="update-input"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Full Name"
        />
        <input
          className="update-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button className="update-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;

import React, { useState } from "react";
import axios from "axios";
import "../../styles/delete.css";
import { useNavigate } from "react-router-dom";
const DeleteAccountPage = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const navigate = useNavigate();
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${
          JSON.parse(localStorage.getItem("user"))?._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setDeleteSuccess(true);
      navigate("/signup");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete_account">
      {deleteSuccess ? (
        <div className="alert alert-success" role="alert">
          Account has been deleted successfully.
        </div>
      ) : (
        <>
          <h2 className="deltehead">Delete Account</h2>
          <p>Are you sure you want to delete your account?</p>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteAccountPage;

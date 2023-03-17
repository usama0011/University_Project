import { useState } from "react";
import axios from "axios";
import "../../styles/signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
        fullName,
      });
      console.log(res.data);
      setUsername("");
      setEmail("");
      setPassword("");
      setFullName("");
      alert("Account Created SuccessFully Redirect to Login");
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="signup_container">
      <form className="formContainer" onSubmit={handleSubmit}>
        <h2 className="title">Signup</h2>
        <div className="singleDiv">
          <label className="myLabel" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="singleDiv">
          <label className="myLabel" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="singleDiv">
          <label className="myLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="singleDiv">
          <label className="myLabel" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <button className="mybtn" type="submit">
          Signup
        </button>
        <div className="member">
          <span>Already a member?</span>
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

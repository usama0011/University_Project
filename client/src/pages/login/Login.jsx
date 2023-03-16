import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // <-- store user info
      console.log(data);
      if (data.user && data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button className="myButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-center bg-gradient bg-teal space-y-6">
    
      <h2 className="mt-16 mb-6 font-pacific text-3xl text-white">Fish Market Management System</h2>
      <div className="card1 mt-10  text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2><br/><br/>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className=" text-dark"> Email </label><br/>
            <input className="input1" type="email" placeholder="Enter E-mail" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <br/>
          <div>
            <label htmlFor="password" className="text-dark"> Password </label><br/>
            <input className="input1"  type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="downLine">
            <a href="#" className="text-teal">Forgot Password</a>
          </div>

          <div className="mb-4 text-center">
            <button type="submit" className="btn bg-teal text-white w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
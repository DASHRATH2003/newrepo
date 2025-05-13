// src/admin/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_CREDENTIALS = {
  email: "championshrservices@gmail.com",
  password: "Champions@2018",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Admin Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-danger w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// components/admin/Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    navigate("/login");
  };
  
  return (
    <button onClick={handleLogout} className="btn btn-outline-danger">
      Logout
    </button>
  );
};

export default Logout;

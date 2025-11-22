import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4 mb-4 shadow-sm">
      <span className="navbar-brand fw-bold">Equipment Portal</span>
      <div className="ms-auto text-white">
        {user && (
          <>
            <span className="me-3">{user.username} ({user.role})</span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

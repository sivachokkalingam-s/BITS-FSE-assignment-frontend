import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/Admin/AdminDashboard';
import StaffDashboard from '../components/Staff/StaffDashboard';
import StudentDashboard from '../components/Student/StudentDashboard';

const MainPage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand" href="#">
          Equipment Portal
        </a>
        <div className="ms-auto text-light">
          {user ? (
            <>
              <span className="me-3">
                {user.username} ({user.role})
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <span>Not logged in</span>
          )}
        </div>
      </nav>

     <div className="container mt-4">
      <h3 className="mb-3">Welcome, {user.username}</h3>

      {user.role === "ADMIN" && <AdminDashboard />}
      {user.role === "STAFF" && <StaffDashboard />}
      {user.role === "STUDENT" && <StudentDashboard />}
    </div>
    </>
  );
};

export default MainPage;

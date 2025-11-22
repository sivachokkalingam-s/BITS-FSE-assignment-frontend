import React from "react";
import StudentPendingRequests from "./StudentPendingRequests";
import StudentRequestForm from "./StudentRequestForm";

export default function StudentDashboard() {
  return (
    <div className="container mt-4">
      {/* Pending requests on top */}
      <div className="mb-5">
        <h4 className="text-primary mb-3">Your Pending Requests</h4>
        <StudentPendingRequests />
      </div>

      {/* Form below */}
      <div>
        <h4 className="text-success mb-3">Apply for New Request</h4>
        <StudentRequestForm />
      </div>
    </div>
  );
}

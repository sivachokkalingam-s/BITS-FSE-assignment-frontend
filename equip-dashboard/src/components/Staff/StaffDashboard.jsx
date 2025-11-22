import React from "react";
import BorrowRequestTable from "../../components/BorrowRequestTable";

const StaffDashboard = () => (
  <div className="container mt-4">
    <BorrowRequestTable role="STAFF" />
  </div>
);

export default StaffDashboard;

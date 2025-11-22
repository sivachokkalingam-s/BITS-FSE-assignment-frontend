import React, { useEffect, useState } from "react";
import api from "../../services/api";
import BorrowRequestTable from "../../components/BorrowRequestTable";

const AdminDashboard = () => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await api.get("/equipment/all");
        setEquipments(res.data);
      } catch (err) {
        console.error("Error fetching equipments", err);
      }
    };
    fetchEquipments();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">
            <i className="bi bi-box-seam me-2"></i>Equipment Overview
          </h5>
        </div>
        <div className="card-body">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Total</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((eq, i) => (
                <tr key={eq.id}>
                  <td>{i + 1}</td>
                  <td>{eq.name}</td>
                  <td>{eq.category}</td>
                  <td>{eq.quantity}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        eq.available > 0 ? "success" : "danger"
                      }`}
                    >
                      {eq.available}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {equipments.length === 0 && (
            <div className="text-center text-muted">No equipment found</div>
          )}
        </div>
      </div>

       <div className="container mt-4">
            <BorrowRequestTable role="ADMIN" />
        </div>
    </div>
  );
};

export default AdminDashboard;

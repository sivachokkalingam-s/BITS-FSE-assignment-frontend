import React, { useEffect, useState } from "react";
import api from "../../services/api";

const BorrowList = () => {
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await api.get("/borrow/my");
        setBorrows(res.data);
      } catch (err) {
        console.error("Error fetching borrow list", err);
      }
    };
    fetchBorrows();
  }, []);

  const handleReturn = async (id) => {
    try {
      await api.put(`/borrow/return/${id}`);
      setBorrows((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "RETURNED" } : b))
      );
    } catch (err) {
      console.error("Error returning equipment", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">
            <i className="bi bi-box-arrow-in-left me-2"></i>Your Borrowed Items
          </h5>
        </div>
        <div className="card-body">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Equipment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td>{b.equipmentName}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        b.status === "APPROVED"
                          ? "success"
                          : b.status === "RETURNED"
                          ? "info"
                          : "warning"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === "APPROVED" && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleReturn(b.id)}
                      >
                        <i className="bi bi-arrow-return-left me-1"></i>
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {borrows.length === 0 && (
            <div className="text-center text-muted">No borrowed items</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowList;

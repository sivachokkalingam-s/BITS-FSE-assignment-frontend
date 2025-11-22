import React, { useEffect, useState } from "react";
import api from "../services/api";

const BorrowRequestTable = ({ role }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/borrow/all");
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests", err);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      if (status === "APPROVED") await api.put(`/borrow/approve/${id}`);
      else if (status === "REJECTED") await api.put(`/borrow/reject/${id}`);

      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex align-items-center justify-content-between">
        <h5 className="mb-0">
          <i className="bi bi-person-check me-2"></i>
          Borrow Requests
        </h5>
      </div>
      <div className="card-body">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Equipment</th>
              <th>Status</th>
              {role !== "STUDENT" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.borrower}</td>
                <td>{r.equipmentName}</td>
                <td>
                  <span
                    className={`badge bg-${
                      r.status === "APPROVED"
                        ? "success"
                        : r.status === "REJECTED"
                        ? "danger"
                        : "warning"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                {role !== "STUDENT" && (
                  <td>
                    {r.status === "PENDING" && (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleAction(r.id, "APPROVED")}
                        >
                          <i className="bi bi-check-circle"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleAction(r.id, "REJECTED")}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="text-center text-muted">No borrow requests</div>
        )}
      </div>
    </div>
  );
};

export default BorrowRequestTable;

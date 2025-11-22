import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function StudentRequestForm() {
  const [equipments, setEquipments] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await api.get("/equipment/available");
        setEquipments(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching equipments", err);
        setLoading(false);
      }
    };
    fetchEquipments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return alert("Please select an equipment.");

    const res = await api.post("/borrow/request", { equipmentId: selected });
    if (res.status === 200) {
      alert("Request submitted successfully!");
      setSelected("");
       window.location.reload(true); 
    } else {
      alert("Failed to submit request.");
    }
  };

  if (loading) return <p>Loading equipments...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded p-4 shadow-sm bg-light"
    >
      <h5 className="mb-4 text-primary">Borrow Equipment</h5>

      <div className="mb-3">
        <label className="form-label">Select Equipment</label>
        <select
          className="form-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          required
        >
          <option value="">-- Select Equipment --</option>
          {equipments.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name} - {eq.category}
            </option>
          ))}
        </select>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-success">
          Apply to Borrow
        </button>
      </div>
    </form>
  );
}

import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Analytics() {
  const [counts, setCounts] = useState({ totalEquipment: 0, borrowed: 0 });

  useEffect(() => {
    async function load() {
      const eq = await api.get("/equipment");
      const br = await api.get("/borrow/all");
      setCounts({
        totalEquipment: eq.data.length,
        borrowed: br.data.filter(r => r.status === "APPROVED").length
      });
    }
    load();
  }, []);

  return (
    <div>
      <h3>Usage Overview</h3>
      <p>Total equipment: {counts.totalEquipment}</p>
      <p>Currently borrowed: {counts.borrowed}</p>
    </div>
  );
}

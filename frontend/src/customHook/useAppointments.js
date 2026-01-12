import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getAppointments();
      setAppointments(res.data || []);
      setTotalCount(res.count || 0);
      setLoading(false);
    }
    load();
  }, []);

  return { appointments, totalCount, loading };
}

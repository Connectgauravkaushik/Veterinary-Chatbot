const API_BASE = "https://veterinary-chatbot-backend.onrender.com/api";

// send chat 
export async function sendChat(payload) {
  const res = await fetch(`${API_BASE}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status === 404) {
    throw new Error("Invalid Request");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Server error");
  }

  return data;
}

// Get History 
export async function getHistory(sessionId) {
  const res = await fetch(`${API_BASE}/conversations/${sessionId}`);

  if (res.status === 404) return { messages: [] };

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to load history");
  }

  return data;
}

// get all appointments 
export async function getAppointments() {
  try {
    const res = await fetch(`${API_BASE}/admin/appointments`);
    if (!res.ok) throw new Error("API Error");
    return await res.json(); // { count, data }
  } catch (err) {
    console.error("getAppointments failed:", err);
    return { count: 0, data: [] };
  }
}

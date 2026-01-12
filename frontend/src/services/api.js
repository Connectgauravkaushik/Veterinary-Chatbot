const API_BASE = "/api";

export async function sendChat(payload) {
  const res = await fetch("/api/chat/message", {
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


export async function getHistory(sessionId) {
  const res = await fetch(`${API_BASE}/chat/history/${sessionId}`);

  if (res.status === 404) return { messages: [] };

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to load history");
  }

  return data;
}


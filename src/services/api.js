const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api-backend.infoheena13.workers.dev";

export async function sendCallbackLead(formData) {
  const response = await fetch(`${API_BASE}/api/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Request submit nahi ho payi.");
  }

  return result;
}
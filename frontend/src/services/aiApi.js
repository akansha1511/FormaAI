const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "AI request failed.");
  }

  return response.json();
};

export const autofillFromPrompt = async (prompt) => {
  const response = await fetch(`${BASE_URL}/ai/autofill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  return handleResponse(response);
};
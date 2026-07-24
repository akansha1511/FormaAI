const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed.");
  }

  return response.json();
};

export const saveDraft = async (payload) => {
  const response = await fetch(`${BASE_URL}/forms/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const submitForm = async (payload) => {
  const response = await fetch(`${BASE_URL}/forms/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const getSubmission = async (id) => {
  const response = await fetch(`${BASE_URL}/forms/${id}`);

  return handleResponse(response);
};
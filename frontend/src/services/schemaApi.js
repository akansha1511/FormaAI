const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch schema.");
  }

  return response.json();
};

export const getFormSchema = async (formId) => {
  const response = await fetch(`${BASE_URL}/schemas/${formId}`);

  return handleResponse(response);
};

export const getAllSchemas = async () => {
  const response = await fetch(`${BASE_URL}/schemas`);

  return handleResponse(response);
};
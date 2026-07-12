const API_BASE_URL = "https://asdesignsapi-xi.vercel.app/api";

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export async function submitContactForm(data: ContactPayload) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Something went wrong");
  }

  return result;
}

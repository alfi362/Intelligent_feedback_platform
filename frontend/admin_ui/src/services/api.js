const API_URL = "https://your-api.execute-api.ap-south-1.amazonaws.com";

export async function getFeedback() {

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}/admin/feedback`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}
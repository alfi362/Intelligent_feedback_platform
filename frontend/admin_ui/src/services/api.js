const API_URL = "https://2g12y1bgwl.execute-api.ap-south-1.amazonaws.com";

function getToken() {
  return localStorage.getItem("id_token");
}
// console.log("TOKEN:", getToken())
export async function getFeedback() {

  const res = await fetch(`${API_URL}/admin/feedback`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
}

export async function getStats() {

  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
}
import { cognitoConfig } from "./cognitoConfig";

export async function exchangeCodeForToken(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: cognitoConfig.clientId,
    redirect_uri: cognitoConfig.redirectUri,
    code: code
  });

  try {
    const res = await fetch(`${cognitoConfig.domain}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("COGNITO ERROR:", data);
      return { error: data.error || "Failed to exchange code" };
    }

    // Only save if the tokens actually exist
    if (data.id_token && data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id_token", data.id_token);
      return data;
    }
    
    return { error: "No tokens in response" };
  } catch (err) {
    console.error("Network error during token exchange:", err);
    return { error: "Network error" };
  }
}
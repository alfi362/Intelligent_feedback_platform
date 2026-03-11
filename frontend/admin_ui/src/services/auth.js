import { cognitoConfig } from "./cognitoConfig";

export async function exchangeCodeForToken(code) {

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: cognitoConfig.clientId,
    redirect_uri: cognitoConfig.redirectUri,
    code
  });

  const res = await fetch(
    `${cognitoConfig.domain}/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    }
  );

  const data = await res.json();

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("id_token", data.id_token);

  return data;
}
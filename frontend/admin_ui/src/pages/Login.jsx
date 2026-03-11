import { cognitoConfig } from "../services/cognitoConfig";

export default function Login() {

  const handleLogin = () => {

    const loginUrl =
      `${cognitoConfig.domain}/login` +
      `?response_type=code` +
      `&client_id=${cognitoConfig.clientId}` +
      `&redirect_uri=${encodeURIComponent(cognitoConfig.redirectUri)}` +
      `&scope=openid+email+profile`;

    window.location.href = loginUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 shadow rounded w-96 text-center">

        <h1 className="text-2xl font-bold mb-6">
          Feedback Admin
        </h1>

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login with Cognito
        </button>

      </div>

    </div>
  );
}
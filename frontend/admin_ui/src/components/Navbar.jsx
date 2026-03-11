import React from "react";
export default function Navbar() {

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between">

      <h1 className="text-lg font-semibold">
        Feedback Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
}
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {

  const token = localStorage.getItem("access_token")
  const params = new URLSearchParams(window.location.search)
  const code = params.get("code")
  if (!token && !code) {
    return <Navigate to="/" />
  }

  return children
}
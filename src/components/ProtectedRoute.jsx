import { Navigate } from "react-router-dom";
import { getTokenFromCookies } from "../cookieUtils";

export default function ProtectedRoute({ children }) {
  const token = getTokenFromCookies();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

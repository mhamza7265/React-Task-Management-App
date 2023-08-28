import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const currentState = useSelector((state) => state.login.current);

  if (!currentState) {
    alert("Login first!");
    return <Navigate to="/login" />;
  } else return children;
}

export default RequireAuth;

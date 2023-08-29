import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function RequireAuth({ children }) {
  const toast = useToast();
  var flag = false;
  localStorage.getItem("access_token") ? (flag = true) : (flag = false);

  if (!flag) {
    toast({
      title: "Login First.",
      position: "top",
      isClosable: true,
      duration: 1000,
      status: "warning",
    });
    return <Navigate to="/login" />;
  } else return children;
}

export default RequireAuth;

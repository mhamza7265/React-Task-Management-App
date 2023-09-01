import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function HaveAuth({ children }) {
  const toast = useToast();
  var flag = false;
  localStorage.getItem("access_token") ? (flag = true) : (flag = false);

  if (flag) {
    toast({
      title: "Already Logged-in",
      position: "top",
      isClosable: true,
      duration: 1000,
      status: "warning",
    });
    return <Navigate to="/" />;
  } else return children;
}

export default HaveAuth;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ element }) => {
  const [isAuthenticated, setisAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(token);
      setisAuthenticated(false);
      console.log(isAuthenticated);
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return element;
  }
  return <Navigate to="/login" />;
};

export default PrivateRouter;

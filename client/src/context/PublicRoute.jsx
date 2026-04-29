import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Authcontext } from "./callcontext";

const PublicRoute = ({ children }) => {
  const { isloggedin } = useContext(Authcontext);
  const location = useLocation();

  if (isloggedin  === null) return <h2>Loading...</h2>;

  if (isloggedin) {
    return <Navigate to={location.state?.from?.pathname || "/dashboard"} replace />;
  }

  return children;
};

export default PublicRoute;

import { useContext } from "react";
import { Authcontext } from "./callcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isloggedin } = useContext(Authcontext);
  if (isloggedin == null) {
    return <h2>Loading ....... </h2>;
  }
  return <div>{isloggedin ? children : <Navigate to={"/login"} />}</div>;
};

export default ProtectedRoute;

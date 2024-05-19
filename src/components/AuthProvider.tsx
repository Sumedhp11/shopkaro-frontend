import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isloggedIn = sessionStorage.getItem("isLoggedIn");

  return (
    <>
      {isloggedIn === "false" ||
        (isloggedIn === null && <Navigate to={"/login"} />)}
      <div>{children}</div>
    </>
  );
};

export default AuthProvider;

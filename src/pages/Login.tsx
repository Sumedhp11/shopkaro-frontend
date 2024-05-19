import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isloggedIn = sessionStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (isloggedIn === "true") {
      navigate("/");
    }
  }, [isloggedIn, navigate]);
  return (
    <div className="w-full  flex justify-center overflow-hidden">
      <Card className="shadow-md shadow-gray-400 w-[90%] md:w-[30%] mt-10 md:mt-36 h-full py-5">
        <CardHeader>
          <CardTitle className="font-medium text-2xl text-center font-mono">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

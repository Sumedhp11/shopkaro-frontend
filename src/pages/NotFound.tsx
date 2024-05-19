import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center ">
      <div className="md:w-[35%] w-[90%] flex flex-col justify-center items-center space-y-10 mt-20 ">
        <p className="md:text-xl text-lg font-medium text-gray-600">
          OOPS You are On Wrong Path
        </p>
        <p className="text-4xl">❌</p>
        <p className="md:text-xl text-lg font-medium text-gray-600">
          404 {location.pathname} Path Not Found
        </p>
        <Button className="w-full" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

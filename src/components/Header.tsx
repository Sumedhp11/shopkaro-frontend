import { LogoutAPI } from "@/apis/userAPI";
import { useMutation } from "@tanstack/react-query";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export interface userData {
  user: {
    _id: string;
    fullName: string;
    email: string;
    phone: number;
    password: string;
    addresses: [];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  cart: {
    userId: string;
    items: [
      {
        productId: string;
        quantity: number;
        _id: string;
      }
    ];
  };
}

const Header = ({ userData }: { userData: userData }) => {
  const navigate = useNavigate();
  const isloggedIn = sessionStorage.getItem("isLoggedIn");

  const { mutate: logoutMutate } = useMutation({
    mutationFn: LogoutAPI,
    onSuccess: () => {},
  });
  const handleLogout = () => {
    logoutMutate();
    sessionStorage.clear();
    navigate("/login");
  };

  const cartLength = userData?.cart?.items?.length;
  return (
    <div className="w-full flex justify-between items-center h-24  bg-indigo-500">
      <Link
        to={"/"}
        replace
        className="flex items-center space-x-3 mx-2 md:mx-3"
      >
        <img
          src={
            "https://imgs.search.brave.com/5qzxJKggNohXcyyh2zXs0wAz75JEM0mfb5BUjkZ4JxU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8z/MS84NS9wLWNhcnQt/bG9nby12ZWN0b3It/MjQ3MTMxODUuanBn"
          }
          alt="shopkaro-logo "
          className="md:w-20 w-14 md:h-20 h-14 rounded-full bg-orange-200"
        />
        <h1 className="font-mono font-medium md:text-xl text-lg text-white">
          ShopKaro
        </h1>
      </Link>
      {isloggedIn === "true" ? (
        <div className="flex items-center md:space-x-6 md:mx-3 mx-1 space-x-1">
          <Link to={"/shop"}>
            <li className="list-none font-mono font-medium md:text-xl text-lg text-white">
              Shop
            </li>
          </Link>
          <Link to={"/cart"} className="relative">
            <li className="list-none font-mono font-medium md:text-xl text-lg text-white relative ">
              Cart
            </li>
            <p className="absolute -top-5 inset-1/2 md:text-xl text-lg font-medium text-white right-0 ">
              {cartLength > 0 ? cartLength : null}
            </p>
          </Link>
          <Link to={"/orders"}>
            <li className="list-none font-mono font-medium md:text-xl text-lg text-white">
              Orders
            </li>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <IoLogOut size={30} className="text-white cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : null}
    </div>
  );
};

export default Header;

import { getOrderById } from "@/apis/OrderAPI";
import { userData } from "@/components/Header";
import Loader from "@/components/Loader";
import OrdersComponent from "@/components/OrdersComponent";
import { useQuery } from "@tanstack/react-query";
import { CartItem } from "./Cart";

export interface OrderDataInterface {
  deliveryStatus: string;
  items: CartItem[];
  shippingAddress: string;
  totalAmount: number;
  _id: string;
}

const Orders = ({ user }: { user: userData }) => {
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrderById({ userId: user.user._id }),
  });

  return (
    <div className="w-full min-h-screen flex justify-center mt-24">
      <div className="md:w-[35%] w-[95%] h-fit py-3 rounded-md px-3 space-y-7 shadow-lg shadow-gray-400">
        <h1 className="font-medium text-2xl">Your Orders</h1>
        {isLoading ? <Loader /> : <OrdersComponent ordersData={ordersData} />}
      </div>
    </div>
  );
};

export default Orders;

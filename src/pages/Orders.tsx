import { getOrderById } from "@/apis/OrderAPI";
import { userData } from "@/components/Header";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "@/components/ui/column";
import { useQuery } from "@tanstack/react-query";

export interface OrderDataInterface {
  deliveryStatus: string;
  items: [
    {
      productId: {
        Price: number;
        Product_img: string;
        Product_name: string;
      };
      quantity: number;
    }
  ];
  shippingAddress: string;
  totalAmount: number;
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DataTable columns={columns} data={ordersData?.items} />
            <div className="flex gap-3 justify-between">
              <span className="text-nowrap font-medium">Shipping Address:</span>

              <span className="font-normal">{ordersData?.shippingAddress}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="text-nowrap font-medium">Total Amount: </span>
              <span className="font-normal">${ordersData?.totalAmount}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="text-nowrap font-medium">Delivery Status: </span>
              <span className="font-normal">{ordersData?.deliveryStatus}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;

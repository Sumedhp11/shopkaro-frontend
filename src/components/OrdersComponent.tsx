import { OrderDataInterface } from "@/pages/Orders";
import { DataTable } from "./ui/DataTable";
import { columns } from "./ui/column";

const OrdersComponent = ({
  ordersData,
}: {
  ordersData: OrderDataInterface[];
}) => {
  return (
    <div>
      {ordersData?.map((order: OrderDataInterface) => (
        <div key={order._id} className="my-3">
          <DataTable columns={columns} data={order.items} />
          <div className="flex gap-3 justify-between">
            <span className="text-nowrap font-medium">Shipping Address:</span>
            <span className="font-normal">{order.shippingAddress}</span>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-nowrap font-medium">Total Amount: </span>
            <span className="font-normal">${order.totalAmount}</span>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-nowrap font-medium">Delivery Status: </span>
            <span className="font-normal">{order.deliveryStatus}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersComponent;

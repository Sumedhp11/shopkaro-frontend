import { getCartByUserId } from "@/apis/CartAPI";
import { addtoCart } from "@/apis/ProductAPI";
import { userData } from "@/components/Header";
import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { product } from "./Home";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export interface CartItem {
  productId: product;
  quantity: number;
  _id: string;
}

const Cart = ({ user }: { user: userData }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: addtoCartMutation } = useMutation({
    mutationFn: addtoCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["Cart"] });

      toast.success(data.message);
    },
  });
  const { data: CartData, isLoading } = useQuery({
    queryKey: ["Cart"],
    queryFn: () => getCartByUserId({ userId: user.user._id }),
  });

  const addtoCartHandler = (product: product, quantity: number) => {
    addtoCartMutation({
      userId: user.user._id,
      productId: product._id,
      quantity: quantity,
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center ">
      <Card className="w-[85%] md:w-[60%] shadow-md shadow-black h-fit mt-16 space-y-5">
        {isLoading ? (
          <Loader />
        ) : (
          <CardContent>
            <div className="px-3 flex flex-col justify-center items-center space-y-11 py-2">
              {CartData?.cart?.items?.length > 0 ? (
                CartData?.cart.items?.map((item: CartItem) => (
                  <div
                    key={item.productId._id}
                    className="flex justify-between py-3  border-b border-gray-400 "
                  >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-1/2">
                      <img
                        src={item.productId.Product_img}
                        alt=""
                        className="w-28 h-28"
                      />
                      <p className="font-medium text-base">
                        {item.productId.Product_name.slice(0, 45)}......
                      </p>
                    </div>
                    <div className="flex justify-between flex-col items-end">
                      <p>Price : ${item.productId.Price}</p>
                      <div className="flex gap-3 items-center">
                        <HiOutlinePlus
                          size={30}
                          color="green"
                          className="cursor-pointer"
                          onClick={() =>
                            addtoCartHandler(item?.productId, item.quantity + 1)
                          }
                        />
                        <p className="text-base font-medium">{item.quantity}</p>
                        <HiOutlineMinus
                          size={30}
                          color="red"
                          className="cursor-pointer"
                          onClick={() =>
                            addtoCartHandler(item?.productId, item.quantity - 1)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p>No Items In Cart</p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/shop");
                    }}
                  >
                    Shop More
                  </Button>
                </>
              )}
            </div>
            {CartData?.cart?.items?.length > 0 ? (
              <>
                <div className="flex justify-between items-center py-5">
                  <p className="text-base font-medium">Total Amount:</p>
                  <p className="text-base font-medium">
                    ${CartData?.totalAmount}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => navigate("/shipping", { state: CartData })}
                >
                  Checkout
                </Button>
              </>
            ) : null}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Cart;

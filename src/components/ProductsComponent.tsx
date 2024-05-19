import { addtoCart } from "@/apis/ProductAPI";
import { product } from "@/pages/Home";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userData } from "./Header";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const ProductsComponent = ({
  productData,
  user,
}: {
  productData: [product];
  user: userData;
}) => {
  const queryClient = useQueryClient();
  const { mutate: addtoCartMutation } = useMutation({
    mutationFn: addtoCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Added to Cart Successfully");
    },
  });
  const addtoCartHandler = (product: product) => {
    addtoCartMutation({
      userId: user.user._id,
      productId: product._id,
      quantity: 1,
    });
  };

  const cartItems = user?.cart?.items || [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-16 ">
      {productData?.length > 0 ? (
        productData?.map((product: product) => {
          const isInCart = cartItems.some(
            (item) => item.productId === product._id
          );

          return (
            <Card key={product._id} className="shadow-md shadow-gray-500">
              <CardContent className="flex flex-col justify-center space-y-4">
                <img
                  src={product.Product_img}
                  alt="product-image"
                  className="w-full h-60 p-2 object-cover"
                />
                <p className="font-medium text-base md:text-lg ">
                  {product.Product_name.slice(0, 45)}...
                </p>
                <p className="font-medium text-base md:text-lg">
                  {product.Price}$
                </p>
                <Button
                  onClick={() => addtoCartHandler(product)}
                  disabled={isInCart}
                >
                  {isInCart ? "Added To Cart..." : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="font-semibold text-xl md:text-3xl text-center w-full">
          No Products Found!
        </p>
      )}
    </div>
  );
};

export default ProductsComponent;

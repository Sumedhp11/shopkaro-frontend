import { addtoCart, getRandomProducts } from "@/apis/ProductAPI";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BannerImage from "@/assets/vecteezy_online-shopping-on-phone-buy-sell-business-digital-web_4299819.jpg";
import { Button } from "@/components/ui/button";
import { userData } from "@/components/Header";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
export interface product {
  _id: string;
  Product_name: string;
  categoryId: string;
  Product_img: string;
  Price: number;
}
const Home = ({ user }: { user: userData }) => {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery({
    queryKey: ["random-products"],
    queryFn: getRandomProducts,
  });

  const { mutate: addtoCartMutation } = useMutation({
    mutationFn: addtoCart,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Added to Cart Successfully");
    },
  });
  const addtoCartHandler = (product: product) => {
    console.log(user.user._id);
    console.log(product._id);

    addtoCartMutation({
      userId: user.user._id,
      productId: product._id,
      quantity: 1,
    });
  };
  const cartItems = user?.cart.items || [];

  return (
    <div className="flex flex-col w-full  justify-center items-center space-y-5">
      <img
        src={BannerImage}
        className="w-full h-80 object-cover p-3 rounded-3xl shadow-md shadow-gray-300"
        alt=""
      />
      <h1 className="text-xl font-medium">Some Products You Will Like...⭐</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-16 ">
          {products.length > 0 ? (
            products?.map((product: product) => {
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
                    <p className="font-medium text-lg ">
                      {product.Product_name.slice(0, 45)}...
                    </p>
                    <p className="font-medium text-lg">{product.Price}$</p>
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
            <p>No Products Found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

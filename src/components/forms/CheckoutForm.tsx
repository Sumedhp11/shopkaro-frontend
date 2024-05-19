import { newOrderAPI } from "@/apis/OrderAPI";
import { CartItem } from "@/pages/Cart";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutForm = ({ state }: { state: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { mutate: CreateOrderMutation } = useMutation({
    mutationFn: newOrderAPI,
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });
    if (paymentIntent?.status === "succeeded") {
      setIsProcessing(false);

      const items = state.cart.items.map((item: CartItem) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));
      const totalAmount = state.totalAmount;
      const addressString = Object.values(state.values).join(", ");
      CreateOrderMutation({
        items,
        shippingAddress: addressString,
        totalAmount: totalAmount,
        userId: state.cart.userId,
      });
      navigate("/orders");
    }
    if (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center mt-32 space-y-5">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing ? "Processing" : "Pay"}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;

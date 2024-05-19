import { Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/forms/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);
const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state.clientSecret;
  if (!clientSecret) return <Navigate to={"/shipping"} />;
  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckoutForm state={location.state} />
    </Elements>
  );
};

export default Checkout;

import { createPaymentIntent } from "@/apis/PaymentAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newOrderState, setnewOrderState] = useState({
    ...location.state,
  });

  const form = useForm({
    defaultValues: {
      flatno: "",
      building: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  const { mutate: PaymentIntentMutation } = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data: string) => {
      const orderState = {
        ...newOrderState,
        clientSecret: data,
      };
      navigate("/pay", { state: orderState });
    },
  });

  const submitAddressHandler = (values: { [key: string]: string }) => {
    const hasEmptyValues = Object.values(values).some((value) => value === "");

    if (!hasEmptyValues) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setnewOrderState((prev: any) => ({
        ...prev,
        values,
      }));

      PaymentIntentMutation(location.state.totalAmount);
    } else {
      toast.error("Please Fill All Fields ");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center mt-16">
      <Card className="w-[80%] md:w-[45%] py-2 h-fit shadow-lg shadow-gray-400">
        <CardHeader>
          <CardTitle className="font-medium text-2xl text-center">
            Add your Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full px-3 py-3 flex flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitAddressHandler)}
                className="space-y-8"
              >
                <div className="w-full px-2 flex items-center gap-3">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="flatno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flat No/House No : </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Flat No/House No"
                              {...field}
                              className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="building"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apartment/Building :</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Apartment Name or Building"
                              {...field}
                              className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full px-2 flex items-center gap-3">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street : </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Street"
                              {...field}
                              className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landmark :</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Landmark"
                              {...field}
                              className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full px-2 flex items-center gap-3">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City : </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your City"
                              {...field}
                              className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode :</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Pincode"
                              {...field}
                              className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your State"
                          {...field}
                          className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full font-mono hover:opacity-90"
                  type="submit"
                >
                  Pay
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Shipping;

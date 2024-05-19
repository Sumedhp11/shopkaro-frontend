import registerSchema from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "@/apis/userAPI";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const { isPending, mutate: RegisterUser } = useMutation({
    mutationFn: registerAPI,
    onMutate: () => {
      toast.loading("Logging In...", { duration: 1000 });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      navigate("/login");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  const registerSubmitHandler = (values: z.infer<typeof registerSchema>) => {
    RegisterUser(values);
  };
  return (
    <div className="w-full px-5 py-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerSubmitHandler)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name: </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Full Name"
                    {...field}
                    className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email: </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    {...field}
                    className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number: </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Phone Number"
                    {...field}
                    className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password: </FormLabel>
                <FormControl>
                  <div className="relative ">
                    <Input
                      placeholder="Enter Your Password"
                      {...field}
                      className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base"
                      type={showPassword ? "text" : "password"}
                    />
                    {showPassword ? (
                      <FaRegEyeSlash
                        className="absolute right-1 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setshowPassword(false)}
                      />
                    ) : (
                      <FaRegEye
                        className="absolute right-1 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setshowPassword(true)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full font-mono hover:opacity-90"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
          <div className="flex gap-3">
            <span className="font-mono">Already Have an Account?</span>
            <span
              className="font-mono text-blue-800 cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

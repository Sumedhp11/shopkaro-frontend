import loginSchema from "@/schemas/loginSchema";
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
import { loginAPI } from "@/apis/userAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: loginAPI,
    onMutate: () => {
      toast.loading("Logging In...", { duration: 1000 });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      sessionStorage.setItem("isLoggedIn", String(true));
      form.reset();
      navigate("/");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const loginSubmitHandler = (values: z.infer<typeof loginSchema>) => {
    loginMutate(values);
  };

  return (
    <div className="w-full px-5 py-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(loginSubmitHandler)}
          className="space-y-8"
        >
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
            {isPending ? "Login...." : "Login"}
          </Button>
          <div className="flex gap-3">
            <span className="font-mono">Dont Have an Account?</span>
            <span
              className="font-mono text-blue-800 cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

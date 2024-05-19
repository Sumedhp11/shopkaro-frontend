import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(4, "Full name should be more than 4 characters"),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, "Phone Number must be minimum 10 digits")
    .max(10, "Phone Number must be maximum 10 digits"),
  password: z.string().min(6, "Password must be minimum 6 characters").max(12),
});

export default registerSchema;

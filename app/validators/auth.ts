import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, { message: "Your Name Should Not Be That Short" })
    .max(255, { message: "Your Name Should Not Be That Short" }),
  studentId: z.string().min(7).max(7),
  year: z.string().min(1).max(10),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
});

//--- zod: zod is a typescript library that does schema validation for us, so we can define what style we want and zod can ensure that the input is valid.

//so this schema tells the how the form is gonna look like

export const formSchema = z.object({
  name: z.string().min(5).max(30, { message: "Your name is too long" }),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
});

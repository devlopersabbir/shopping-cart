import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(10),
  price: z.string().min(1),
  image: z.string().min(5),
});

export const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

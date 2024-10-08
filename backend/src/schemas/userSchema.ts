import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(2, "First name must be greater than 2 characters"),
  lastName: z.string().min(2, "Last name must be greater than 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userIdSchema = z.string().regex(/^\d+$/).transform(Number);

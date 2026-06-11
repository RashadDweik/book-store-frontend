import { z } from 'zod'


//strict password schema
const strictPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must not exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

//signupschema
  export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters")
      .regex(/^[a-zA-O0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z
      .string()
      .trim()
      .toLowerCase(),
    password: strictPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


//login schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"), 
});

// Infered Login and Signup schemas
export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
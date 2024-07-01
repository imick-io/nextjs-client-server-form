import { z } from "zod";

export const newsletterSchema = z.object({
  first: z
    .string()
    .trim()
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(50, {
      message: "First name must be at most 50 characters",
    }),
  last: z
    .string()
    .trim()
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(50, {
      message: "Last name must be at most 50 characters",
    }),
  email: z.string().trim().email({
    message: "Invalid email address",
  }),
});

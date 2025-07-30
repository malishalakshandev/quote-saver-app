import { z } from "zod"

const userDTO = z.object({
  userId: z.string({ message: "User Id is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
});

const createQuoteDTO = z.object({
    user: userDTO,
    quote_name: z
        .string()
        .min(5, {message: "Quote must be at least 5 characters."})
        .max(20, {message: "Quote must be at maximum 20 characters."}),
    isPublic: z.boolean().default(false), // optional with default
});

const updateQuoteDTO = z.object({
    quote_name: z
        .string()
        .min(5, {message: "Quote must be at least 5 characters."})
        .max(20, {message: "Quote must be at maximum 20 characters."}),
    isPublic: z.boolean().default(false), // optional with default
});

export { createQuoteDTO, updateQuoteDTO }
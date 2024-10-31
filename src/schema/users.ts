import { z } from "zod";

export const SignupSchemaValidator = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const ProductSchemaValidator = z.object({
    name: z.string().min(1, "Name is required").optional(), // Validates that name is a string and not empty
    price: z.number().min(0, "Price must be a positive number").optional(), // Validates that price is a number and positive
    tags: z.array(z.string()).optional(),
    description: z.string().optional()
})

export const AddressSchemaValidator = z.object({
    addressOne: z.string(),
    addressTwo: z.string(),
    pincode: z.string().length(6),
    country: z.string(),
    city: z.string(),
});

export const UpdateUserSchemaValidator = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().optional(),
    defaultBillingAddress: z.number().optional()
});
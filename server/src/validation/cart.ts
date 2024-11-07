import { z } from "zod";

export const CartSchemaValidator = z.object({
    productId: z.number(),
    quantity: z.number()
})

export const ChangeQuantitySchemaValidator = z.object({
    quantity: z.number()
})
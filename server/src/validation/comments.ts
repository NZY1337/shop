import { z } from "zod";

export const CommentSchemaValidator = z.object({
  content: z.string().min(1).max(255),
  userId: z.number().int(),
  productId: z.number().int(),
});

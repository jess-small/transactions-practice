import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.number().int().positive(),
  date: z.string().datetime(),
  amount: z.number().positive(),
  merchant: z.string().min(1, { message: "Merchant name cannot be empty" }),
  category: z.string().min(1, { message: "Category cannot be empty" }),
});

// Type inference from the schema
export type Transaction = z.infer<typeof TransactionSchema>;

import { z } from "zod";
import { Transaction, TransactionSchema } from "../types";

/**
 * Validates an array of transactions
 * @param {unknown[]} transactions - The transactions to validate
 * @returns {Transaction[]} The validated transactions
 */
export function validateTransactionsArray(
  transactions: unknown[]
): Transaction[] {
  return transactions
    .filter(
      (transaction): transaction is Record<string, unknown> =>
        transaction !== null
    )
    .map((transaction) => {
      try {
        // Attempt to parse the entire transaction
        const validatedTransaction = TransactionSchema.parse(transaction);
        return validatedTransaction;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation error:", error.errors);

          // If there's a validation error, create a new object with NULL for invalid fields
          const nullTransaction: Partial<
            Record<keyof Transaction, string | number | null>
          > = {};

          // Go through each field and apply validation
          Object.keys(TransactionSchema.shape).forEach((key) => {
            try {
              // Try to validate each field individually
              const fieldSchema =
                TransactionSchema.shape[
                  key as keyof typeof TransactionSchema.shape
                ];
              nullTransaction[key as keyof Transaction] = fieldSchema.parse(
                (transaction as Record<string, unknown>)[key]
              );
            } catch (fieldError) {
              console.error(`Validation error for field ${key}:`, fieldError);
              // If field validation fails, set to null
              nullTransaction[key as keyof Transaction] = null;
            }
          });

          return nullTransaction as Transaction | null;
        }

        // For any other unexpected errors, log the error and return null
        console.error("Unexpected error during validation:", error);
        return null;
      }
    })
    .filter((transaction): transaction is Transaction => transaction !== null);
}

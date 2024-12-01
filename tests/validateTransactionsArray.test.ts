import { validateTransactionsArray } from "../src/utils/dataValidation";

describe("validateTransactionsArray", () => {
  it("should validate an array of valid transactions", () => {
    const transactions = [
      {
        id: 1,
        date: "2024-12-01T10:00:00Z",
        amount: 100.5,
        merchant: "Store A",
        category: "Groceries",
      },
      {
        id: 2,
        date: "2024-12-02T15:30:00Z",
        amount: 200,
        merchant: "Cafe B",
        category: "Food",
      },
    ];

    const result = validateTransactionsArray(transactions);
    expect(result).toEqual(transactions);
  });

  it("should handle invalid fields and replace them with null", () => {
    const transactions = [
      {
        id: -1, // invalid id
        date: "2024-12-01T10:00:00Z",
        amount: 100.5,
        merchant: "Store A",
        category: "Groceries",
      },
      {
        id: 2,
        date: "invalid-date", // invalid date
        amount: -50, // invalid amount
        merchant: "", // invalid merchant
        category: "Food",
      },
    ];

    const expected = [
      {
        id: null,
        date: "2024-12-01T10:00:00Z",
        amount: 100.5,
        merchant: "Store A",
        category: "Groceries",
      },
      {
        id: 2,
        date: null,
        amount: null,
        merchant: null,
        category: "Food",
      },
    ];

    const result = validateTransactionsArray(transactions);
    expect(result).toEqual(expected);
  });

  it("should filter out null values from unexpected errors", () => {
    const transactions = [
      null,
      {
        id: 1,
        date: "2024-12-01T10:00:00Z",
        amount: 100,
        merchant: "Store A",
        category: "Groceries",
      },
    ];

    const expected = [
      {
        id: 1,
        date: "2024-12-01T10:00:00Z",
        amount: 100,
        merchant: "Store A",
        category: "Groceries",
      },
    ];

    const result = validateTransactionsArray(transactions);
    expect(result).toEqual(expected);
  });
});

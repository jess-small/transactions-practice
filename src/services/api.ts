import { Transaction } from "../types";
import { validateTransactionsArray } from "../utils/dataValidation";

{
  /** 
  Fetches the first page of transactions from the API
  @returns {Promise<Transaction[]>} The fetched transactions
  @throws {Error} An error message if the request fails
  */
}
async function fetchFirstPage(): Promise<Transaction[]> {
  const url = `${import.meta.env.VITE_TRANSACTIONS_API_URL}?page=1`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const validatedData = validateTransactionsArray(data.transactions);
    return validatedData;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Failed to parse JSON:", error);
      throw new Error("Failed to parse JSON");
    } else if (error instanceof TypeError) {
      console.error("Network error or resource not found:", error);
      throw new Error("Network error or resource not found");
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export { fetchFirstPage };

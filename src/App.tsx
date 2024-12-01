import { format } from "date-fns";
import useFetchTransactions from "./hooks/useFetchTransactions";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  const { transactions, isLoading, error } = useFetchTransactions();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  const HEADINGS = ["ID", "Date", "Amount", "Merchant", "Category"];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center">Expenses</h1>
      {transactions && transactions.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No transactions found
        </div>
      ) : (
        <div className="w-full overflow-x-auto shadow-md">
          <table className="w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                {HEADINGS.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors capitalize"
                >
                  <td className="">{transaction?.id}</td>
                  <td>
                    {transaction?.date &&
                      format(new Date(transaction.date), "HH:mm - dd/MM/yyyy")}
                  </td>
                  <td>
                    {" "}
                    {transaction?.amount && `£${transaction.amount.toFixed(2)}`}
                  </td>
                  <td>{transaction?.merchant}</td>

                  <td>{transaction?.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

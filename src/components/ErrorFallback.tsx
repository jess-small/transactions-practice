interface ErrorFallbackProps {
  error: string;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Uh oh! Something went wrong, please try again later.
      </h2>
      <p className="text-gray-700 mb-6">{error}</p>
    </div>
  </div>
);

export default ErrorFallback;

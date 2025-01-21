"use client";
export default function PaymentSuccess() {
  return (
    <div className="min-h-screen pt-[24] flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="text-center space-y-4">
        <div className="p-4 bg-green-600 rounded-full inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4 -4M12 2a10 10 0 11-10 10a10 10 0 0110-10z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="text-lg">
          Thank you for your payment. Your booking has been confirmed!
        </p>
      </div>

      <div className="mt-8 space-x-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-medium"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

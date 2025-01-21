import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BookingType } from "@/types";
import { useLocale } from "next-intl";
import { submit_new_booking } from "@/services/submit_new_booking";
import Payment from "@/models/Payment";
import { connection } from "@/config/db";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function PaymentWrapper({
  bookingData,
  showAlert,
  setErrorDetails,
}: {
  bookingData: BookingType;
  showAlert: (arg: string) => void;
  setErrorDetails: Dispatch<SetStateAction<string>>;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const locale = useLocale();
  const secretPaymentHandler = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bookingData.totalPaid! }),
      });
      if (!response) {
        throw new Error(
          `something went wrong with secretPaymentHandler ${JSON.stringify(response)}`
        );
      }
      const secret = await response.json();
      if (!secret.message) {
        throw new Error(
          `something went wrong with secretPaymentHandler ${JSON.stringify(secret.message)}`
        );
      }
      setClientSecret(secret.message);
    } catch (err) {
      console.error("Error fetching payment secret:", err);
    }
  };

  useEffect(() => {
    secretPaymentHandler();
    // eslint-disable-next-line
  }, [bookingData.totalPaid]);

  return (
    clientSecret && (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: clientSecret!,

          appearance: {
            theme: "night",
          },

          locale: locale as StripeElementLocale,
        }}
      >
        <PaymentForm
          setErrorDetails={setErrorDetails}
          bookingData={bookingData}
          showAlert={showAlert}
        />
      </Elements>
    )
  );
}

function PaymentForm({
  bookingData,
  setErrorDetails,
  showAlert,
}: {
  bookingData: BookingType;
  setErrorDetails: Dispatch<SetStateAction<string>>;
  showAlert: (arg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookingSubmission = async () => {
    try {
      const response = await submit_new_booking(bookingData); // Your booking submission logic

      if (!response.error) {
        showAlert("Booking successful!");
        return true;
      } else {
        setErrorDetails(response.errorDetails || "Booking failed.");
        showAlert("There was an issue with your booking.");
        return false;
      }
    } catch (error) {
      console.error("Error during booking submission:", error);
      setErrorDetails("An unexpected error occurred.");
      showAlert("Booking failed.");
      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const booked = await handleBookingSubmission();
    if (!booked) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: bookingData.bookerEmail, // Optional: Email for payment receipt ?
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "not error set");
      setIsProcessing(false);
    }
    await connection();
    const registerNewPayment = new Payment({
      bookingId: bookingData.uuid!,
      paymentDate: bookingData.totalPaid!,
      status: error ? "failed" : "completed",
    });
    await registerNewPayment.save();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center text-gray-200 text-lg font-semibold">
        Amount to Pay:{" "}
        <span className="text-green-400">
          €{bookingData.totalPaid!.toFixed(2)}
        </span>
      </div>

      {/* Stripe Payment Element */}
      <PaymentElement />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full font-bold bg-green-500 text-gray-200 px-4 py-2 rounded mt-4"
      >
        {isProcessing
          ? "Processing..."
          : `Pay  €${bookingData.totalPaid!.toFixed(2)}`}
      </button>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
}

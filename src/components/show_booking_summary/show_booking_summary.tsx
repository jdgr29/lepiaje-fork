"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Badge } from "lucide-react";
import Logo from "@/components/logo/logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useSuccessAlert } from "@/hooks/use_alert";
import { Alert } from "../alerts/alerts";
import { BookingType } from "@/types";
import { PaymentWrapper } from "../stripe/checkout_form";

interface BookingSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingType;
}

export default function BookingSummaryModal({
  isOpen,
  onClose,
  bookingData,
}: BookingSummaryProps) {
  const { isVisible, message, showAlert, hideAlert } = useSuccessAlert();
  const [errorDetails, setErrorDetails] = useState("");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          hideAlert();
          onClose();
        }
      }}
    >
      <DialogDescription hidden>
        Booking summary and payment form
      </DialogDescription>
      <DialogContent className="my-4 bg-slate-950 py-8  w-[90%] h-screen overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-gray-400 text-center">
            Booking Confirmation
          </DialogTitle>
        </DialogHeader>

        <Card className="w-full bg-slate-950">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <Logo width="w-[8em]" height="h-[8em]" blur="blur-lg" />

              <div>
                <h3 className="text-gray-200 text-center font-semibold text-lg mb-2">
                  {bookingData.propertyName}
                </h3>
                <div>
                  <label className="text-gray-200 font-bold text-xl">
                    Booker:
                  </label>
                  <h3 className="text-gray-200 font-semibold text-lg mb-2">
                    {bookingData.bookerName}
                  </h3>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold text-lg mb-2">
                    Dates
                  </h3>
                  <p className="text-gray-200">
                    Check-in:{" "}
                    {bookingData.checkIn &&
                      format(new Date(bookingData.checkIn), "MMMM d, yyyy")}
                  </p>
                  <p className="text-gray-200">
                    Check-out:{" "}
                    {bookingData.checkOut &&
                      format(new Date(bookingData.checkOut), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold text-lg mb-2">
                    Guests
                  </h3>
                  <p className="text-gray-200 font-thin text-md">
                    {bookingData.numberOfGuests} Guests
                  </p>
                  {bookingData.guests.map((guest, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-start"
                    >
                      <Badge className="mr-2 text-green-600"></Badge>
                      <p className="text-gray-200">{guest.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-gray-200 text-center font-semibold text-lg mb-4">
                  Complete Your Payment
                </h3>
                <PaymentWrapper
                  setErrorDetails={setErrorDetails}
                  showAlert={showAlert}
                  bookingData={bookingData}
                />
              </div>

              {isVisible && (
                <Alert
                  message={message}
                  isVisible={isVisible}
                  onClose={hideAlert}
                  success={message.includes("successful")}
                />
              )}
              {errorDetails && (
                <p className="text-red-500 mt-2">{errorDetails}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React from "react";
import { format } from "date-fns";
import { Badge } from "lucide-react";
import Logo from "@/components/logo/logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { submit_new_booking } from "@/services/submit_new_booking";

interface BookingSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    propertyName: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    numberOfGuests: number;
    totalPaid?: number;
    guests: string[];
    guestEmail?: string;
    guestPhone?: string;
  };
}

export default function BookingSummaryModal({
  isOpen,
  onClose,
  bookingData,
}: BookingSummaryProps) {
  const handleCheckout = async () => {
    try {
      const w = await submit_new_booking(bookingData);
      if (w) {
        alert("New booking submitted");
      }
    } catch (err) {
      console.log("error submitting", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="my-4 bg-slate-950 py-8 h-screen overflow-scroll">
        <DialogHeader>
          <DialogTitle>Booking Confirmation</DialogTitle>
        </DialogHeader>
        <Card className="w-full bg-slate-950">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <Logo width="w-[8em]" height="h-[8em]" blur="blur-lg" />
              <div>
                <h3 className="text-gray-200 text-center font-semibold text-lg mb-2">
                  {bookingData.propertyName}
                </h3>
              </div>
              <div>
                <h3 className="text-gray-200 font-semibold text-lg mb-2">
                  Dates
                </h3>
                <p className="text-gray-200">
                  Check-in:{" "}
                  {bookingData.checkIn &&
                    format(new Date(bookingData?.checkIn), "MMMM d, yyyy")}
                </p>
                {bookingData.checkOut && (
                  <p className="text-gray-200">
                    Check-out:{" "}
                    {bookingData.checkOut &&
                      format(
                        new Date(bookingData?.checkOut) || "",
                        "MMMM d, yyyy"
                      )}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-gray-200 font-semibold text-lg mb-2">
                  Guests
                </h3>
                <p className="text-gray-200 font-thin text-md">
                  {bookingData.numberOfGuests} Guests
                </p>
                <div className="mt-2">
                  {bookingData.guests.map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-start"
                    >
                      <Badge className="mr-2 text-green-600"></Badge>
                      <p className="text-gray-200">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-gray-200 font-semibold text-lg mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-200">Email: {bookingData.guestEmail}</p>
                {bookingData.guestPhone && (
                  <p className="text-gray-200">
                    Phone: {bookingData.guestPhone}
                  </p>
                )}
              </div>
              <div className="border-t pt-4">
                <h3 className="text-gray-200 font-semibold text-lg mb-2">
                  Payment
                </h3>
                <div className="flex items-center justify-start gap-x-4">
                  <p className=" text-gray-200 text-2xl font-bold">Total: </p>
                  <p className="text-green-600">
                    {" "}
                    ${bookingData?.totalPaid?.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                onClick={async () => await handleCheckout()}
                className="w-full bg-green-600"
              >
                CHECK OUT
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { PriceDetails } from "@/types";

export function PriceBreakdown({
  priceDetails,
  pricePerNight,
  pricePerGuest,
}: {
  priceDetails: PriceDetails | null;
  pricePerNight: number;
  pricePerGuest: number;
}) {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-slate-900 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-200 mb-4">Price Breakdown</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-gray-200">Nights:</span>
          <span className="text-gray-200">{priceDetails?.nights || "0"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-200">Price per Night:</span>
          <span className="text-gray-200">${pricePerNight.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-200">
            Price per additional guest:
          </span>
          <span className="text-gray-200">${pricePerGuest.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-200">Total Guests:</span>
          <span className="text-gray-800">{priceDetails?.totalGuests}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold text-gray-200">Total Price:</span>
          <span className="text-green-600 font-bold">
            $
            {priceDetails?.totalPrice
              ? priceDetails?.totalPrice.toFixed(2)
              : pricePerNight}
          </span>
        </div>
      </div>
    </div>
  );
}

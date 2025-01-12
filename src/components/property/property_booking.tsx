"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GuestList from "./property_guest_list";
import { format, addDays } from "date-fns"; // Import addDays
import { useLocale } from "next-intl";
import { it, enUS } from "react-day-picker/locale";
import { BookingType } from "@/types";
import { calculate_price } from "@/utils/calculate_price";
import BookingSummaryModal from "../show_booking_summary/show_booking_summary";
import { PriceDetails } from "@/types";
import { PriceBreakdown } from "./price_breakdown";

export function PropertyBooking({
  price,
  airbnb,
  booking,
  propertyName,
}: {
  price: number;
  airbnb?: string;
  booking?: string;
  propertyName: string;
}) {
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(),
  });
  const [hasOverlap, setHasOverlap] = useState<boolean>(false);
  const [guestList, setGuestList] = useState<string[]>([]);
  const locale = useLocale();
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [priceDetails, setPriceDetails] = useState<null | PriceDetails>(null);

  const pricePerNight: number = 30;
  const pricePerAdditionalGuest: number = 30;

  // Enforce 1-day check-out logic if necessary maybe?
  useEffect(() => {
    if (dates?.from && (!dates.to || dates.to <= dates.from)) {
      setDates((prev) => {
        const from = prev?.from ?? new Date();
        return {
          from,
          to: addDays(from, 1),
        };
      });
    }
  }, [dates]);

  // Recalculate price details whenever dates or guests change
  useEffect(() => {
    const pricing = calculate_price(
      dates,
      pricePerNight,
      pricePerAdditionalGuest,
      guestList.length
    );
    setPriceDetails(pricing);
  }, [dates, guestList]);

  const bookingData: BookingType = {
    propertyName,
    checkIn: dates?.from,
    checkOut: dates?.to,
    guests: guestList,
    numberOfGuests: guestList.length,
    totalPaid: priceDetails?.totalPrice,
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl text-gray-200 font-bold mb-4">
        ${price} / night
      </h2>
      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dates && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dates?.from ? (
                dates.to ? (
                  <>
                    {format(dates.from, "LLL dd, y")} -{" "}
                    {format(dates.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dates.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto flex items-center justify-center p-0"
            align="start"
          >
            <Calendar
              locale={locale === "it" ? it : enUS}
              autoFocus
              mode="range"
              defaultMonth={dates?.from}
              selected={dates}
              onSelect={setDates}
              numberOfMonths={2}
              range_of_dates_selected={dates}
              setHasOverlap={setHasOverlap}
            />
          </PopoverContent>
        </Popover>
        <GuestList guestList={guestList} setGuestList={setGuestList} />
        <PriceBreakdown
          priceDetails={priceDetails}
          pricePerGuest={pricePerAdditionalGuest}
          pricePerNight={pricePerNight}
        />
        <Button
          onClick={() => setShowSummary(true)}
          disabled={
            hasOverlap ||
            !dates?.to ||
            guestList.length === 0 ||
            guestList[0] === ""
          }
          className={`w-full ${hasOverlap ? "text-white bg-red-500" : " hover:text-slate-950 bg-green-600 hover:bg-green-300"}`}
        >
          {hasOverlap ? "You can't book these dates" : "Book now"}
        </Button>

        {hasOverlap && (
          <p className="text-red-600 ">
            Selected dates are not available or overlap with non available dates
          </p>
        )}
        <div>
          {airbnb && (
            <Link target={"_blank"} href={airbnb}>
              <p className="text-sm text-gray-600 hover:text-[#FF5A5F]">
                Book with Airbnb
              </p>
            </Link>
          )}
          {booking && (
            <Link target={"_blank"} href={booking}>
              <p className="text-sm text-gray-600 hover:text-blue-500">
                Book with Booking.com
              </p>
            </Link>
          )}
        </div>
      </div>
      <BookingSummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        bookingData={bookingData}
      />
    </div>
  );
}

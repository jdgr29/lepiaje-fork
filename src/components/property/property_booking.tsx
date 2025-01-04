"use client";
import Link from "next/link";
import { useState } from "react";
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
import { format } from "date-fns";

export function PropertyBooking({
  price,
  airbnb,
  booking,
}: {
  price: number;
  airbnb?: string;
  booking?: string;
}) {
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(Date.now()),
  });

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
              initialFocus
              mode="range"
              defaultMonth={dates?.from}
              selected={dates}
              onSelect={setDates}
              numberOfMonths={2}
              range_of_dates_selected={dates}
            />
          </PopoverContent>
        </Popover>
        <GuestList />
        <Button className="w-full text-white transition-all ease-linear hover:text-slate-950 bg-green-600 hover:bg-green-300">
          Book now
        </Button>
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
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { get_calendar_availability } from "@/services/get_calendar_availability";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type CalendarPropsCustomized = CalendarProps & {
  range_of_dates_selected: DateRange | undefined;
};

function Calendar({
  className,
  classNames,
  range_of_dates_selected,
  showOutsideDays = true,
  ...props
}: CalendarPropsCustomized) {
  const [blockedDates, setBlockedDates] = useState<
    { from: string; to: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [hasOverlap, setHasOverlap] = useState(false); // New state for overlap check

  useEffect(() => {
    const fetchAvailability = async () => {
      const availableDates = await get_calendar_availability();
      setBlockedDates(availableDates);
    };

    fetchAvailability();

    const test = async () => {
      const w = await mongoose.connect(
        "mongodb+srv://juan:juan1234@cluster0.sz3js.mongodb.net/dbtest?retryWrites=true&w=majority"
      );
      console.log("testing this thaaaang", w);
    };
    test();
  }, []);

  console.log("has overlap", hasOverlap);

  useEffect(() => {
    if (range_of_dates_selected) {
      const isOverlapping = checkOverlap(range_of_dates_selected, blockedDates);
      setHasOverlap(isOverlapping); // Update overlap state
      if (isOverlapping) {
        setError("Selected dates overlap with blocked dates!");
      } else {
        setError(null);
      }
    } else {
      setHasOverlap(false); // Reset overlap state if no range is selected
    }
  }, [range_of_dates_selected, blockedDates]);

  const checkOverlap = (
    selectedRange: DateRange,
    blocked: { from: string; to: string }[]
  ) => {
    const selectedStart = new Date(selectedRange.from!);
    const selectedEnd = new Date(selectedRange.to!);

    return blocked.some(({ from, to }) => {
      const blockedStart = new Date(from);
      const blockedEnd = new Date(to);

      return (
        (selectedStart >= blockedStart && selectedStart <= blockedEnd) || // Overlaps at the start
        (selectedEnd >= blockedStart && selectedEnd <= blockedEnd) || // Overlaps at the end
        (selectedStart <= blockedStart && selectedEnd >= blockedEnd) // Fully encompasses the blocked range
      );
    });
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-center py-2 px-1 text-sm">
          {error}
        </div>
      )}
      <DayPicker
        disabled={blockedDates.map((value) => ({
          from: new Date(value.from),
          to: new Date(value.to),
        }))}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            props.mode === "range"
              ? "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:bg-accent"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        {...props}
      />
      <div className="mt-4 text-center">
        {hasOverlap ? (
          <span className="text-red-500">Overlap detected!</span>
        ) : (
          <span className="text-green-500">No overlap.</span>
        )}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

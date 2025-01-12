"use client";
import React, { useState, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
import { Dispatch, SetStateAction } from "react";

type CalendarPropsCustomized = CalendarProps & {
  range_of_dates_selected: DateRange | undefined;
  setHasOverlap: Dispatch<SetStateAction<boolean>>;
};

function Calendar({
  className,
  classNames,
  range_of_dates_selected,
  showOutsideDays = true,
  setHasOverlap,
  ...props
}: CalendarPropsCustomized) {
  const [error, setError] = useState<string | null>(null);
  const [blockedDates, setBlockedDates] = useState<
    { from: string; to: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // const ws = new WebSocket("ws://0.0.0.0:8000/");
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER!);

    ws.onopen = () => {
      console.log("the webscoket is connected");
    };
    ws.onmessage = (event) => {
      setBlockedDates(JSON.parse(event.data));
      setLoading(false);
    };
    ws.onclose = () => {
      console.log("Websocket connection closed");
      setLoading(true);
    };

    ws.onerror = (error) => {
      console.log("Websocket error:", error);
    };

    return () => {
      setLoading(true);
      // ws?.close();
    };
  }, []);

  //TODO decide when to close websocket connection
  useEffect(() => {
    if (range_of_dates_selected) {
      // Adjust the "to" date to the next day if "from" and "to" are the same
      const { from, to } = range_of_dates_selected;
      const adjustedRange =
        from && to && from.getTime() === to.getTime()
          ? { from, to: new Date(to.getTime() + 24 * 60 * 60 * 1000) } // Add 1 day to "to"
          : range_of_dates_selected;

      const isOverLapping = checkOverlap(adjustedRange, blockedDates);
      setHasOverlap(isOverLapping);

      if (isOverLapping) {
        setError("Selected dates are not available!");
      } else {
        setError(null);
      }
    } else {
      setHasOverlap(false); // Reset overlap state if no range is selected
    }
  }, [range_of_dates_selected, blockedDates, setHasOverlap]);

  const checkOverlap = (
    selectedRange: DateRange,
    blocked: { from: string; to: string }[]
  ) => {
    const selectedStart = new Date(selectedRange.from!);
    const selectedEnd = new Date(selectedRange.to!);

    return blocked.some(({ from, to }) => {
      const blockedStart = new Date(from);
      const blockedEnd = new Date(to);

      // Add one day to the blockedEnd to represent checkout
      const adjustedBlockedEnd = new Date(blockedEnd);
      adjustedBlockedEnd.setDate(blockedEnd.getDate() + 1);

      return (
        (selectedStart >= blockedStart && selectedStart < adjustedBlockedEnd) || // Overlaps at the start
        (selectedEnd > blockedStart && selectedEnd <= adjustedBlockedEnd) || // Overlaps at the end
        (selectedStart <= blockedStart && selectedEnd >= adjustedBlockedEnd) || // Fully encompasses the blocked range
        (selectedStart.getTime() === blockedStart.getTime() && // Single night check (start equals blocked)
          selectedEnd.getTime() === adjustedBlockedEnd.getTime()) // Single night check (end equals adjusted blocked end)
      );
    });
  };
  //TODO when to consider a day blocked? when is it time to check-in or check-out

  return (
    <div>
      {error && (
        <div className="text-red-500 text-center py-2 px-1 text-sm">
          {error}
        </div>
      )}
      <DayPicker
        disabled={
          loading
            ? true
            : [
                { before: new Date(Date.now()) },
                ...blockedDates.map((value) => ({
                  from: new Date(value.from),
                  to: new Date(
                    new Date(value.to).setDate(new Date(value.to).getDate() + 1)
                  ), // Adjust checkout date
                })),
              ]
        }
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          ...classNames,
          today: "font-bold text-lg text-lepiajeBrown",
        }}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

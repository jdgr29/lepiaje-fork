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
    // const ws = new WebSocket("ws:localhost:8000");
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER!);

    ws.onopen = (event) => {
      console.log("the webscoket is connected", event);
    };
    ws.onmessage = (event) => {
      setBlockedDates(JSON.parse(event.data));
      setLoading(false);
    };
    ws.onclose = () => {
      console.log("Websocket connection closed");
    };

    ws.onerror = (error) => {
      console.log("Websocket error:", error);
    };

    return () => {
      ws?.close();
    };
  }, []);

  //TODO decide when to close websocket connection
  useEffect(() => {
    if (range_of_dates_selected) {
      const isOverLapping = checkOverlap(range_of_dates_selected, blockedDates);
      setHasOverlap(isOverLapping); // Update overlap state
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
        disabled={
          loading
            ? true
            : [
                { before: new Date(Date.now()) },
                ...blockedDates.map((value) => ({
                  from: new Date(value.from),
                  to: new Date(value.to),
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

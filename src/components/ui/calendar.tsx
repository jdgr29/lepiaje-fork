"use client";
import React, { useState, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
import { Dispatch, SetStateAction } from "react";

type CalendarPropsCustomized = CalendarProps & {
  range_of_dates_selected: DateRange | undefined;
  setHasOverlap: Dispatch<SetStateAction<boolean>>;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
};

function Calendar({
  className,
  classNames,
  range_of_dates_selected,
  showOutsideDays = true,
  setHasOverlap,
  setSocket,
  ...props
}: CalendarPropsCustomized) {
  const [error, setError] = useState<string | null>(null);
  const [blockedDates, setBlockedDates] = useState<
    { from: string; to: string }[]
  >([]);
  useEffect(() => {
    // const ws = new WebSocket("ws:localhost:8000");
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER!);

    ws.onopen = (event) => {
      console.log("the webscoket is connected", "event", event);
    };
    ws.onmessage = (event) => {
      console.log("event.data", event.data);
      setBlockedDates(JSON.parse(event.data));
    };
    ws.onclose = () => {
      console.log("Websocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("Websocket error:", error);
    };

    setSocket(ws);
  }, []);
  useEffect(() => {
    if (range_of_dates_selected) {
      const isOverLapping = checkOverlap(range_of_dates_selected, blockedDates);
      setHasOverlap(isOverLapping); // Update overlap state
      if (isOverLapping) {
        setError("Selected dates overlap with blocked dates!");
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
        disabled={[
          { before: new Date(Date.now()) },
          ...blockedDates.map((value) => ({
            from: new Date(value.from),
            to: new Date(value.to),
          })),
        ]}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

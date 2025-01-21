"use client";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GuestList from "./property_guest_list";
import { format, addDays } from "date-fns";
import { useLocale } from "next-intl";
import { it, enUS } from "react-day-picker/locale";
import { BookingType } from "@/types";
import { calculate_price } from "@/utils/calculate_price";
import BookingSummaryModal from "../show_booking_summary/show_booking_summary";
import { PriceDetails } from "@/types";
import { PriceBreakdown } from "./price_breakdown";
import { DateRange } from "react-day-picker";

interface Range {
  from: string | null | Date;
  to: string | null | Date;
}
interface Occupant {
  check_in: string;
  check_out: string;
  occupants: Occupant[];
}

interface Room {
  check_in?: string | null;
  check_out?: string | null;
  occupants: Occupant[];
}

interface BedsFromWebSocket {
  // eslint-disable-next-line
  male_rooms?: { roomUuid: string; occupants: any[] }[];
  // eslint-disable-next-line
  female_rooms?: { roomUuid: string; occupants: any[] }[];
  // eslint-disable-next-line
  mixed_rooms?: { roomUuid: string; occupants: any[] }[];
}
interface PropertyBookingProps {
  price: number;
  airbnb?: string;
  propertyId: number;
  propertyName: string;
  booking?: string;
  isLaVillaPerlata?: boolean;
}
const validationSchema = Yup.object().shape({
  bookerName: Yup.string().required("Booker name is required"),
  bookerEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  bookerPhone: Yup.string().optional(),
  bookerGender: Yup.string().required("Gender is necessary"),
});

export function PropertyBooking({
  price,
  airbnb,
  propertyId,
  propertyName,
  booking,
  isLaVillaPerlata,
}: PropertyBookingProps) {
  const [dates, setDates] = useState<Range | null>({
    from: new Date(),
    to: null,
  });
  const [hasOverlap, setHasOverlap] = useState<boolean>(false);
  const [guestList, setGuestList] = useState<
    { name: string; gender: string }[]
  >([]);
  const [bookerEmail, setBookerEmail] = useState<string>("");
  const [bookerPhone, setBookerPhone] = useState<string>("");
  const [bookerName, setBookerName] = useState<string>("");
  const [bookerGender, setBookerGender] = useState<string>("");
  const locale = useLocale();
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [priceDetails, setPriceDetails] = useState<null | PriceDetails>(null);
  const pricePerNight: number = 30;
  const pricePerAdditionalGuest: number = 6;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unAvailableDates, setUnAvailableDates] = useState<Range[]>([]);
  const [availableMaleBeds, setAvailableMaleBeds] = useState(0);
  const [availableFemaleBeds, setAvailableFemaleBeds] = useState(0);
  const [availableMixedBeds, setAvailableMixedBeds] = useState(0);
  const [beds, setBeds] = useState<BedsFromWebSocket | null>(null);

  function isOverlapping(
    dateRanges: Range[],
    targetRange: Range | null
  ): boolean {
    if (
      !dateRanges ||
      !targetRange?.from ||
      !targetRange.to ||
      !dateRanges?.length
    ) {
      console.log(
        "the date ranges and target ranges are null or undefined and must be checked"
      );
      return false;
    }
    const targetFrom = new Date(targetRange.from).getTime();
    const targetTo = new Date(targetRange.to).getTime();

    for (const range of dateRanges) {
      const rangeFrom = new Date(range.from!).getTime();
      const rangeTo = new Date(range.to!).getTime();

      if (
        (rangeFrom <= targetTo && rangeFrom >= targetFrom) ||
        (rangeTo <= targetTo && rangeTo >= targetFrom) ||
        (rangeFrom <= targetFrom && rangeTo >= targetTo)
      ) {
        return true;
      }
    }

    return false;
  }

  //TODO check why in front is not updating in real time  and email sending fail when it is la villa perlata tho is fixed kinda
  useEffect(() => {
    let ws: WebSocket | undefined;

    const connectWebSocket = () => {
      const propertyId = isLaVillaPerlata ? 1 : 2;

      ws = new WebSocket(`ws://localhost:8000/?propertyId=${propertyId}`);

      ws.onopen = () => {
        console.log("WebSocket connected.");
        ws?.send(
          JSON.stringify({
            propertyId,
            getBothAvailabilities: propertyId === 2, // Fetch both male and female only for propertyId === 2
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          console.log("changed detected");
          const data = JSON.parse(event.data);

          if (!data || typeof data !== "object") {
            console.error(
              "Unexpected data structure received from WebSocket:",
              data
            );
            return;
          }
          if (propertyId === 1) {
            setBeds({
              mixed_rooms: data.mixed_rooms || [],
            });
          } else if (propertyId === 2) {
            setBeds({
              male_rooms: data.male_rooms || [],
              female_rooms: data.female_rooms || [],
            });
          }

          setLoading(false);
        } catch (error) {
          console.error("Error parsing WebSocket data:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
        setLoading(true);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isLaVillaPerlata]);

  const countAvailableBeds = (
    // eslint-disable-next-line
    rooms: any[],
    fromDate: Date,
    toDate: Date
  ): { isFull: boolean; availableBedsToBook: number } => {
    const totalBeds = rooms.length;
    let occupied = 0;
    rooms.forEach((room) => {
      // eslint-disable-next-line
      const occupiedBeds = room.occupants.filter((occupant: any) => {
        const checkIn = new Date(occupant.check_in);
        const checkOut = new Date(occupant.check_out);
        return fromDate < checkOut && toDate > checkIn; // Overlapping dates
      }).length;
      occupied = occupied + occupiedBeds;
    });

    return {
      isFull: occupied === totalBeds,
      availableBedsToBook: totalBeds - occupied,
    };
  };

  function findCommonDateRanges(data: Room[]): Range[] {
    const normalizeDate = (date: string) => date.split("T")[0];

    const uniqueDateRanges = new Set<string>();
    data.forEach((room) =>
      room.occupants.forEach((occupant) => {
        const normalizedRange = `${normalizeDate(occupant.check_in)}|${normalizeDate(occupant.check_out)}`;
        uniqueDateRanges.add(normalizedRange);
      })
    );

    const dateRanges = Array.from(uniqueDateRanges).map((range) => {
      const [from, to] = range.split("|");
      return { from, to };
    });

    const commonDateRanges = dateRanges.filter(({ from, to }) =>
      data.every((room) =>
        room.occupants.some(
          (occupant) =>
            normalizeDate(occupant.check_in) === from &&
            normalizeDate(occupant.check_out) === to
        )
      )
    );

    return commonDateRanges;
  }

  const processAvailabilityData = () => {
    if (!dates?.from || !dates?.to) {
      console.log(
        "it is necessary to send the from and to dates to the processAvailabilityData function"
      );
      return;
    }

    const mixedRooms = beds?.mixed_rooms || [];
    const unavailableDates: Range[] = [];
    let mixedAvailableBeds = 0;

    if (propertyId === 1) {
      // Process only mixed_rooms for propertyId === 1
      const { isFull, availableBedsToBook } = countAvailableBeds(
        mixedRooms,
        dates?.from as Date,
        dates?.to as Date
      );

      mixedAvailableBeds = availableBedsToBook;

      if (isFull) {
        unavailableDates.push({ from: dates?.from, to: dates?.to });
      }
    }

    setAvailableMixedBeds(mixedAvailableBeds);

    if (propertyId === 2) {
      const maleRooms = beds?.male_rooms || [];
      const femaleRooms = beds?.female_rooms || [];

      const { isFull: isMaleFull, availableBedsToBook: availabilityMale } =
        countAvailableBeds(maleRooms, dates?.from as Date, dates?.to as Date);
      const { isFull: isFemaleFull, availableBedsToBook: availabilityFemale } =
        countAvailableBeds(femaleRooms, dates?.from as Date, dates?.to as Date);

      if (isMaleFull && isFemaleFull) {
        unavailableDates.push({ from: dates?.from, to: dates?.to });
      }

      setAvailableMaleBeds(availabilityMale);
      setAvailableFemaleBeds(availabilityFemale);
    }

    setUnAvailableDates(unavailableDates);
  };

  useEffect(() => {
    if (beds) {
      processAvailabilityData();
    }
    // eslint-disable-next-line
  }, [dates, beds]);

  useEffect(() => {
    if (unAvailableDates.length !== 0 && dates?.to && dates?.from) {
      const overlap = isOverlapping(unAvailableDates, dates);

      setHasOverlap(overlap);
      if (overlap) setError("The selected dates are not available");
      if (!overlap) {
        setError(null);
      }
    }
    if (dates?.from && (!dates.to || dates.to <= dates.from)) {
      setDates((prev) => {
        const from = prev?.from ?? new Date();
        return {
          from,
          to: addDays(from, 1),
        };
      });
    }
    // eslint-disable-next-line
  }, [beds, dates, dates?.from, dates?.to, unAvailableDates.length]);

  useEffect(() => {
    const pricing = calculate_price(
      dates,
      pricePerNight,
      pricePerAdditionalGuest,
      guestList.length + 1
    );
    setPriceDetails(pricing);
  }, [dates, guestList]);

  const bookingData: BookingType = {
    propertyId,
    propertyName,
    checkIn: (dates?.from as Date) || undefined,
    checkOut: (dates?.to as Date) || undefined,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    guests: guestList.map((guest) => {
      return {
        name: guest.name,
        gender: guest.gender,
        check_in: (dates?.from as Date) || undefined,
        check_out: (dates?.to as Date) || undefined,
      };
    }),
    numberOfGuests: guestList.length + 1, //TODO check if it is better to add it here or dynamically on email and booking schema
    totalPaid: priceDetails?.totalPrice || 0,
    bookerEmail,
    bookerPhone,
    bookerName,
    bookerGender,
  };

  useEffect(() => {
    if (beds) {
      processAvailabilityData();

      if (propertyId === 1) {
        const datesToBlock = findCommonDateRanges(beds?.mixed_rooms || []);
        setUnAvailableDates(datesToBlock);
      } else if (propertyId === 2) {
        const datesToBlock = findCommonDateRanges([
          ...beds.female_rooms!,
          ...beds.male_rooms!,
        ]);
        setUnAvailableDates(datesToBlock);
      }
    }
    // eslint-disable-next-line
  }, [dates, beds, propertyId]);

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
                <span>Pick dates</span>
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
              defaultMonth={(dates?.from as Date) || undefined}
              selected={{
                from: (dates?.from as Date) || undefined,
                to: (dates?.to as Date) || undefined,
              }}
              onSelect={
                setDates as Dispatch<SetStateAction<DateRange | undefined>>
              }
              numberOfMonths={2}
              loading={loading}
              datesBlocked={unAvailableDates}
            />
          </PopoverContent>
        </Popover>

        <div className="border rounded-lg p-6">
          <Formik
            initialValues={{
              bookerName: "",
              bookerEmail: "",
              bookerPhone: "",
              bookerGender: "",
            }}
            validationSchema={validationSchema}
            // eslint-disable-next-line
            onSubmit={(values) => {}}
          >
            {({ values, handleChange, handleBlur }) => {
              // eslint-disable-next-line
              useEffect(() => {
                setBookerEmail(values.bookerEmail);
                setBookerPhone(values.bookerPhone);
                setBookerName(values.bookerName);
                setBookerGender(values.bookerGender);
              }, [values]);

              return (
                <Form>
                  <div>
                    <div>
                      <p className="text-lg font-bold text-gray-400">
                        Availability
                      </p>
                      {!isLaVillaPerlata ? (
                        <>
                          <div>
                            <p className="text-blue-500 text-md">
                              Male beds available {availableMaleBeds ?? "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-pink-400 text-md">
                              Female beds available{" "}
                              {availableFemaleBeds ?? "N/A"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p className="text-gray-300 text-md">
                            {" "}
                            max occupancy: {availableMixedBeds ?? "N/A"}
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 my-2 text-2xl font-semibold">
                      Who is Checking in?
                    </p>

                    <label className="block text-gray-400 text-sm font-medium">
                      Your Name:
                    </label>
                    <div className="flex  gap-x-2">
                      <Field
                        type="text"
                        name="bookerName"
                        onBlur={handleBlur}
                        value={values.bookerName}
                        onChange={handleChange}
                        className="w-[80%] border rounded p-2 text-gray-700"
                      />

                      <select
                        name="bookerGender"
                        onBlur={handleBlur}
                        value={values.bookerGender || ""}
                        onChange={handleChange}
                        className={`border w-[6em] rounded border-1 p-2 text-gray-700 ${bookerGender ? "border-none" : "border-red-400"}`}
                        required
                      >
                        <option value="" disabled>
                          Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <ErrorMessage
                      name="bookerName"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                    <ErrorMessage
                      name="bookerGender"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <div className="my-2 flex items-center justify-between gap-x-2">
                      <label className="block text-gray-400 text-sm font-medium">
                        Your Email:
                      </label>
                      <label className="text-sm text-red-500">*required</label>
                    </div>
                    <Field
                      type="email"
                      name="bookerEmail"
                      value={values.bookerEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full border rounded p-2 text-gray-700"
                    />
                    <ErrorMessage
                      name="bookerEmail"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium">
                      Phone (Optional):
                    </label>
                    <Field
                      type="tel"
                      name="bookerPhone"
                      value={values.bookerPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full border rounded p-2 text-gray-700"
                    />
                    <ErrorMessage
                      name="bookerPhone"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <GuestList
          maxGuests={
            isLaVillaPerlata ? 3 : availableFemaleBeds + availableMaleBeds
          }
          guestList={guestList}
          setGuestList={setGuestList}
        />

        <PriceBreakdown
          priceDetails={priceDetails}
          pricePerGuest={pricePerAdditionalGuest}
          pricePerNight={pricePerNight}
        />
        <Button
          onClick={async () => {
            setShowSummary(true);
          }}
          disabled={
            hasOverlap ||
            !dates?.to ||
            !bookerEmail ||
            !bookerGender ||
            (guestList.length !== 0 &&
              guestList.some((guest) => !guest.name || !guest.gender))
          }
          className={`w-full ${
            hasOverlap || error
              ? "text-white bg-red-500"
              : "hover:text-slate-950 bg-green-600 hover:bg-green-300"
          }`}
        >
          {hasOverlap || error
            ? "Selected dates are not availble"
            : "Book now!"}
        </Button>

        {error && <p className="text-red-600">{error}</p>}
        {hasOverlap && (
          <p className="text-red-600">
            Selected dates are not available or overlap with unavailable dates
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

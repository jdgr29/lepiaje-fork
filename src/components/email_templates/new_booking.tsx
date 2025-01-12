import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { BookingType } from "@/types";
import { format } from "date-fns";

function BookingNotificationTemplate({
  bookingData,
}: {
  bookingData: BookingType;
}): React.ReactNode {
  return (
    <Html>
      <Head />
      <Preview>
        `New booking received at
        {bookingData.propertyName || "N/A property name"}`
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg p-8 mx-auto my-8 max-w-xl">
            <Heading className="text-2xl font-bold text-blue-600 mb-4">
              Hello Matteo!
            </Heading>
            <Text className="text-gray-700 mb-4">
              {`A new booking has been received at ${bookingData.propertyName} on ${
                format(new Date(bookingData.dateOfBooking!), "MMMM dd, yyyy") ??
                "N/A date of booking"
              }. Here are the details:`}
            </Text>
            <Section className="bg-gray-50 rounded-lg p-4 mb-4">
              <Text>
                Number of guests:{" "}
                {bookingData.numberOfGuests || "N/A number of guests"}
              </Text>
              <Text className="text-gray-700 mb-2 font-semibold">
                Guest/s Name/s:
              </Text>
              <ul>
                {bookingData.guests.map((guest: string, index: number) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {guest}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center gap-x-2">
                <Text className="font-bold">Check-in:</Text>
                <Text>
                  {format(new Date(bookingData.checkIn!), "MMMM dd, yyyy") ||
                    "N/A check-in"}
                </Text>
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <Text className="font-bold">Check-out:</Text>
                <Text>
                  {format(new Date(bookingData.checkOut!), "MMMM dd, yyyy") ||
                    "N/A check-in"}
                </Text>
              </div>

              <Text className="text-gray-700 mb-2">
                <strong className="font-semibold">Email:</strong>{" "}
                {bookingData.guestEmail || "N/A guest email"}
              </Text>
              {bookingData.guestPhone && (
                <Text className="text-gray-700 mb-2">
                  <strong className="font-semibold">Phone:</strong>{" "}
                  {bookingData.guestPhone || "N/A guest phone"}
                </Text>
              )}
              <Hr className="border-gray-300 my-4" />
              <>
                <Text className="text-gray-700 mb-2">
                  <strong className="font-semibold text-green-500">
                    Total Paid:{" "}
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(bookingData.totalPaid)) ||
                      "N/A total paid"}
                  </strong>
                </Text>
              </>
            </Section>
            <Text className="text-sm text-gray-500 text-center">
              This is an automated notification. Please do not reply to this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default BookingNotificationTemplate;

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

interface AdminNotificationProps {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyName?: string;
  isForm: boolean;
  guests?: string[];
}

function AdminNotificationEmail({
  name,
  email,
  phone,
  message,
  propertyName,
  isForm = false,
  guests,
}: AdminNotificationProps): React.ReactNode {
  return (
    <Html>
      <Head />
      <Preview>
        {isForm
          ? `New form submission from ${name}`
          : `New booking! from ${name}`}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg p-8 mx-auto my-8 max-w-xl">
            <Heading className="text-2xl font-bold text-blue-600 mb-4">
              Hello Matteo!
            </Heading>
            <Text className="text-gray-700 mb-4">
              {isForm
                ? `A new form submission has been received. Here are the details:`
                : `A new booking has been received at ${propertyName}. Here are the details:`}
            </Text>
            <Section className="bg-gray-50 rounded-lg p-4 mb-4">
              <Text className="text-gray-700 mb-2">
                <strong className="font-semibold">Name:</strong> {name}
              </Text>
              <Text className="text-gray-700 mb-2">
                <strong className="font-semibold">Email:</strong> {email}
              </Text>
              {phone && (
                <Text className="text-gray-700 mb-2">
                  <strong className="font-semibold">Phone:</strong>{" "}
                  {phone || "N/A"}
                </Text>
              )}
              <Hr className="border-gray-300 my-4" />
              {message && (
                <>
                  <Text className="text-gray-700 mb-2">
                    <strong className="font-semibold">Message:</strong>
                  </Text>
                  <Text className="text-gray-700 whitespace-pre-wrap">
                    {message}
                  </Text>
                </>
              )}
              {guests?.length !== 0 &&
                guests?.map((name: string, index: number) => (
                  <Text key={index}>
                    <li className="">{name}</li>
                  </Text>
                ))}
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

export default AdminNotificationEmail;

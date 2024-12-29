import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
<<<<<<< HEAD
import WhatsAppAndEmail from "@/components/whatsappEmailButtons/whatsappEmailButtons";
=======
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LocaleSwitcher from "@/components/languageSwitcher/localeSwitcher";

>>>>>>> main
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Le Piaje",
  description: "Azienda Agricola",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<<<<<<< HEAD
        <Navbar />
        {children}
        <Footer />
        <WhatsAppAndEmail />
=======
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <LocaleSwitcher />
          <Footer />
        </NextIntlClientProvider>
>>>>>>> main
      </body>
    </html>
  );
}

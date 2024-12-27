"use client";
import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppAndEmail() {
  //TODO for email better smoothly scroll to the form since is the same thing and mailto: is buggy af
  const phoneNumber = ""; //number to whatsapp  here, no symbols just number. no empty spaces //TODO should come from .env
  const message = "Hello, I liked the Le Piaje website!"; // Pre-filled message but really this is optional
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const scrollToForm = () => {
    const form = document.getElementById("lePiajeForm");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="z-50 fixed bottom-0 right-0 pr-4 pb-4">
      <div className="flex items-center gap-x-4 justify-center">
        <div
          onClick={() => scrollToForm()}
          style={{ borderRadius: "100%" }}
          className="flex p-1 items-center justify-center h-[2em] w-[2em] bg-[#ffff] transition-all ease-linear hover:scale-110 active:scale-90"
        >
          <Mail color="#121212" size={20} />
        </div>
        <div
          style={{ borderRadius: "100%" }}
          className="flex p-1 items-center justify-center h-[2em] w-[2em] bg-[#ffff] transition-all ease-linear hover:scale-110 active:scale-90"
        >
          <Link target="_blank" href={whatsappUrl}>
            <FaWhatsapp color="#25d366" size={21} />
          </Link>
        </div>
      </div>
    </div>
  );
}

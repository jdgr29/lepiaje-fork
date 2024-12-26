import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { GiMountainRoad } from "react-icons/gi";
import Logo from "../logo/logo";
export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div
            style={{ borderRadius: "100%" }}
            className="flex flex-col items-center justify-center w-[5em] space-x-4"
          >
            {true ? (
              <div className="flex flex-col items-center justify-center">
                <GiMountainRoad color="#c39c41" size={55} />
                <p className="text-lepiajeBrown font-thin text-2xl">Le Piaje</p>
              </div>
            ) : (
              <Logo />
            )}
          </div>

          <div className="flex space-x-6">
            <Link
              href="mailto:giulianaclementini.ad@gmail.com"
              className="hover:text-gray-900 transition-colors"
            >
              <Mail color="#f1f1f1" size={21} />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="tel:+393383032673"
              className="hover:text-gray-900 transition-colors"
            >
              <Phone color="#f1f1f1" size={20} />
              <span className="sr-only">Phone</span>
            </Link>
            <Link
              href="#" // TODO: add link when page existing.
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <FaInstagram color="#fd1d1d" size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#" // TODO: add link when page existing.
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <FaFacebookF color="#1877F2" size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex py-4 justify-center items-center ">
        <span className="text-sm text-lepiajeBrown">
          &copy; 2024 Le Piaje. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

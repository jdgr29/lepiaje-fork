"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Logo from "../logo/logo";
import Image from "next/image";
import { GiMountainRoad } from "react-icons/gi";
import formImageBackground from "../../../public/assets/villa_perlata/interno3.jpeg";
import { submitForm } from "@/services/submitForm.services";
import { FormType } from "@/types";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    //TODO add validation to form
    const wao = await submitForm(formData);
    //TODO add a smooth alert
    if (wao) {
      alert("submmited! ✅");
      setFormData((prev) => ({
        ...prev,
        name: "",
        message: "",
        phone: "",
        email: "",
      }));
    }
  };

  useEffect(() => {
    return setFormData((prev) => ({
      ...prev,
      name: "",
      message: "",
      phone: "",
      email: "",
    }));
  }, []);

  return (
    <div className="w-full py-20 h-full max-h-[65em] bg-[#121212] flex  items-center justify-center p-4">
      <div className=" w-full flex md:max-2xl:flex-row flex-col  max-w-4xl h-full bg-white rounded-lg shadow-lepiajeBrown/40 shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="md:max-2xl:w-1/2 w-full relative ">
          <Image
            src={formImageBackground}
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            className="blur-md"
          />
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 p-8 gap-y-8 text-white h-full flex w-full flex-col justify-center">
            <div className="flex flex-col gap-y-2">
              {true ? (
                <div className="flex flex-col items-center justify-center gap-y-8">
                  <div className="flex flex-col items-center justify-center">
                    <GiMountainRoad color="#c39c41" size={55} />
                    <p className="text-lepiajeWhite font-light text-2xl">
                      Le Piaje
                    </p>
                  </div>
                </div>
              ) : (
                <Logo />
              )}
              <p className="text-lepiajeBrown font-light text-2xl text-center">
                We want to hear from you
              </p>
            </div>
            <div>
              <h2 className="text-xl font-light mb-4 text-lepiajeBrown">
                Contact Us
              </h2>
              <p className="text-sm text-lepiajeWhite">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris. Vivamus hendrerit arcu sed erat molestie
                vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                porttitor.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        {/* //TODO limit characters of message, add regular expression to make sure the email is valid */}
        <div className="md:max-2xl:w-1/2 w-full p-8">
          <form className="space-y-4 my-4">
            <div>
              <Label className="text-lepiajeWhite" htmlFor="name">
                Full Name
              </Label>
              <Input
                onChange={handleInputChange}
                value={formData.name}
                id="fullName"
                placeholder="Mario Rossi"
                name="name"
              />
            </div>
            <div>
              <Label className="text-lepiajeWhite" htmlFor="email">
                Email
              </Label>
              <Input
                onChange={handleInputChange}
                value={formData.email}
                id="email"
                type="email"
                name="email"
                placeholder="mario@gmail.com"
              />
            </div>
            <div>
              <Label className="text-lepiajeWhite" htmlFor="phone">
                Phone
              </Label>
              <Input
                onChange={handleInputChange}
                value={formData.phone}
                id="phone"
                type="tel"
                placeholder="+393381234567"
                name="phone"
              />
            </div>
            <div>
              <Label className="text-lepiajeWhite" htmlFor="message">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Your message here..."
                className="h-32"
                onChange={handleInputChange}
                value={formData.message}
                name="message"
              />
            </div>

            <Button
              onClick={async () => await handleSubmit()}
              type="button"
              className="w-full bg-lepiajeBrown"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

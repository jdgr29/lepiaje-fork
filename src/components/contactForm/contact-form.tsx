"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Logo from "../logo/logo";
import Image from "next/image";
import formImageBackground from "../../../public/assets/villa_perlata/interno3.jpeg";
import { submitForm } from "@/services/submitForm.services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSuccessAlert } from "@/hooks/use.alert";
import { Alert } from "../alerts/alerst";

const validationSchema = Yup.object({
  name: Yup.string().required("full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("The email is required"),
  phone: Yup.string().matches(
    /^[+]?[0-9]{1,4}[ ]?[(]?[0-9]{1,4}[)]?[ ]?[0-9]{1,4}[ ]?[-]?[0-9]{1,4}$/,
    "Phone number is not valid"
  ),
  message: Yup.string()
    .max(500, "The message cannot exceed 500 characters")
    .required("A message is required"), //Adjust the characters according to your liking
});

export default function ContactForm() {
  const { isVisible, message, showAlert, hideAlert } = useSuccessAlert();
  const [hasSuceeded, setHasSuceeded] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const submission = await submitForm(values);
      if (!submission) {
        formik.resetForm();
        setHasSuceeded(false);
        showAlert("Something has gone wrong with submitting the form"); //TODO use translations
        return;
      }
      formik.resetForm();
      setHasSuceeded(true);
      showAlert("The form has been submitted successfully!"); //TODO Use translations
    },
  });

  return (
    <div
      id="lePiajeForm"
      className="w-full py-20 h-full max-h-[65em] bg-[#121212] flex  items-center justify-center p-4"
    >
      <Alert
        message={message}
        isVisible={isVisible}
        onClose={hideAlert}
        success={hasSuceeded}
      />

      <div className="w-full flex md:max-2xl:flex-row flex-col  max-w-4xl h-full bg-white rounded-lg shadow-lepiajeBrown/40 shadow-2xl drop-shadow-2xl overflow-hidden">
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
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 p-8 gap-y-8 text-white h-full flex w-full flex-col justify-center">
            <div className="flex flex-col gap-y-2">
              <Logo width="w-[8em]" height="h-[8em]" blur="blur-lg" />
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

        <div className="md:max-2xl:w-1/2 bg-gradient-to-r from-[#121212] to-[#664906] w-full p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-4 my-4">
            <div>
              <Label className="text-lepiajeWhite" htmlFor="name">
                Full Name
              </Label>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                id="name"
                name="name"
                placeholder="Mario Rossi"
                className="input"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            <div>
              <Label className="text-lepiajeWhite" htmlFor="email">
                Email
              </Label>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                name="email"
                type="email"
                placeholder="mario@gmail.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <Label className="text-lepiajeWhite" htmlFor="phone">
                Phone
              </Label>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                id="phone"
                name="phone"
                type="tel"
                placeholder="+393381234567"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div>
              <Label className="text-lepiajeWhite" htmlFor="message">
                Message
              </Label>
              <Textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                id="message"
                name="message"
                placeholder="Your message here..."
                className="h-32"
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-sm">
                  {formik.errors.message}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-lepiajeBrown">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

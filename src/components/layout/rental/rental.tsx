"use client";
import React from "react";
import Link from "next/link";
import { Property } from "@/types";
import { FaWaze } from "react-icons/fa6";
import { SiGooglemaps } from "react-icons/si";
import { PropertyHeader } from "@/components/property/property_header";
import { PropertyBooking } from "@/components/property/property_booking";
import { open_directions_on_waze } from "@/utils/open_directions_on_waze";
import { PropertyGallery } from "@/components/property/property_gallery";
import { PropertyFeatures } from "@/components/property/property_features";
import { PropertyRooms } from "@/components/property/property_rooms";
import { open_directions_on_google_maps } from "@/utils/open_directions_on_google_maps";
import ReusableMap from "@/components/map/map";

export default function PropertyPage({ property }: { property: Property }) {
  const waze = open_directions_on_waze(property.location!);
  const google = open_directions_on_google_maps(property.location!);
  return (
    <div className="container bg-slate-950 mx-auto px-4 py-32">
      <PropertyHeader
        name={property.name}
        location_name={property.location_name}
      />
      <div className="mt-6">
        <PropertyGallery images={property.images} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 md:max-2xl:order-1 order-2">
          <PropertyRooms title="Property Rooms" features={property.rooms} />
          <PropertyFeatures
            title="Property Features"
            features={property.features}
          />

          <div className="mt-8">
            <h2 className="text-2xl text-gray-200 font-bold mb-4">
              Description
            </h2>
            <p className="text-gray-200">{property.description}</p>
          </div>
        </div>
        <div className="md:max-2xl:order-2 order-1">
          <PropertyBooking
            airbnb={property.airbnb}
            booking={property.booking_dot_com}
            price={property.price}
          />
        </div>
      </div>
      <div className="mt-12">
        <p className=" font-bold mb-4 text-2xl text-gray-200">Get Directions</p>
        <div>
          <div className="inline-block">
            <Link
              className="flex items-center justify-start gap-x-2"
              href={waze}
              target="_blank"
            >
              <FaWaze
                color="#05c8f7"
                className="hover:scale-105 transition-all ease-linear"
                size={25}
              />
              <p className="hover:cursor-pointer hover:scale-105 text-lg hover:text-[#05c8f7] ease-linear transition-all text-gray-200">
                On Waze
              </p>
            </Link>
          </div>
        </div>
        <div>
          <div className="inline-block">
            <Link
              className="flex items-center justify-start gap-x-2"
              href={google}
              target="_blank"
            >
              <SiGooglemaps
                color="	#bbdaa4"
                className="hover:scale-105 transition-all ease-linear"
                size={25}
              />
              <p className="hover:cursor-pointer hover:scale-105 text-lg hover:text-[#bbdaa4] ease-linear transition-all text-gray-200">
                On Google Maps
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Link
          className="flex items-center justify-center"
          href={property.google_maps_url}
          target={"_blank"}
        >
          <div className="inline-block">
            <div className="py-8 hover:scale-105 active:scale-95 transition-all ease-linear">
              <p className="hover:text-green-500  text-lg text-center text-gray-200 font-semibold">
                See on Google Maps
              </p>
            </div>
          </div>
        </Link>
        <ReusableMap
          latitude={property.location.latitude}
          longitude={property.location.longitude}
        />
      </div>
    </div>
  );
}

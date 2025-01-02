"use client";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  latitude: number;
  longitude: number;
}

export default function ReusableMap({ latitude, longitude }: MapProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

  return (
    <main className="w-full h-[30em]">
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/jdaniel96/cm0zjgcjt00g301nq6bxx1ffk"
        initialViewState={{
          latitude,
          longitude,
          zoom: 8,
        }}
        style={{ borderRadius: "8px" }}
        maxZoom={20}
        minZoom={3}
      >
        <Marker longitude={longitude} latitude={latitude} />
      </Map>
    </main>
  );
}

import { getImages } from "@/utils/get_images_on_folder";
import PropertyPage from "@/components/layout/rental/rental";
import {
  al_centesimo_chilometro_location,
  al_centesimo_chilometro_booking_url,
  al_centesimo_chilometro_google_maps_url,
} from "@/constants/centesimo_chilometro_location";
import { Property } from "@/types";
export default async function CentesimoChilometro() {
  const folderName: string = "100esimo";
  const images = await getImages(folderName);

  // This should come from either the db or manually written to pull it from a JSON
  const property: Property = {
    id: "1",
    name: "Al Centesimo Chilometro",
    location_name: "164 Via Asinello, 01027 Montefiascone, Italy",
    price: 500, //TODO dynamically calculate
    description: `Located in Montefiascone, 18 miles from Duomo Orvieto, Al Centesimo Chilometro - Ristoro del Pellegrino has accommodations with a garden, free private parking and a shared lounge. The property is around 12 miles from Cività di Bagnoregio, 12 miles from Villa Lante and 20 miles from Bomarzo - The Monster Park. Certain accommodations at the property have a patio with a garden view.
    With a private bathroom equipped with a shower and a hairdryer, rooms at the hostel also feature free WiFi, while certain rooms are equipped with a city view.

    Natural springs of Bagnaccio is 9.4 miles from Al Centesimo Chilometro - Ristoro del Pellegrino, while Villa Lante al Gianicolo is 12 miles from the property. Perugia San Francesco d'Assisi Airport is 60 miles away.
    Couples in particular like the location – they rated it 8.9 for a two-person trip.`,
    rooms: [
      "Bed in 4-Bed Male Dormitory Room",
      "Bed in 4-Bed Female Dormitory Room",
      "Bed in Male Dormitory Room",
    ],
    features: [
      "Bathroom",
      "Toilet paper",
      "Towels",
      "Private Bathroom",
      "Toilet",
      "Hairdryer",
      "Shower",
      "Outdoors",
      "Picnic area",
      "Outdoor furniture",
      "Garden",
      "Kitchen",
      "Shared kitchen",
      "Activities",
      "Walking tours",
      "Additional charge",
      "Internet",
      "Wifi is available in all areas and is free of charge.",
      "Parking",
      "Free private parking is available on site (reservation is not needed).",
      "Accessible parking",
      "Services",
      "Shared lounge/TV area",
      "Entertainment & Family Services",
      "Board games/Puzzles",
      "General",
      "Air conditioning",
      "Heating",
      "Chapel/Shrine",
      "Non-smoking rooms",
      "Languages Spoken",
      "English",
      "Italian",
    ],
    images,
    location: al_centesimo_chilometro_location!,
    booking_dot_com: al_centesimo_chilometro_booking_url!,
    google_maps_url: al_centesimo_chilometro_google_maps_url,
  };

  return <PropertyPage property={property} />;
}

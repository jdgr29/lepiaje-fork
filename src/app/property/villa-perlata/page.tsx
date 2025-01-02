import React from "react";
import { getImages } from "@/utils/get_images_on_folder";
import PropertyPage from "@/components/layout/rental/rental";
import {
  la_villa_perlata_location,
  la_villa_perlata_airbnb_url,
  la_villa_perlata_google_maps_url,
} from "@/constants/la_villa_perlata_location";
import { Property } from "@/types";

export default async function VillaPerlata() {
  const folderName: string = "villa_perlata";
  const images = await getImages(folderName);
  // This should come from either the db or manually written to pull it from a JSON

  const property: Property = {
    id: "1",
    name: "La Villa Perlata",
    location_name: "Via del Lago, 65, 01027 Montefiascone VT, Italy",
    price: 500, //TODO dynamically calculate
    description: `The accommodation is located 2km from the shores of Lake Bolsena and close to many country trails. You will love it for its views, vast outdoor spaces, atmosphere and privacy. It is suitable for couples and families (with children).
    The space 
    Located in the so-called "Pearl Valley", you will have the opportunity to immerse yourself in nature, crossing numerous paths and reach the lake on foot without being disturbed by the noise of traffic. The accommodation is framed by the fields of the farm, where fruits, olives and especially grapes are produced.
    Guest access

    In addition to the garden, you can walk among the pomegranate and olive plantations in front of the house and between the rows of the two vineyards to the left of it, where you can enjoy a magnificent view.
    If the season allows it, you can pick the products of the garden and the fruit trees of organic production.

    Other things to note

The rooms are on the first floor. You will find both bed linen and bath linen. Consumption is included in the price.
`,
    rooms: [
      "6 guests",
      "2 bedrooms",
      "3 beds",
      "2 baths",
      `#1 Bedroom 
       1 queen bed`,
      `#2 Bedroom 
       1 double bed`,
      `Living room
       1 sofa bed`,
    ],
    features: [
      "Scenic views",
      "Garden view",
      "Valley view",
      "Vineyard view",
      "Bathroom",
      "Hair dryer",
      "Shampoo",
      "Body soap",
      "Bidet",
      "Hot water",
      "Bedroom and laundry",
      "Free washer – In unit",
      "Essentials",
      "Towels, bed sheets, soap, and toilet paper",
      "Hangers",
      "Bed linens",
      "Cotton linens",
      "Iron",
      "Clothing storage: walk-in closet and closet",
      "Entertainment",
      "HDTV",
      "Game console: PS3",
      "Exercise equipment",
      "Books and reading material",
      "Family",
      "Crib - available upon request",
      "Babysitter recommendations",
      "Heating and cooling",
      "Central air conditioning",
      "Indoor fireplace: wood-burning",
      "Heating",
      "Home safety",
      "Fire extinguisher",
      "Internet and office",
      "Wifi",
      "Dedicated workspace",
      "In a private space with a laptop stand",
      "Kitchen and dining",
      "Kitchen",
      "Space where guests can cook their own meals",
      "Refrigerator",
      "Cooking basics",
      "Pots and pans, oil, salt and pepper",
      "Dishes and silverware",
      "Bowls, chopsticks, plates, cups, etc.",
      "Freezer",
      "Dishwasher",
      "Gas stove",
      "Oven",
      "Coffee maker: pour-over coffee",
      "Wine glasses",
      "Baking sheet",
      "Barbecue utensils",
      "Grill, charcoal, bamboo skewers/iron skewers, etc.",
      "Dining table",
      "Coffee",
      "Location features",
      "Lake access",
      "Guests can get to a lake using a path or dock",
      "Private entrance",
      "Separate street or building entrance",
      "Outdoor",
      "Private patio or balcony",
      "Private backyard – Not fully fenced",
      "An open space on the property usually covered in grass",
      "Outdoor furniture",
      "Outdoor dining area",
      "BBQ grill",
      "Parking and facilities",
      "Free parking on premises",
      "Services",
      "Long term stays allowed",
      "Allow stay for 28 days or more",
      "Self check-in",
      "Lockbox",
    ],
    images,
    location: la_villa_perlata_location,
    airbnb: la_villa_perlata_airbnb_url,
    google_maps_url: la_villa_perlata_google_maps_url,
  };
  // await new Promise((resolve) => setTimeout(resolve, 5000)); //For testing the skeleton!

  return <PropertyPage property={property} />;
}

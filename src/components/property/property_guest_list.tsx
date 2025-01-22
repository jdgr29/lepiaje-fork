"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Guests } from "@/types";
const MAX_GUESTS = 5; // Maximum number of guests allowed

export default function GuestList({
  setGuestList,
  guestList,
}: {
  guestList: Guests[];
  setGuestList: Dispatch<SetStateAction<{ name: string; gender: string }[]>>;
}) {
  const addGuest = () => {
    if (guestList.length < MAX_GUESTS) {
      setGuestList([...guestList, { name: "", gender: "" }]);
    }
  };

  const removeGuest = (index: number) => {
    const newGuests = guestList.filter((_, i) => i !== index);
    setGuestList(newGuests);
  };

  const updateGuestName = (index: number, value: string) => {
    const newGuests = [...guestList];
    newGuests[index].name = value;
    setGuestList(newGuests);
  };

  const updateGuestGender = (index: number, value: string) => {
    const newGuests = [...guestList];
    newGuests[index].gender = value;
    setGuestList(newGuests);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 space-y-4">
      <h2 className="md:max-2xl:text-start text-center text-2xl font-bold text-gray-200 mb-6">
        Do you have any guests?
      </h2>
      <AnimatePresence>
        {guestList.map((guest, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Input
              type="text"
              value={guest.name}
              onChange={(e) => updateGuestName(index, e.target.value)}
              placeholder={`⁠ Guest ${index + 1}`}
              className="flex-grow"
            />
            <select
              value={guest.gender}
              onChange={(e) => updateGuestGender(index, e.target.value)}
              className={` border-[0.15em] w-[6em] rounded p-2 text-gray-700 ${!guest.gender ? "border-red-300" : "border-gray-400"}`}
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/* {index > 0 && ( */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeGuest(index)}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
            {/* )} */}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex justify-center">
        <Button
          onClick={addGuest}
          disabled={guestList.length >= MAX_GUESTS}
          className="mt-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>
      <p className="text-sm text-center text-gray-500">
        {guestList.length} / {MAX_GUESTS} guestList added
      </p>
    </div>
  );
}

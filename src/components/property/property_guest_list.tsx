"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_GUESTS = 5; // Maximum number of guestList allowed

export default function GuestList({
  setGuestList,
  guestList,
}: {
  guestList: string[];
  setGuestList: Dispatch<SetStateAction<string[]>>;
}) {
  const addGuest = () => {
    if (guestList.length < MAX_GUESTS) {
      setGuestList([...guestList, ""]);
    }
  };

  const removeGuest = (index: number) => {
    const newGuests = guestList.filter((_, i) => i !== index);
    setGuestList(newGuests);
  };

  const updateGuest = (index: number, value: string) => {
    const newGuests = [...guestList];
    newGuests[index] = value;
    setGuestList(newGuests);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 space-y-4">
      <h2 className="text-2xl font-bold text-start text-gray-200 mb-6">
        Who is checking in?
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
              value={guest}
              onChange={(e) => updateGuest(index, e.target.value)}
              placeholder={`Guest ${index + 1}`}
              className="flex-grow"
            />
            {index > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeGuest(index)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
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

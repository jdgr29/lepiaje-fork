"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_GUESTS = 5; // Maximum number of guests allowed

export default function GuestList() {
  const [guests, setGuests] = useState<string[]>([""]);

  const addGuest = () => {
    if (guests.length < MAX_GUESTS) {
      setGuests([...guests, ""]);
    }
  };

  const removeGuest = (index: number) => {
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
  };

  const updateGuest = (index: number, value: string) => {
    const newGuests = [...guests];
    newGuests[index] = value;
    setGuests(newGuests);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 space-y-4">
      <h2 className="text-2xl font-bold text-start text-gray-200 mb-6">
        Guest List
      </h2>
      <AnimatePresence>
        {guests.map((guest, index) => (
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
          disabled={guests.length >= MAX_GUESTS}
          className="mt-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>
      <p className="text-sm text-center text-gray-500">
        {guests.length} / {MAX_GUESTS} guests added
      </p>
    </div>
  );
}

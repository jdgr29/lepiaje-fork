"use client";

import { useState } from "react";
import Image from "next/image";
import { LanguageIcon } from "@heroicons/react/24/solid";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import usFlag from "@/public/assets/us_flag.jpg";
import italyFlag from "@/public/assets/italy_flag.png";

type Props = {
  defaultValue: string;
  items: Array<{
    value: string;
    label: string;
    flag: typeof usFlag | typeof italyFlag;
  }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  function onChange(value: string) {
    const locale = value as Locale;
    setUserLocale(locale);
    setSelectedValue(value);
    setIsOpen(false);
  }

  const selectedItem = items.find((item) => item.value === selectedValue);

  return (
    <div className="fixed bottom-0 left-0 mb-4 ml-4 z-50">
      <div
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label}
        className="relative flex items-center rounded-sm p-2  hover:text-slate-900 hover:scale-110 transition-all ease-linear"
      >
        <div className="absolute -z-10 rounded-lg inset-0 bg-[rgba(0,0,0,0.4)]"></div>
        {selectedItem && (
          <Image
            src={selectedItem.flag}
            alt={selectedItem.label}
            width={20}
            height={20}
            className="mr-2"
          />
        )}
        <LanguageIcon className="h-6 w-6 text-slate-200  transition-colors" />
      </div>
      {isOpen && (
        <div className="fixed left-0 bottom-0 mt-1 min-w-[8rem] overflow-hidden rounded-sm bg-slate-400 py-1 shadow-md">
          {items.map((item) => (
            <button
              key={item.value}
              className="flex w-full cursor-default items-center px-3 py-2 text-base hover:bg-slate-100"
              onClick={() => onChange(item.value)}
            >
              <Image
                src={item.flag}
                alt={item.label}
                width={24}
                height={16}
                className="mr-2"
              />
              <span className="text-slate-900 text-sm">{item.label}</span>
              {item.value === selectedValue && (
                <span className="ml-2 text-slate-600 text-sm">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

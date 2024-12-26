"use client";
import Link from "next/link";
import Image from "next/image";
import usFlag from "../../../public/assets/us_flag.jpg";
import italyFlag from "../../../public/assets/italy_flag.png";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
const LanguageSwitcher = () => {
  const languages = [
    {
      code: "en",
      name: "English",
      flag: usFlag,
    },
    {
      code: "it",
      name: "Italiano",
      flag: italyFlag,
    },
  ];

const wtf = useRouter()
wtf.replace("/", {locale: "it"})
  return (
    <div className="rounded-full shadow-lg p-2 flex space-x-2">
      {languages.map((lang) => (
        <Link
          referrerPolicy="no-referrer"
          target="_blank"
          key={lang.code}
          href="/"
          locale={lang.code}
        >
          <button className="relative w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-95">
            <Image
              src={lang.flag}
              alt={`${lang.name} flag`}
              layout="fill"
              objectFit="cover"
            />
            <span className="sr-only">{lang.name}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

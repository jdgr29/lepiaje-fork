"use client";
import { useRouter, usePathname } from "next/navigation";

export function useScrollToForm() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToForm = () => {
    if (pathname !== "/") {
      router.push("/");
    }
    setTimeout(() => {
      const form = document.getElementById("lePiajeForm");
      if (form) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return { scrollToForm };
}

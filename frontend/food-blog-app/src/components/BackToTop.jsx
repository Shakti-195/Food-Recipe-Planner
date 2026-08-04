import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
   <button
  onClick={scrollToTop}
  title="Back to Top"
  aria-label="Back to Top"
  className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 dark:bg-emerald-600 text-white border border-slate-700 dark:border-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-black dark:hover:bg-emerald-700 active:scale-95"
>
  <FaArrowUp className="text-lg" />
</button>
  );
}
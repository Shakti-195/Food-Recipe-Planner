import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
className="
w-10 h-10
flex items-center justify-center
rounded-xl
text-emerald-500
hover:bg-emerald-50
dark:hover:bg-slate-800
hover:text-emerald-600
transition-all duration-300
"
    >
     {darkMode ? <RiSunLine size={20} /> : <RiMoonClearLine size={20} />}
    </button>
  );
}
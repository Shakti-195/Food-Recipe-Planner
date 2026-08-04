import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";
import { MdRestaurantMenu } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-white via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-6 transition-colors duration-300">
      <div className="text-center max-w-lg">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-lg">
            <BiSearchAlt className="text-6xl text-emerald-600" />
          </div>
        </div>

        {/* Branding */}
        <div className="flex items-center justify-center gap-2 mb-6">
  <MdRestaurantMenu className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)] text-3xl" />
  <span className="text-xl font-bold text-slate-900 dark:text-white">
    Recipe<span className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">Verse</span>
  </span>
</div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)] tracking-tight drop-shadow-sm">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
  Recipe Not Found
</h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-300">
  Looks like this recipe isn't on today's menu.
  Head back home and discover more delicious recipes.
</p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <HiArrowLeft />
          Back to Home
        </Link>

      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-white via-slate-50 to-emerald-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
            <BiSearchAlt className="text-5xl text-emerald-600" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-emerald-600 tracking-tight">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
  Recipe Not Found
</h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 leading-relaxed">
  Looks like this recipe isn't on today's menu.
  Head back home and discover more delicious recipes.
</p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-emerald-600 hover:bg-emerald-700 hover:scale-105 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HiArrowLeft />
          Back to Home
        </Link>

      </div>
    </div>
  );
}
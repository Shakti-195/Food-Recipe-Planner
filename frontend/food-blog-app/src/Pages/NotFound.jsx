import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-extrabold text-orange-500">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="mt-3 text-gray-500">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        🏠 Back to Home
      </Link>
    </div>
  );
}
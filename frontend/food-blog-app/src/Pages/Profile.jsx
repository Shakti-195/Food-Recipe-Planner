import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex justify-center items-start bg-slate-50 dark:bg-slate-950 px-4 py-10 md:py-16 transition-colors duration-300">

      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">

        {/* Profile Header */}
        <div className="text-center">

          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <FaUserCircle className="text-7xl text-emerald-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            My Profile
          </h1>

          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>

        </div>

        {/* User Information */}
        <div className="mt-10 space-y-5">

          {/* Name */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Full Name
            </p>

            <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              {user?.name || "Not available"}
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Email Address
            </p>

            <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white break-all">
              {user?.email || "Not available"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
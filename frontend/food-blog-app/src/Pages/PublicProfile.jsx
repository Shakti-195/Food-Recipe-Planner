import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaUtensils, FaStar, FaCalendarAlt } from "react-icons/fa";

export default function PublicProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    recipes: 0,
    ratings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const res = await axios.get(
          `https://food-recipe-planner.onrender.com/profile/${id}`
        );

        setUser(res.data.user);
        setStats(res.data.stats);
      } catch (error) {
        console.error("Failed to fetch public profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            User not found
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            This profile does not exist.
          </p>
        </div>
      </div>
    );
  }

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
            {user.name}
          </h1>

          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <FaCalendarAlt />
            <span>
              Member since{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "Not available"}
            </span>
          </div>

        </div>

        {/* Public Activity */}
        <div className="mt-10">

          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Activity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Recipes */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center">

              <div className="flex justify-center mb-3">
                <FaUtensils className="text-3xl text-emerald-500" />
              </div>

              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats.recipes}
              </p>

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Recipes
              </p>

            </div>

            {/* Ratings */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center">

              <div className="flex justify-center mb-3">
                <FaStar className="text-3xl text-yellow-400" />
              </div>

              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats.ratings}
              </p>

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Ratings Given
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsStopwatchFill } from "react-icons/bs";

export default function RecipeDetails() {
  const recipe = useLoaderData();

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-3xl font-bold text-red-500">
          Recipe not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      {/* Recipe Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Image */}
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="w-full h-[450px] object-cover"
        />

        <div className="p-8">

          {/* User */}
          <div className="flex items-center gap-3 mb-6">

            <div className="bg-orange-100 p-3 rounded-full">
              <FaUserCircle className="text-4xl text-orange-500" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Shared By
              </p>

              <h3 className="font-semibold text-lg">
                {recipe.email}
              </h3>
            </div>

          </div>

          {/* Title */}

          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            {recipe.title}
          </h1>

          {/* Time */}

          <div className="flex items-center gap-2 text-orange-500 font-semibold text-lg mb-8">
            <BsStopwatchFill />
            <span>{recipe.time}</span>
          </div>

          {/* Ingredients + Instructions */}

          <div className="grid md:grid-cols-2 gap-10">

            {/* Ingredients */}

            <div className="bg-orange-50 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-orange-600 mb-4">
                🥗 Ingredients
              </h2>

              <ul className="space-y-3">

                {recipe.ingredients
                  .split(",")
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <span className="text-orange-500 text-xl">
                        •
                      </span>

                      {item.trim()}
                    </li>
                  ))}

              </ul>

            </div>

            {/* Instructions */}

            <div className="bg-gray-50 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                👨‍🍳 Instructions
              </h2>

              <p className="leading-8 text-gray-700 whitespace-pre-line">
                {recipe.instructions}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
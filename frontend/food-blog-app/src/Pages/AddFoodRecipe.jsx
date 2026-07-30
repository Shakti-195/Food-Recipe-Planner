import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = "https://food-recipe-planner.onrender.com";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    file: null,
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;

    setRecipeData((pre) => ({
      ...pre,
      [e.target.name]: val,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    formData.append("file", recipeData.file);

    try {
      const res = await axios.post(
        `${API_URL}/recipe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Recipe added successfully!");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed to add recipe.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500">
            🍽 Add New Recipe
          </h1>

          <p className="text-gray-500 mt-2">
            Share your delicious recipe with everyone.
          </p>
        </div>

        <form
          onSubmit={onHandleSubmit}
          className="space-y-6"
        >

          {/* Title */}

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Recipe Title
            </label>

            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={onHandleChange}
              placeholder="Paneer Butter Masala"
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Time */}

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Cooking Time
            </label>

            <input
              type="text"
              name="time"
              value={recipeData.time}
              onChange={onHandleChange}
              placeholder="40 Minutes"
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Ingredients */}

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Ingredients
            </label>

            <textarea
              rows="5"
              name="ingredients"
              value={Array.isArray(recipeData.ingredients)
                ? recipeData.ingredients.join(",")
                : recipeData.ingredients}
              onChange={onHandleChange}
              placeholder="Paneer, Onion, Tomato, Butter..."
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Instructions */}

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Instructions
            </label>

            <textarea
              rows="7"
              name="instructions"
              value={recipeData.instructions}
              onChange={onHandleChange}
              placeholder="Write recipe instructions..."
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Image */}

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Upload Recipe Image
            </label>

            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onHandleChange}
              className="block w-full rounded-xl border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
          >
            ➕ Add Recipe
          </button>

        </form>
      </div>
    </div>
  );
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = "https://food-recipe-planner.onrender.com";

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    file: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipe/${id}`);
        const res = response.data;

        setRecipeData({
          title: res.title,
          time: res.time,
          ingredients: Array.isArray(res.ingredients)
            ? res.ingredients.join(",")
            : res.ingredients,
          instructions: res.instructions,
          file: null,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [id]);

  const onHandleChange = (e) => {
    const val =
      e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;

    setRecipeData((prev) => ({
      ...prev,
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

    if (recipeData.file) {
      formData.append("file", recipeData.file);
    }

    try {
      await axios.put(
        `${API_URL}/recipe/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Recipe updated successfully! ✨");
      navigate("/myRecipe");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update recipe."
    );

    console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">

        {/* Heading */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500">
            ✏️ Edit Recipe
          </h1>

          <p className="text-gray-500 mt-2">
            Update your recipe details and save the changes.
          </p>
        </div>

        <form onSubmit={onHandleSubmit} className="space-y-6">

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
              value={recipeData.ingredients}
              onChange={onHandleChange}
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
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Image */}

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Change Recipe Image (Optional)
            </label>

            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onHandleChange}
              className="block w-full rounded-xl border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4 pt-2">

            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
            >
              💾 Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/myRecipe")}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-4 rounded-xl text-lg font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
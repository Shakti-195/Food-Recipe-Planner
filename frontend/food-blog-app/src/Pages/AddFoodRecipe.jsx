import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdRestaurantMenu } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";

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
    <div className="min-h-screen flex justify-center items-center bg-slate-50 py-16 px-4">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-[30px] shadow-xl p-10">

        <div className="text-center mb-10">

  <div className="flex items-center justify-center gap-4">
   <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg">
  <MdRestaurantMenu className="text-4xl text-emerald-600" />
</div>


    <h1 className="text-5xl font-extrabold text-slate-900">
      Add New Recipe
    </h1>
  </div>

  <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>

  <p className="text-slate-500 mt-5 text-lg">
    Share your delicious recipe with everyone.
  </p>

</div>

        <form
          onSubmit={onHandleSubmit}
         className="space-y-7"
        >

          {/* Title */}

          <div>
            <label className="block mb-2 font-semibold text-slate-800">
              Recipe Title
            </label>

            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={onHandleChange}
              placeholder="Paneer Butter Masala"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all"
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
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all"
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
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all resize-none"
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
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all resize-none"
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
              className="block w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-5 file:py-2 file:text-white hover:file:bg-black"
            />
          </div>

          {/* Button */}

         <button
  type="submit"
  className="w-full bg-slate-900 hover:bg-black text-white text-lg font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
>
  <IoAddCircleSharp className="text-2xl" />
  Add Recipe
</button>

        </form>
      </div>
    </div>
  );
}
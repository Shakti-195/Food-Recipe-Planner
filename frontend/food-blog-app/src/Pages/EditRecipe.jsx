import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

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
    <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-950 py-8 md:py-16 px-4 transition-colors duration-300">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl p-5 sm:p-8 md:p-10 transition-colors duration-300">

        {/* Heading */}
        {/* Close Button */}
<button
  type="button"
   onClick={() => {
  console.log("clicked");
  navigate("/myrecipe");
}}
  className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-500/20 transition-all duration-300"
  title="Close"
>
  <IoClose className="text-2xl" />
</button>

        <div className="text-center mb-10">

  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg">
      <MdRestaurantMenu className="text-4xl text-emerald-600" />
    </div>

    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center transition-colors duration-300">
      Update Recipe
    </h1>

  </div>

  <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>

  <p className="mt-5 text-slate-500 dark:text-slate-400 text-base md:text-lg px-2 transition-colors duration-300">
    Update your recipe details and save the changes.
  </p>

</div>

        <form onSubmit={onHandleSubmit} className="space-y-6 md:space-y-7">

          {/* Title */}

          <div>
            <label className="block mb-2 font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300">
              Recipe Title
            </label>

            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={onHandleChange}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Time */}

          <div>
            <label className="block mb-2 font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300 dark:text-slate-200 transition-colors duration-300">
              Cooking Time
            </label>

            <input
              type="text"
              name="time"
              value={recipeData.time}
              onChange={onHandleChange}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Ingredients */}

          <div>
            <label className="block mb-2 font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300 dark:text-slate-200 transition-colors duration-300">
              Ingredients
            </label>

            <textarea
              rows={4}
              name="ingredients"
              value={recipeData.ingredients}
              onChange={onHandleChange}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Instructions */}

          <div>
            <label className="block mb-2 font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300 dark:text-slate-200 transition-colors duration-300">
              Instructions
            </label>

            <textarea
              rows={5}
              name="instructions"
              value={recipeData.instructions}
              onChange={onHandleChange}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white p-4 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Image */}

          <div>
            <label className="block mb-2 font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300 dark:text-slate-200 transition-colors duration-300">
              Change Recipe Image (Optional)
            </label>

            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onHandleChange}
            className="block w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-300 p-4 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 dark:file:bg-emerald-600 file:px-5 file:py-2 file:text-white hover:file:bg-black dark:hover:file:bg-emerald-700 transition-all"
            />
          </div>
          {recipeData.file && (
  <img
    src={URL.createObjectURL(recipeData.file)}
    alt="Preview"
    className="mt-4 h-52 w-full object-cover rounded-2xl border border-slate-300 dark:border-slate-700"
  />
)}

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">

            <button
                    type="submit"
                  className="flex-1 bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                    {/* <MdOutlineEdit className="text-2xl" /> */}
                    {/* <FaCheckCircle className="text-xl" /> */}
                    {/* <FaPen className="text-lg" /> */}
                    <BiEditAlt className="text-2xl" />
                Update!
            </button>

            <button
                type="button"
                onClick={() => navigate("/myRecipe")}
                // className="flex-1 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
                className="flex-1 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold transition-all duration-300"
            >
                Cancel
            </button>

        </div>

        </form>

    </div>
    </div>
);
}
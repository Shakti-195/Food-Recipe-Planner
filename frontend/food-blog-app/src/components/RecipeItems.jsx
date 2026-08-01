import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";


const API_URL = "https://food-recipe-planner.onrender.com";

export default function RecipeItems({ search }) {
  const recipes = useLoaderData();

  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const path = window.location.pathname === "/myRecipe";
  const [favItems, setFavItems] = useState([]);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);

    setAllRecipes(recipes);

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get(
          `${API_URL}/user/favourites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavItems(res.data);
      } catch (err) {
        console.error("Failed to load favourites", err);
      }
    }

    setLoading(false);
  };

  loadData();
}, [recipes]);

  const onDelete = async (id) => {
  try {
    await axios.delete(`${API_URL}/recipe/${id}`);

    setAllRecipes((prev) =>
      prev.filter((recipe) => recipe._id !== id)
    );

   setFavItems((prev) =>
  prev.filter((recipe) => recipe._id !== id)
);

    toast.success("Recipe deleted successfully! 🗑️");
  } catch (err) {
    toast.error("Failed to delete recipe.");
    console.log(err);
  }
};

const favRecipe = async (item) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first.");
    return;
  }

  const alreadyExists = favItems.some(
  (recipe) => String(recipe._id) === String(item._id)
);
  try {
    if (alreadyExists) {
      await axios.delete(
        `${API_URL}/user/favourites/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedFavs = favItems.filter(
        (recipe) => recipe._id !== item._id
      );

      setFavItems(updatedFavs);
      

      if (window.location.pathname === "/favRecipe") {
        setAllRecipes(updatedFavs);
      }

      toast("Removed from favorites 💔");
    } else {
      await axios.post(
        `${API_URL}/user/favourites/${item._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedFavs = [...favItems, item];
setFavItems(updatedFavs);

if (window.location.pathname === "/favRecipe") {
  setAllRecipes(updatedFavs);
}

      toast.success("Added to favorites ❤️");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update favorites.");
  }
};
if (loading) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
    </div>
  );
}

const filteredRecipes = allRecipes.filter((recipe) =>
  recipe.title.toLowerCase().includes(search.toLowerCase())
);
const isFavoritesPage = window.location.pathname === "/favRecipe";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {filteredRecipes.length === 0 && isFavoritesPage ? (
  <div className="flex flex-col items-center justify-center py-20 text-center">

    <FaRegHeart className="text-7xl text-slate-300 mb-6" />

    <h2 className="text-3xl font-bold text-slate-900">
      No Favorite Recipes Yet
    </h2>

    <p className="mt-3 text-slate-500 max-w-md">
      You haven't added any recipes to your favorites.
      Start exploring and save recipes you love.
    </p>

    <button
      onClick={() => navigate("/")}
      className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all"
    >
      Browse Recipes
    </button>

  </div>
) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

        {filteredRecipes.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/recipe/${item._id}`)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >

            {/* Image */}

            <div className="overflow-hidden">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-52 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Body */}

            <div className="p-5 md:p-7">

              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 line-clamp-1">
                {item.title}
              </h2>

              {/* rating badge */}
              <div className="flex items-center justify-between flex-wrap gap-2 mt-2 mb-4">
  <span className="text-yellow-500 text-sm font-semibold">
    ⭐ {item.averageRating?.toFixed(1) || "0.0"}
  </span>

  <span className="text-slate-500 text-sm">
    {item.comments?.length || 0} Reviews
  </span>
</div>

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <BsStopwatchFill />
                  <span>{item.time}</span>
                </div>

                {!path ? (
                  <FaHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      favRecipe(item);
                    }}
                    className={`text-2xl md:text-3xl transition-all duration-300 ${
  favItems.some(
    (recipe) => String(recipe._id) === String(item._id)
  )
    ? "text-red-500"
    : "text-slate-400 hover:text-red-500"
}`}             />
                ) : (
                  <div className="flex items-center gap-4">

                    <Link
                      to={`/editRecipe/${item._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-emerald-600 hover:text-emerald-700 text-2xl transition"
                    >
                      <FaEdit />
                    </Link>

                    <MdDelete
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item._id);
                      }}
                      className="text-red-500 hover:text-red-700 text-2xl transition"
                    />

                  </div>
                )}

              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/recipe/${item._id}`);
                }}
                className="mt-5 w-full bg-slate-900 hover:bg-black text-white py-3 rounded-2xl text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <HiArrowRight className="text-lg" />
View Recipe
              </button>

            </div>

          </div>
        ))}

      </div>
        )}

    </div>
  );
}
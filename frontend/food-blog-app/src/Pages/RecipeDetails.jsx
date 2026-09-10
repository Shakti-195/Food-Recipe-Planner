import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaUserCircle, FaStar } from "react-icons/fa";
import { BsStopwatchFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { FaClipboardList } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import { PiBowlFoodFill } from "react-icons/pi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const API_URL = "https://food-recipe-planner.onrender.com";

export default function RecipeDetails() {
const loadedRecipe = useLoaderData();

const [recipe, setRecipe] = useState(loadedRecipe);
console.log(recipe);
console.log(recipe.email);
const [comment, setComment] = useState("");
const [selectedRating, setSelectedRating] = useState(5);
const [editingCommentId, setEditingCommentId] = useState(null);
const [editedComment, setEditedComment] = useState("");
const [editedRating, setEditedRating] = useState(5);
const currentUserId = JSON.parse(
  atob(localStorage.getItem("token").split(".")[1])
).id;

  const [averageRating, setAverageRating] = useState(
    recipe?.ratings?.length
      ? (
          recipe.ratings.reduce((sum, item) => sum + item.rating, 0) /
          recipe.ratings.length
        ).toFixed(1)
      : 0
  );

  const [totalRatings, setTotalRatings] = useState(
    recipe?.ratings?.length || 0
  );

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-3xl font-bold text-red-500">
          Recipe not found.
        </h2>
      </div>
    );
  }

  const handleRating = async (rating) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to rate this recipe.");
        return;
      }

      const res = await axios.post(
        `${API_URL}/recipe/${recipe._id}/rating`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAverageRating(res.data.averageRating);
      setTotalRatings(res.data.totalRatings);

      toast.success("⭐ Rating submitted successfully!");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Failed to submit rating."
      );
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) {
  toast.error("Please enter a comment.");
  return;
}
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to comment.");
      return;
    }

    const res = await axios.post(
  `${API_URL}/recipe/${recipe._id}/comment`,
    {
    comment,
    rating: selectedRating,
    },
        {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }
    );

 setRecipe(res.data.recipe);

const avg =
  res.data.recipe.ratings.reduce(
    (sum, item) => sum + item.rating,
    0
  ) / res.data.recipe.ratings.length;

setAverageRating(avg.toFixed(1));
setTotalRatings(res.data.recipe.ratings.length);

    setComment("");

    toast.success("Comment added successfully!");
} catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Failed to add comment.");
    }
};

const handleDeleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(
      `${API_URL}/recipe/${recipe._id}/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecipe(res.data.recipe);

    const ratings = res.data.recipe.ratings;

    if (ratings.length) {
      const avg =
        ratings.reduce((sum, item) => sum + item.rating, 0) /
        ratings.length;

      setAverageRating(avg.toFixed(1));
      setTotalRatings(ratings.length);
    } else {
      setAverageRating(0);
      setTotalRatings(0);
    }

    toast.success("Review deleted successfully");

  } catch (err) {
    toast.error(err.response?.data?.message);
  }
};
const handleEditComment = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API_URL}/recipe/${recipe._id}/comment/${editingCommentId}`,
      {
        comment: editedComment,
        rating: editedRating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecipe(res.data.recipe);

    const ratings = res.data.recipe.ratings;

    const avg =
      ratings.reduce((sum, item) => sum + item.rating, 0) /
      ratings.length;

    setAverageRating(avg.toFixed(1));
    setTotalRatings(ratings.length);

    setEditingCommentId(null);

    toast.success("Review updated");

  } catch (err) {
    toast.error(err.response?.data?.message);
  }
};

return (
    <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">
  <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">

      {/* Recipe Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden transition-colors duration-300">

       {/* Image */}
<div className="relative">
  <img
    src={recipe.coverImage}
    alt={recipe.title}
    className="w-full h-64 sm:h-80 md:h-[520px] object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
</div>
        <div className="p-5 md:p-8">

          {/* User */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">

            <div className="bg-emerald-100 p-3 rounded-full">
                <FaUserCircle className="text-3xl md:text-4xl text-emerald-600" />
            </div>

            <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                Shared By
                </p>

                <Link
                        to={`/profile/${recipe.createdBy}`}
                        className="font-bold text-lg text-slate-800 dark:text-white hover:text-emerald-500 transition-colors"
                >
                      {recipe.creatorName || recipe.email}
                </Link>
            </div>

        </div>

          {/* Comment Section */}

<div className="mt-10">

    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-5">
    Comments
    </h2>

    <div className="flex gap-2 mb-4">
  {[1, 2, 3, 4, 5].map((star) => (
    <FaStar
      key={star}
      onClick={() => setSelectedRating(star)}
      className={`text-3xl cursor-pointer transition ${
        star <= selectedRating
          ? "text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ))}
</div>

    <textarea
    rows={3}
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Write your comment..."
   className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl p-4 shadow-sm focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-colors duration-300"
  />

<button
  onClick={handleComment}
  className="mt-4 w-full sm:w-auto bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl border border-slate-800 dark:border-emerald-500 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
>
  <FaPaperPlane className="text-sm" />
  Post Comment
</button>

  <div className="mt-6">
  {recipe?.comments?.length > 0 ? (
    recipe.comments.map((item) => (
      <div
        key={item._id}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-5 mb-5 shadow-sm hover:shadow-lg transition-all"
      >
    <div className="flex items-start justify-between gap-4">

  {/* User */}
  <div className="flex items-center gap-2 flex-1 min-w-0">
    <FaUserCircle className="text-emerald-500 text-lg flex-shrink-0" />

    <Link
  to={`/profile/${item.userId}`}
  className="font-bold text-lg text-slate-800 dark:text-white hover:text-emerald-500 transition-colors"
>
  {item.userName || "Unknown User"}
</Link>
  </div>

  {/* Rating */}
  <div className="flex gap-0.5 flex-shrink-0">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`text-[10px] sm:text-xs md:text-sm ${
          star <= item.rating
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ))}
  </div>

</div>


     {editingCommentId === item._id ? (
  <>
    <div className="flex gap-1 mt-2 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => setEditedRating(star)}
          className={`text-lg sm:text-xl cursor-pointer transition ${
            star <= editedRating
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>

    <textarea
      value={editedComment}
      onChange={(e) => setEditedComment(e.target.value)}
      className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded p-2"
    />

    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-4">
      <button
  onClick={handleEditComment}
  className="w-full sm:w-auto bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl border border-slate-800 dark:border-emerald-500 transition-all duration-300"
>
  Update Review
</button>
<div className="flex justify-end gap-3 w-full sm:w-auto">
        <button
  onClick={() => setEditingCommentId(null)}
  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
>
  <FaEdit />
  Cancel
</button>

        <button
  onClick={() => handleDeleteComment(item._id)}
  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md"
>
  <FaTrashAlt />
  Delete
</button>
      </div>
    </div>
  </>
) : (
  <p className="mt-2 text-gray-700 dark:text-slate-300">
    {item.comment}
  </p>
)}
{item.userId === currentUserId && editingCommentId !== item._id && (
  <div className="flex justify-end gap-3 mt-4">
    <button
      onClick={() => {
        setEditingCommentId(item._id);
        setEditedComment(item.comment);
        setEditedRating(item.rating);
      }}
      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
    >
      <FaEdit />
      Edit
    </button>

    <button
      onClick={() => handleDeleteComment(item._id)}
      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
    >
      <FaTrashAlt />
      Delete
    </button>
  </div>
)}

        {editingCommentId !== item._id && (
  <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
    {new Date(item.createdAt).toLocaleString()}
  </p>
)}
      </div>
    ))
  ) : (
    <p className="text-gray-500 mt-4">
      No comments yet.
    </p>
  )}
</div>

</div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            {recipe.title}
          </h1>

          {/* Time */}
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-lg mb-8">
            <BsStopwatchFill />
            <span>{recipe.time}</span>
          </div>

          {/* Rating Section */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-5 md:p-8 mb-10 border dark:border-slate-700 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              <FaStar className="text-yellow-400 text-3xl" />
              Recipe Ratings
            </h2>

            <div className="flex items-center gap-2 mb-3">

             {[1, 2, 3, 4, 5].map((star) => (
  <FaStar
    key={star}
    className={`text-3xl ${
      star <= Math.round(averageRating)
        ? "text-yellow-400"
        : "text-gray-300"
    }`}
  />
))}

            </div>

            <p className="text-lg text-gray-700 dark:text-slate-300">
              <span className="font-bold text-emerald-600">
                {averageRating}
              </span>{" "}
              / 5
            </p>

            <p className="text-gray-500 dark:text-slate-400">
              {totalRatings} Rating{totalRatings !== 1 ? "s" : ""}
            </p>

            <p className="text-sm text-gray-400 mt-2">
  Ratings are based on user reviews.
</p>

          </div>

          {/* Ingredients + Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

            {/* Ingredients */}
            <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-2xl p-6">

              <h2  className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                
                <PiBowlFoodFill className="text-3xl text-emerald-500" />
Ingredients
              </h2>

              <ul className="space-y-3">

                {recipe.ingredients
                  .split(",")
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-700 dark:text-slate-300"
                    >
                      <span className="text-emerald-600 text-xl">
                        •
                      </span>

                      {item.trim()}
                    </li>
                  ))}

              </ul>

            </div>

            {/* Instructions */}
            <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-2xl p-6">
              <h2  className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
  <LuChefHat className="text-3xl text-emerald-500" />
  Instructions
</h2>

              <p className="leading-8 text-gray-700 dark:text-slate-300 whitespace-pre-line">
                {recipe.instructions}
              </p>

            </div>

          </div>

        </div>

      </div>

       </div>
  </div>
);
}
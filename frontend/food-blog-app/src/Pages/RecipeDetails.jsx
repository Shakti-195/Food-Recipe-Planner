import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaUserCircle, FaStar } from "react-icons/fa";
import { BsStopwatchFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://food-recipe-planner.onrender.com";

export default function RecipeDetails() {
const loadedRecipe = useLoaderData();

const [recipe, setRecipe] = useState(loadedRecipe);
const [comment, setComment] = useState("");
const [selectedRating, setSelectedRating] = useState(5);
const [editingCommentId, setEditingCommentId] = useState(null);
const [editedComment, setEditedComment] = useState("");
const [editedRating, setEditedRating] = useState(5);

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

    setRecipe((prev) => ({
    ...prev,
    comments: res.data.comments,
}));
    setComment("");

    toast.success("Comment added successfully!");
} catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Failed to add comment.");
    }
};

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

          {/* Comment Section */}

<div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">
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
    rows="4"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Write your comment..."
    className="w-full border rounded-lg p-3"
  />

  <button
    onClick={handleComment}
    className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
  >
    Post Comment
  </button>

  <div className="mt-6">
  {recipe?.comments?.length > 0 ? (
    recipe.comments.map((item) => (
      <div
        key={item._id}
        className="border rounded-lg p-4 mb-3 bg-gray-50"
      >
        <div className="flex justify-between items-center">

  <h3 className="font-semibold text-orange-600">
    👤 {item.userName}
  </h3>

  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`text-lg ${
          star <= item.rating
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ))}
  </div>

</div>

        <p className="mt-2 text-gray-700">
          {item.comment}
        </p>
        <div className="flex gap-3 mt-3">

  <button
    className="text-blue-600 hover:underline"
  >
    Edit
  </button>

  <button
    className="text-red-600 hover:underline"
  >
    Delete
  </button>

</div>

        <p className="text-xs text-gray-400 mt-2">
          {new Date(item.createdAt).toLocaleString()}
        </p>
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
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            {recipe.title}
          </h1>

          {/* Time */}
          <div className="flex items-center gap-2 text-orange-500 font-semibold text-lg mb-8">
            <BsStopwatchFill />
            <span>{recipe.time}</span>
          </div>

          {/* Rating Section */}
          <div className="bg-yellow-50 rounded-2xl p-6 mb-10 border border-yellow-200">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⭐ Recipe Rating
            </h2>

            <div className="flex items-center gap-2 mb-3">

              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-3xl cursor-pointer transition duration-300 hover:scale-125 ${
                    star <= Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              ))}

            </div>

            <p className="text-lg text-gray-700">
              <span className="font-bold text-orange-500">
                {averageRating}
              </span>{" "}
              / 5
            </p>

            <p className="text-gray-500">
              {totalRatings} Rating{totalRatings !== 1 ? "s" : ""}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Click on the stars to rate this recipe.
            </p>

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
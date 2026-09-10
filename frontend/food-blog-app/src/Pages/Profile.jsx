import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserCircle, FaEdit } from "react-icons/fa";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

    const handleUpdateProfile = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "https://food-recipe-planner.onrender.com/user/profile",
        {
          name: name.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setName(res.data.user.name);
      setIsEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

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

  <div className="flex items-center justify-between mb-3">

    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
      Full Name
    </p>

    {!isEditing && (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 font-semibold transition"
      >
        <FaEdit />
        Edit
      </button>
    )}

  </div>

  {isEditing ? (
    <div className="space-y-3">

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Enter your name"
      />

      <div className="flex gap-3">

        <button
          onClick={handleUpdateProfile}
          disabled={saving}
          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => {
            setName(user?.name || "");
            setIsEditing(false);
          }}
          disabled={saving}
          className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
        >
          Cancel
        </button>

      </div>

    </div>
  ) : (
    <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
      {user?.name || "Not available"}
    </p>
  )}

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

        {/* Member Since */}
<div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
    Member Since
  </p>

  <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
    {user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Not available"}
  </p>
</div>
        </div>

      </div>

    </div>
  );
}
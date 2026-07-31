import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-white">
<h2 className="flex items-center gap-2 text-3xl font-bold text-white">
   <GiKnifeFork className="text-emerald-400 text-3xl"/>
   Recipe Verse
</h2>
</h2>

<p className="mt-2 text-emerald-400 font-medium tracking-wide">
  Cook • Share • Discover
</p>
            <p className="mt-4 text-slate-400 leading-7">
              Discover, create and share delicious recipes with food lovers
              around the world.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-emerald-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/myRecipe" className="hover:text-emerald-400 transition">
                  My Recipes
                </a>
              </li>

              <li>
                <a href="/favRecipe" className="hover:text-emerald-400 transition">
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Developer */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Developer
            </h3>

            <p className="text-gray-400">
              Designed & Developed by
            </p>

            <h4 className="text-emerald-400 font-bold text-lg mt-1">
              Shakti Singh
            </h4>

            <div className="flex gap-4 mt-5">

              {/* Replace with your links */}

              <a
                href="https://github.com/Shakti-195"
                target="_blank"
                rel="noreferrer"
                className="text-2xl text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:-translate-y-1"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/"
                target="_blank"
                rel="noreferrer"
                className="text-2xl text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedin />
              </a>

            </div>
          </div>

        </div>

        <hr  className="border-slate-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <p>
            © 2026 Recipe Verse. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <FaHeart className="text-red-600" />
            by Shakti Singh using Mern-Stack
          </p>

        </div>

      </div>
    </footer>
  );
}
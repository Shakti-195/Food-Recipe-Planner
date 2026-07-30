import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-orange-500">
              🍽 Food Recipe Planner
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Discover, create and share delicious recipes with food lovers
              around the world.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-500 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/myRecipe" className="hover:text-orange-500 transition">
                  My Recipes
                </a>
              </li>

              <li>
                <a href="/favorites" className="hover:text-orange-500 transition">
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

            <h4 className="text-orange-500 font-bold text-lg mt-1">
              Shakti Singh
            </h4>

            <div className="flex gap-4 mt-5">

              {/* Replace with your links */}

              <a
                href="https://github.com/BugHunters195"
                target="_blank"
                rel="noreferrer"
                className="text-2xl hover:text-orange-500 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-2xl hover:text-orange-500 transition"
              >
                <FaLinkedin />
              </a>

            </div>
          </div>

        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <p>
            © 2026 Visionary Engineering. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <FaHeart className="text-red-500" />
            using React, Node.js & MongoDB
          </p>

        </div>

      </div>
    </footer>
  );
}
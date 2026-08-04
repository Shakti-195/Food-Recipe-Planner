import React from "react";

import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaXTwitter, FaHeart } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";


export default function Footer() {
  const socialClass =
    "text-[27px] text-slate-300 transition-all duration-300 hover:-translate-y-1";
  return (
    
      <footer className="bg-gray-900 dark:bg-slate-900 border-t border-slate-800 text-gray-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-start">

          {/* Brand */}

         <div className="text-center sm:text-left">
            
<h2 className="flex items-center justify-center sm:justify-start gap-2 text-2xl md:text-3xl font-extrabold">
  <GiKnifeFork className="text-emerald-400 text-3xl flex-shrink-0" />

  <span className="text-white">
    Recipe<span className="text-emerald-400">Verse</span>
  </span>
</h2>

<p className="mt-3 text-sm uppercase tracking-[0.25em] text-emerald-400 font-semibold">
  Cook • Share • Discover
</p>      <p className="mt-4 text-slate-400 leading-7">
              Discover, create and share delicious recipes with food lovers
              around the world.
            </p>
          </div>

          {/* Quick Links */}

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
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

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold text-white mb-5">
              Developer
            </h3>

            <p className="text-sm text-slate-400">
              Designed & Developed by
            </p>

            <h4 className="text-emerald-400 font-bold text-lg mt-1">
              Shakti Singh
            </h4>

            <div className="flex justify-center sm:justify-start gap-7 mt-6">

              {/* Replace with your links */}

              <a
                href="https://github.com/Shakti-195"
                target="_blank"
                rel="noreferrer"
               className={`${socialClass} hover:text-emerald-400`}
              >
               <FaGithub className={`${socialClass} hover:text-emerald-400`} />
              </a>

              <a
                href="https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/"
                target="_blank"
                rel="noreferrer"
               className={`${socialClass} hover:text-emerald-400`}
              ><FaLinkedin className={`${socialClass} hover:text-blue-400`} />
              </a>

              <a
  href="https://www.instagram.com/er.shaktisingh_195"
  target="_blank"
  rel="noreferrer"
  className={`${socialClass} hover:text-emerald-400`}
>
  <FaInstagram className={`${socialClass} hover:text-pink-500`} />
</a>

 <a
    href="https://x.com/Shakti_Singh195"
    target="_blank"
    rel="noreferrer"
  className={`${socialClass} hover:text-emerald-400`}
  >
    <FaXTwitter className={`${socialClass} hover:text-black`} />
  </a>

  <a
    href="https://www.facebook.com/profile.php?id=61554831303957"
    target="_blank"
    rel="noreferrer"
    className={`${socialClass} hover:text-emerald-400`}
  >
   <FaFacebook className={`${socialClass} hover:text-blue-600`} />
  </a>

            </div>
          </div>

        </div>

        <hr  className="border-slate-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm">

          <p>
            © 2026 RecipeVerse. All Rights Reserved.
          </p>
<p className="flex items-center gap-2 text-slate-400">
  Made with
  <FaHeart className="text-red-500 animate-pulse" />
  by <span className="font-semibold text-emerald-500">Shakti Singh</span> using{" "}
  <span className="font-semibold text-emerald-400">MERN Stack</span>
</p>

        </div>

      </div>
    </footer>
  );
}
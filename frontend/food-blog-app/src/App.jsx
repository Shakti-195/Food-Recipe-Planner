import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './Pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './Pages/AddFoodRecipe'
import EditRecipe from './Pages/EditRecipe'
import RecipeDetails from './Pages/RecipeDetails.jsx'
import NotFound from './Pages/NotFound';
import BackToTop from "./components/BackToTop";
import Profile from "./Pages/Profile";

const API_URL = "https://food-recipe-planner.onrender.com";

const getAllRecipes = async () => {
  let allRecipes = [];

  try {
    const res = await axios.get(`${API_URL}/recipe`);
    allRecipes = res.data;
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }

  return allRecipes;
}

const getMyRecipes = async () => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) return [];

    let allRecipes = await getAllRecipes();

    console.log("User ID:", user._id);
    console.log("All Recipes:", allRecipes);

    const myRecipes = allRecipes.filter(
      item => String(item.createdBy) === String(user._id)
    );

    console.log("My Recipes:", myRecipes);

    return myRecipes;

  } catch (err) {
    console.error("Error fetching my recipes:", err);
    return [];
  }
}

const getFavRecipes = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return [];

    const res = await axios.get(`${API_URL}/user/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return [];
  }
};
const getRecipe = async ({ params }) => {
  try {
    let recipe;

    const recipeRes = await axios.get(`${API_URL}/recipe/${params.id}`);
    recipe = recipeRes.data;

    if (recipe.createdBy) {
      try {
        const userRes = await axios.get(`${API_URL}/user/${recipe.createdBy}`);

        recipe = {
          ...recipe,
          email: userRes.data.email
        };

      } catch (err) {
        console.error("User fetch failed:", err);

        recipe = {
          ...recipe,
          email: "Unknown"
        };
      }
    }

    return recipe;

  } catch (err) {
    console.error("Recipe fetch failed:", err);
    return null;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipes
      },
      {
        path: "/myRecipe",
        element: <Home />,
        loader: getMyRecipes
      },
      {
        path: "/favRecipe",
        element: <Home />,
        loader: getFavRecipes
      },
      {
        path: "/addRecipe",
        element: <AddFoodRecipe />
      },
      {
        path: "/editRecipe/:id",
        element: <EditRecipe />
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetails />,
        loader: getRecipe
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <BackToTop />
    </>
  )
}
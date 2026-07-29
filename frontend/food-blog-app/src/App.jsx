import {createBrowserRouter,RouterProvider} from "react-router-dom"
import React from 'react'
import "./App.css"
import Home from './pages/Home'
import MainNavigation from "./components/MainNavigation"
import axios from 'axios'
import AddFoodRecipe from "./Pages/AddFoodRecipe"

const getaLLRecipes=async()=>{
  let aLLRecipes=[]
    await axios.get('http://localhost:5000/recipe').then(res=>{
      aLLRecipes=res.data
    })
    return  aLLRecipes
}

const getMyrecipe=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getaLLRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const router = createBrowserRouter([
  {path:'/',element:<MainNavigation/>,children:[
    {path:"/",element:<Home/>,loader:getaLLRecipes},
    {path:"/myRecipe",element:<Home/>,loader:getMyrecipe},
    {path:"/favRecipe",element:<Home/>},
    {path:"/addRecipe",element:<AddFoodRecipe/>},
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}



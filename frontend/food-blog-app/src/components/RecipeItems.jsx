import React from "react";
import { useLoaderData } from "react-router-dom";
import fooding from "../assets/foodrecipe2.webp";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";

export default function RecipeItems() {
    const allRecipes = useLoaderData();

    return (
        <div className="card-container">
            {allRecipes?.map((item, index) => (
                
                <div key={index} className="card">
                    <img
                        src={`http://localhost:5000/images/${item.coverImage}`}
                        width="120"
                        height="100"
                        alt={item.title}
                    />

                    <div className="card-body">
                        <div className="title">{item.title}</div>

                        <div className="icons">
                            <div className="timer">
                                <BsStopwatchFill />
                                <span>{item.time}</span>
                            </div>

                            <FaHeart />
                        </div>
                    </div>
                </div>
            
            ))}
        </div>
    );
}
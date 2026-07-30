import React from 'react'
import profileImg from '../assets/profile.png'
import food from '../assets/cholebhature.jpg'
import { useLoaderData } from 'react-router-dom'


export default function RecipeDetails() {
    const recipe = useLoaderData();

    return (
        <>
            <div className='outer-container'>
                <div className='profile'>
                    <img src={profileImg} width="50" height="50" alt="Profile" />
                    <h5>{recipe.email}</h5>
                </div>

                <h3 className='title'>{recipe.title}</h3>

                <img
                    src={`http://localhost:5000/images/${recipe.coverImage}`}
                    width="220"
                    height="200"
                    alt={recipe.title}
                />

                <div className='recipe-details'>
                    <div className='ingredients'>
                        <h4>Ingredients</h4>
                        <ul>
                            {recipe.ingredients
                                .split(",")
                                .map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))}
                        </ul>
                    </div>

                    <div className='instructions'>
                        <h4>Instructions</h4>
                        <span>{recipe.instructions}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
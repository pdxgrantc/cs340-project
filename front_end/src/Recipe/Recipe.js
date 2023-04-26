import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// Firebase
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignedOut from '../SignedOut';
import { Link } from 'react-router-dom';

export default function AllRecipes() {
    const [user] = useAuthState(auth);

    if (!user) {
        return (
            <>
                <div className="mx-auto bg-main_bg_color text-text_white min-h-[100vh] flex flex-col">
                    <Header />
                    <div className="w-full basis-auto grow">
                        <div className='mx-auto w-fit'>
                            <SignedOut />
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Helmet>
                    <title>Recipe</title>
                </Helmet>
                <div className="bg-main_bg_color text-text_white min-h-[100vh] flex flex-col">
                    <Header />
                    <div className="w-full basis-auto grow">
                        <div className='m-auto rounded-[10px] h-[80%] bg-black w-[90%]'>
                            <div className='flex gap-20 w-[100%] px-[4%] py-[3%]'>
                                <RecipeContent />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}

function RecipeContent() {
    const [recipe, setRecipe] = useState([]);

    // get the recipe id from the url
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/recipe/' + id);
            const data = await response.json();
            setRecipe(data);
        }
        fetchData();
    }, []);

    console.log(recipe);

    if (!recipe) {
        return (
            <h1 className='text-[3rem]'>Loading...</h1>
        )
    }
    else {
        return (
            <div className='w-full'>
                <Helmet>
                    <title>{recipe.title}</title>
                </Helmet>
                <div className='flex gap-10 justify-between px-[20px]'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-[3.25rem] font-semibold'>{recipe.title}</h1>
                        <h2 className='text-[1.75rem]'>{recipe.description}</h2>
                    </div>
                    <img className='w-[60%] rounded-[10px]' src={recipe.image_url} alt={recipe.title} />
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.items && recipe.items.map((ingredient, index) => (
                            <li key={index}>{ingredient.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Instructions</h2>
                    <h3>{recipe.instructions}</h3>
                </div>
            </div>
        );

    }
}
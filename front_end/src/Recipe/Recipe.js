import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsCardChecklist } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa';

// Firebase
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignedOut from '../SignedOut';

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
    const [user] = useAuthState(auth);
    const [recipe, setRecipe] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    // get the recipe id from the url
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/recipe/' + id);
            const data = await response.json();
            setRecipe(data);
            // in the instructions create an array of strings, each string is a line
            // in the instructions
            let instructions = data.instructions.split('\n');
            // remove the last element of the array, which is an empty string
            instructions.pop();
            // set the instructions to the new array
            setRecipe({ ...data, instructions: instructions });
            // print the instructions array
        }
        fetchData();
    }, [id]);

    // check if the recipe is in the user's saved recipes
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/recipe/' + id + '/issaved/user/' + user.uid);
            const data = await response.json();
            setIsLiked(data.value);
        }
        fetchData();
    }, [id, user.uid]);

    const handleAddToSaved = async () => {
        if (isLiked) {
            setIsLiked(!isLiked);
            // remove the recipe from the user's saved recipes
            const response = await fetch('/api/recipe/' + id + '/unsave/user/' + user.uid, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            await response.json();
        }
        else {
            setIsLiked(!isLiked);
            // add the recipe to the user's saved recipes
            const response = await fetch('/api/recipe/' + id + '/save/user/' + user.uid, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            await response.json();
        }
    };

    const handleDeleteRecipe = async () => {
        // delete the recipe and its data from the database
        const response = await fetch('/api/recipe/' + id + "/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        await response.json().then(() => {
            window.location.href = '/';
        });
    }

    const handleAddToShoppingList = async () => {
        // add the recipe's ingredients to the user's shopping list
        const response = await fetch('/api/recipe/' + id + '/shopping/add/user/' + user.uid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        await response.json();
    };

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
                <div className='flex flex-col gap-[3rem] px-[20px]'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex gap-10 min-w-[800px] justify-between'>
                            <h1 className='text-[4.25rem] font-semibold'>{recipe.title}</h1>
                            <div className='flex gap-3'>
                                {isLiked ?
                                    <div>
                                        <button className='flex gap-5 px-5 py-2 hover:bg-major_button rounded-[4px]' onClick={handleAddToShoppingList}>
                                            <h3 className='text-[2.5rem] align-middle'>Add to Shopping List</h3>
                                            <BsCardChecklist className='text-[4rem]' />
                                        </button>
                                    </div>
                                    :
                                    <></>
                                }
                                <div>
                                    {isLiked ?
                                        <button className='flex gap-5 px-5 py-2 hover:bg-major_button rounded-[4px]' onClick={handleAddToSaved}>
                                            <h3 className='text-[2.5rem] align-middle'>Saved</h3>
                                            <AiFillHeart className='text-[4rem] text-red-500' color="red" />
                                        </button>
                                        :
                                        <button className='flex gap-5 px-5 py-2 hover:bg-major_button rounded-[4px]' onClick={handleAddToSaved}>
                                            <h3 className='text-[2.5rem] align-middle cursor-pointer'>Save</h3>
                                            <AiOutlineHeart className='text-[4rem] text-red-500' />
                                        </button>
                                    }
                                </div>
                                <div>
                                    <button onClick={handleDeleteRecipe} className='flex gap-5 px-5 py-2 hover:bg-major_button rounded-[4px]'>
                                        <h3 className='text-[2.5rem] align-middle'>Delete</h3>
                                        <FaTrashAlt className='text-[4rem]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-10'>
                            <img className='w-[65%] h-fit rounded-[10px]' src={recipe.image_url} alt={recipe.title} />
                            <h2 className='text-[1.75rem]'>{recipe.description}</h2>
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='min-w-[500px]'>
                            <h2 className='text-[2rem] font-semibold'>Ingredients</h2>
                            <div className='flex pl-1 gap-3'>
                                <ul >
                                    {recipe.items && recipe.items.map((item, index) => (
                                        <li key={index}>
                                            <p className='text-[1.5rem]'>
                                                {item.amount}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {recipe.items && recipe.items.map((item, index) => (
                                        <li key={index}>
                                            <p className='text-[1.5rem]'>
                                                {item.name}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-[2rem] font-semibold'>Instructions</h2>
                            <ol className='pl-3'>
                                {recipe.instructions && recipe.instructions.map((instruction, index) => (
                                    <li className='text-[1.5rem]' key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

// Firebase
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignedOut from '../SignedOut';

export default function CreateRecipe() {
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
                    <title>Create Recipe</title>
                </Helmet>
                <div className="bg-main_bg_color text-text_white min-h-[100vh] flex flex-col">
                    <Header />
                    <div className="w-full basis-auto grow">
                        <div className='m-auto rounded-[10px] h-[80%] bg-black w-[90%]'>
                            <div className='flex gap-20 w-[100%] px-[4%] py-[3%]'>
                                <Content />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}

function Content() {
    const [items, setItems] = useState([{ amount: "", name: "" }]); // initial state with one object with empty strings
    const addInput = () => setItems([...items, { amount: "", name: "" }]); // add a new object with empty strings to the items array

    const [recipeName, setRecipeName] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');


    const handleInputChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // ensure that all fields are filled out
        if (recipeName === '' || recipeImage === '' || recipeDescription === '' || recipeInstructions === '' || items.length === 0) {
            alert('Please fill out all fields')
            return
        }
        
        // package the data into a JSON object
        const data = {
            recipeName: recipeName,
            recipeImage: recipeImage,
            recipeDescription: recipeDescription,
            recipeInstructions: recipeInstructions,
            items: items
        }

        // send the data to the backend
        // /api/recipe/create
        fetch('/api/recipe/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            ClearForm()
        })
    };

    const ClearForm = () => {
        setRecipeName('')
        setRecipeImage('')
        setRecipeDescription('')
        setRecipeInstructions('')
        setItems([{ amount: "", name: "" }])
    }

    return (
        <div className='flex flex-col'>
            <h1 className='text-[3.25rem] font-semibold'>Create a New Recipe</h1>
            <form onSubmit={handleSubmit} className='text-[1.5rem]'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-4'>
                            <label>Recipe Name</label>
                            <input
                                type="text"
                                placeholder="Recipe Name"
                                className='outline-none text-black px-2 rounded-[4px]'
                                onChange={(event) => { setRecipeName(event.target.value) }}
                                value={recipeName}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <label>Image URL: </label>
                            <input
                                type="text"
                                placeholder="Image URL"
                                className='outline-none text-black px-2 rounded-[4px]'
                                onChange={(event) => { setRecipeImage(event.target.value) }}
                                value={recipeImage}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[2.25rem] font-semibold'>Description</h2>
                            <textarea
                                placeholder='Description'
                                className='outline-none w-full text-black px-2 rounded-[4px]'
                                onChange={(event) => { setRecipeDescription(event.target.value) }}
                                value={recipeDescription}
                            />
                        </div>
                        <h2 className='text-[2.25rem] font-semibold'>Ingredients</h2>
                        {items.map((item, index) => (
                            <div className='flex gap-2'>
                                <label key={index}>{index + 1}. </label>
                                <input
                                    key={index}
                                    value={item.amount}
                                    placeholder='Amount'
                                    onChange={(event) => handleInputChange(index, "amount", event.target.value)}
                                    className='outline-none text-black px-2 rounded-[4px]'
                                />
                                <input
                                    key={index}
                                    value={item.name}
                                    placeholder='Name of ingredient'
                                    onChange={(event) => handleInputChange(index, "name", event.target.value)}
                                    className='outline-none text-black px-2 rounded-[4px]'
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addInput}
                            className="whitespace-nowrap text-[1.6rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]">
                            Add Item
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-[2.25rem] font-semibold'>Instructions</h2>
                        <textarea
                            placeholder='Instructions'
                            className='outline-none w-full text-black px-2 rounded-[4px]'
                            onChange={(event) => { setRecipeInstructions(event.target.value) }}
                            value={recipeInstructions}
                        />
                    </div>
                    <div className='flex gap-3'>
                        <button
                            type="submit"
                            className="whitespace-nowrap text-[1.6rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]">
                            Create Recipe
                        </button>
                        <button
                            type="button"
                            onClick={ClearForm}
                            className="whitespace-nowrap text-[1.6rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]">
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

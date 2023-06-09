import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

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
          <title>My Recipes</title>
        </Helmet>
        <div className="bg-main_bg_color text-text_white min-h-[100vh] flex flex-col">
          <Header />
          <div className="w-full basis-auto grow">
            <div className='m-auto rounded-[10px] h-[80%] bg-black w-[90%]'>
              <div className='flex gap-20 w-[100%] px-[4%] py-[3%]'>
                <RecipeList />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

function RecipeList() {
  const [user] = useAuthState(auth);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/recipe/user/' + user.uid);
      const data = await response.json();
      setRecipes(data);
    }
    fetchData();
  }, [user.uid]);

  return (
    <>
      <div className='flex flex-col'>
        <h1 className='text-[3.75rem] font-semibold pl-8'>My Recipes</h1>
        <div className='grid grid-cols-2 gap-3'>
          {recipes.length === 0 ?
            <div className='pl-8'>
              <h2 className='text-[2.75rem]'>You have no saved recipes.</h2>
              <Link
                to='/'
                className="whitespace-nowrap text-[1.6rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]">
                All recipes
              </Link>
            </div>
            :
            recipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <div className='flex flex-col gap-3 px-8 py-3 hover:bg-major_button transition duration-[200ms] hover:bg-opacity-95 hover:text-white w-full rounded-[4px]'>
                  <h2 className='text-[2.5rem] font-semibold'>{recipe.title}</h2>
                  <img className='w-full h-fit rounded-[4px]' src={recipe.image_url} alt={recipe.title} />
                  <p className='text-[1.5rem]'>{recipe.description}</p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

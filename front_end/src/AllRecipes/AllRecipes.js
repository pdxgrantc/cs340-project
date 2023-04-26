import React, { useState, useEffect } from 'react'
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
          <title>All Recipes</title>
        </Helmet>
        <div className="bg-main_bg_color text-text_white h-[100vh] flex flex-col">
          <Header />
          <div className="w-full h-max basis-auto grow">
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
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image_url} alt={recipe.title} />
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

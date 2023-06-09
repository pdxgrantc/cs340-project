import React, { useState, useEffect } from 'react'
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
          <title>All Recipes</title>
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
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/recipes/all');
      const data = await response.json();
      setRecipes(data);
      // for the description, only show the first sentence
      for (let i = 0; i < data.length; i++) {
        let description = data[i].description;
        let firstSentence = description.split('.')[0];
        data[i].description = firstSentence;
      }
      // then append the original '.' to the end
      for (let i = 0; i < data.length; i++) {
        data[i].description += '.';
      }
    }
    fetchData();
  }, []);

  const ExecuteSearch = () => {
    async function fetchData() {
      const response = await fetch('/api/recipes/search/' + search);
      const data = await response.json();

      setRecipes(data);

      // for the description, only show the first sentence
      for (let i = 0; i < data.length; i++) {
        let description = data[i].description;
        let firstSentence = description.split('.')[0];
        data[i].description = firstSentence;
      }
      // then append the original '.' to the end
      for (let i = 0; i < data.length; i++) {
        data[i].description += '.';
      }

      // set search back to empty string
      setSearch('');
    }
    fetchData();
  }

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h1 className='text-[3.75rem] font-semibold pl-8'>All Recipes</h1>
        <div className='flex flex-row gap-5 pl-8'>
          <input
            className='px-3 rounded-[4px] outline-none text-[2.5rem] text-black w-[50%]'
            type='text'
            placeholder='Search for a recipe'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="font-semibold whitespace-nowrap text-[2rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]"
            onClick={ExecuteSearch}>
            Search
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <div className='flex flex-col gap-3 px-8 py-3 hover:bg-major_button transition duration-[200ms] hover:bg-opacity-95 hover:text-white w-full rounded-[4px]'>
              <h2 className='text-[2.5rem] font-semibold'>{recipe.title}</h2>
              <img className='w-full h-auto rounded-[4px]' src={recipe.image_url} alt={recipe.title} />
              <p className='text-[1.5rem]'>{recipe.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

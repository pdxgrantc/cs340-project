import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import MyRecipes from "./MyRecipes/MyRecipes";
import AllRecipes from "./AllRecipes/AllRecipes";
import Shoppinglist from "./ShoppingList/Shoppinglist";
import Recipe from "./Recipe/Recipe";
import FourOFour from "./404/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/Shopping-List" element={<Shoppinglist />} />
        <Route path="*" element={<FourOFour />} />
        <Route path='/404' element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

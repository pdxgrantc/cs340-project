import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from "./Home/Home";
import FourOFour from "./404/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<FourOFour />} />
        <Route path='/404' element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
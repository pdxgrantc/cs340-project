import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


export default function FourOFour() {
  return (
    <>
      <Helmet>
        <title>Recipes - Home</title>
      </Helmet>
      <div className="bg-main_bg_color text-text_white h-[100vh] flex flex-col">
        <Header />
        <div className="w-full h-max basis-auto grow">
          <div className='m-auto rounded-[10px] h-[80%] bg-black w-[90%]'>
            <div className='text-center flex gap-5 w-[100%] px-[4%] py-[3%] flex-col'>
              <h1 className='text-[3.5rem] font-semibold'>404 Error - Page Not Found</h1>
              <Link to={'/'} className="font-semibold m-auto cursor-pointer w-fit text-[3rem] border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[2.75vw] py-[.4vh] w-fit align-middle">Go Home</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

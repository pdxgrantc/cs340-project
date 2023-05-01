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

export default function Shoppinglist() {
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
                    <title>Shopping List</title>
                </Helmet>
                <div className="bg-main_bg_color text-text_white min-h-[100vh] flex flex-col">
                    <Header />
                    <div className="w-full basis-auto grow">
                        <div className='m-auto rounded-[10px] h-[80%] bg-black w-[90%]'>
                            <div className='flex gap-20 w-[100%] px-[4%] py-[3%]'>
                                <ListContent />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}

function ListContent() {
    const [user] = useAuthState(auth);
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/user/' + user.uid + '/list');
            const data = await response.json();
            setShoppingList(data);
        }
        fetchData();
    }, [user]);

    const clearList = () => {
        fetch('/api/user/' + user.uid + '/list/clear', {
            method: 'DELETE',
        })
        setShoppingList([]);
    }

    return (
        <div className='flex flex-col w-[80%]'>
            <div className='flex gap-5 w-full justify-between'>
                <h1 className='text-[3.75rem] font-semibold'>{user.displayName + "'s Shopping List"}</h1>
                {shoppingList.length !== 0 ?
                    <button onClick={clearList}
                        className="my-auto h-fit whitespace-nowrap text-[2rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]">
                        Clear List
                    </button>
                    :
                    <></>
                }
            </div>
            <div className='flex flex-col pl-5'>
                {shoppingList.length !== 0 ?
                    <>
                        {shoppingList.map((item, index) => (
                            <div className='flex gap-10'>
                                <div className='text-[2rem] flex gap-5'>
                                    <p>{index + 1 + "."}</p>
                                    <p>{item.name}</p>
                                    <p>{item.amount}</p>
                                </div>
                                <Link
                                    to={'/recipe/' + item.recipe_id}
                                    className="align-middle h-fit whitespace-nowrap text-[2rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]">
                                    Link to Recipe
                                </Link>
                            </div>
                        ))}
                    </>
                    :
                    <p className='text-[2rem]'>Shopping list is empty</p>
                }
            </div>
        </div>
    )
}
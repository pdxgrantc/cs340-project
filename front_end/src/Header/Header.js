import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { IoCreate } from 'react-icons/io5';
import { RiUserSettingsFill } from 'react-icons/ri';
import { MdChecklist } from 'react-icons/md';

// Firebase
import { auth, signInWithGoogle, signOutUser } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// SVGs
import { ReactComponent as Basket } from './basket.svg'
import { ReactComponent as PersonIcon } from './person-icon.svg'

export default function Header() {
    const [user] = useAuthState(auth)

    // get user's display name
    const [displayName, setDisplayName] = useState('')

    const uid = user ? user.uid : ''

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/user/' + uid + '/getInfo')
            const data = await response.json()
            setDisplayName(data.display_name)
        }
        fetchData()
    }, [user, uid])

    if (user) {
        return (
            <>
                <div className="bg-dark_grey w-[100%] h-[80px] mb-[5vh]">
                    <div className="h-[100%] flex justify-between pr-[3vw]">
                        <Link to="/">
                            <div className='flex gap-7 h-[100%] w-[28rem] bg-black pl-[2vw]'>
                                <Basket className='h-[4.5rem] my-auto'></Basket>
                                <h1 className="align-middle text-[3.25rem] font-bold cursor-pointer" to="/">Recipes+</h1>
                            </div>
                        </Link>
                        <div className="my-auto flex justify-around">
                            <TopNav icon={<UserPhoto />} name={displayName}>
                                <DropdownMenu></DropdownMenu>
                            </TopNav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="bg-dark_grey w-[100%] h-80px my-auto mb-[5vh]">
                <div className="h-[100%] flex justify-between pr-[3vw]">
                    <Link to="/">
                        <div className='flex gap-7 h-[100%] w-[25vw] bg-black pl-[2vw]'>
                            <Basket className='h-[4.5rem] my-auto'></Basket>
                            <h1 className="align-middle text-[3.25rem] font-bold cursor-pointer" to="/">Sign In</h1>
                        </div>
                    </Link>
                    <div
                        onClick={signInWithGoogle}
                        className="flex font-semibold text-[1.75rem] hover:bg-text_grey transition duration-[200ms] h-fit my-auto py-[0.1rem] px-[.5rem] rounded-[4px] hover:bg-opacity-50 cursor-pointer">
                        <h1 className="whitespace-nowrap m-auto">Sign In</h1>
                        <PersonIcon className="w-[45px] h-[45px] m-auto"></PersonIcon>
                    </div>
                </div>
            </div>
        )
    }
}

function TopNav(props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Link to="#" className="text-[2.25rem] w-fit" onClick={() => setOpen(!open)}>
                <div className="flex hover:bg-text_grey hover:bg-opacity-50 transition duration-[200ms] rounded-[4px] px-[1rem] h-min gap-[1vw]">
                    <p className="whitespace-nowrap my-auto font-semibold">{props.name}</p>
                    <div className='my-[6px] w-[55px] align-middle'>
                        {props.icon}
                    </div>
                </div>
            </Link>
            {open && props.children}
        </div>
    );
}

function UserPhoto() {
    const [user] = useAuthState(auth);

    return (
        <div className="m-auto">
            <img className="rounded-[100%] h-[90%] w-[90%] m-auto align-middle" src={user.photoURL} alt={PersonIcon} />
        </div>
    )
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');

    function DropdownItem(props) {
        if (props.route) {
            return (
                <Link to={props.route} className="menu-item hover:bg-text_white hover:bg-opacity-50 font-semibold text-[1.25rem] whitespace-nowrap" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                    <span className="icon-button">{props.leftIcon}</span>
                    {props.children}
                    <span className="icon-right">{props.rightIcon}</span>
                </Link>
            );
        }
        else {
            return (
                <Link to="#" className="menu-item hover:bg-text_white hover:bg-opacity-50 font-semibold text-[1.25rem] whitespace-nowrap" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                    <span className="icon-button">{props.leftIcon}</span>
                    {props.children}
                    <span className="icon-right">{props.rightIcon}</span>
                </Link>
            );
        }
    }

    function AllRecipes() {
        return (
            <DropdownItem
                leftIcon={<Basket />}
                route="/">
                All Recipes
            </DropdownItem>
        )
    }

    function MyRecipes() {
        return (
            <DropdownItem
                leftIcon={<Basket />}
                route="/My-Recipes">
                My Recipes
            </DropdownItem>
        )
    }

    function ShoppingList() {
        return (
            <DropdownItem
                leftIcon={<MdChecklist className='w-[1.8rem] h-auto' />}
                route="/Shopping-List">
                Shopping List
            </DropdownItem>
        )
    }

    function UserSettings() {
        return (
            <DropdownItem
                leftIcon={<RiUserSettingsFill className='w-[1.8rem] h-auto' />}
                route="/User-Settings">
                User Settings
            </DropdownItem>
        )
    }

    function CreateRecipe() {
        return (
            <DropdownItem
                leftIcon={<IoCreate className='w-[1.8rem] h-auto' />}
                route="/Create-Recipe">
                Create Recipe
            </DropdownItem>
        )
    }

    return (
        <div className="dropdown absolute translate-x-[26%] top-[80px] right-[7.3vw] w-[250px]">
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit>
                <div className="menu">
                    <AllRecipes></AllRecipes>
                    <MyRecipes></MyRecipes>
                    <ShoppingList></ShoppingList>
                    <UserSettings></UserSettings>
                    <CreateRecipe></CreateRecipe>
                    <div onClick={signOutUser}>
                        <DropdownItem
                            leftIcon={<PersonIcon />}>
                            Sign Out
                        </DropdownItem>
                    </div>

                </div>
            </CSSTransition>
        </div>
    );
}

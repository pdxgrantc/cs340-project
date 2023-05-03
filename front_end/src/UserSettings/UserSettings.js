import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

// Firebase
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignedOut from '../SignedOut';

export default function UserSettings() {
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
                    <title>User Settings</title>
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
    const [user] = useAuthState(auth);
    const [displayName, setDisplayName] = useState('');

    // /api/user/updateInfo/:uid

    const updateDisplayName = () => {
        if (displayName === '') {
            alert('Your name cannot be blank.');
            return;
        }

        fetch('/api/user/' + user.uid + '/updateInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                displayName: displayName
            })
        }).then(Response => {
            setDisplayName('');
        }).then(() => {
            // refresh page
            window.location.reload();
        })
    }

    // take input for display name and email  
    return (
        <div>
            <h1 className='text-[3.75rem]'>Settings</h1>
            <div className='text-[2.25rem] flex flex-col gap-5'>
                <div className='flex gap-10'>
                    <h2>Change Name</h2>
                    <input
                        className='text-[1.75rem] outline-none px-3 rounded-[4px] text-black'
                        type="text"
                        placeholder="New Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}>
                    </input>
                </div>
                <button
                    className="whitespace-nowrap text-[1.6rem] leading-8 cursor-pointer w-fit border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[1.5vw] py-[.25rem]"
                    onClick={updateDisplayName}>
                    Save Changes
                </button>
            </div>
        </div>
    )
}
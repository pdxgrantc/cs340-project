import React from 'react'
import { Helmet } from 'react-helmet'

// firebase
import { signInWithGoogle } from './firebase'

export default function SignedOut() {
    return (
        <>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <div className="py-[16vh] bg-black rounded-[6px]">
                <div>
                    <h2 className="mx-[7rem] text-[3.25rem] text-center">You must be signed in to Google to use this app</h2>
                </div>
                <div className="h-[9vh]"></div>
                <div className="m-auto w-fit">
                    <button onClick={signInWithGoogle} className="m-auto cursor-pointer w-fit text-[2.75rem] border-b-[1.5px] hover:bg-button_accent_color hover:ease-[cubic-bezier(0.4, 0, 1, 1)] duration-[350ms] hover:px-[2.75vw] py-[.4vh] w-fit align-middle">Sign in With Google</button>
                </div>
            </div>
        </>
    )
}

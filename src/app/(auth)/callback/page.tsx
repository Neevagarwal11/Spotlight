import { onAuthenticateuser } from '@/actions/auth';
import React from 'react'
import {redirect} from 'next/navigation'
//TODO: Implement the auth callback page
export const dynamic = "force-dynamic";     //Makes it a dynamic page and prevents it from being statically rendered and cached

const AuthCallbackPage = async () => {
    const auth = await onAuthenticateuser();
    if(auth.status === 200 || auth.status === 201){
        redirect('/home')
    }else if (auth.status === 403 || auth.status === 500 || auth.status === 400){
        redirect('/')
    }

    return <div>CallbackPage</div>
}

export default AuthCallbackPage
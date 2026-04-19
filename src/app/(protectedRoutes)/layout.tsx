import { onAuthenticateuser } from '@/actions/auth'
import Header from '@/components/ReusableComponents/LayoutComponents/Header'
import Sidebar from '@/components/ReusableComponents/LayoutComponents/Sidebar'
import { on } from 'events'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = async ({ children }: Props) => {
    const userExist = await onAuthenticateuser();
    if(!userExist.user){
        redirect('/sign-in')
    }




  return (
    <div className='flex w-full min-h-screen'>

        {/* SIDEBAR */}
        <Sidebar/>

        <div className='flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto'>

            {/* Header */}
            <Header user = {userExist.user}/>
            <div className='flex-1 py-10'>{children}</div>

            
        </div>
    </div>
  )
}

export default layout
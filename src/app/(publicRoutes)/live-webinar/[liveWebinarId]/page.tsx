import { onAuthenticateuser } from '@/actions/auth'
import { getWebinarById } from '@/actions/webinar'
import React from 'react'
import RenderWebinar from './_components/RenderWebinar'

type Props={

    params:Promise<{
        liveWebinarId:string
    }>
    searchParams: Promise<{
        error:string
    }>

}

const page = async ({params,searchParams} : Props) => {


    const { liveWebinarId } = await params
    const {error} = await searchParams

    const webinarData = await getWebinarById(liveWebinarId)
    if(!webinarData){
        return(
            <div className='w-full min-h-screen flex justify-center items-center text-lg sm:text-4xl'>
                Webinar not found
            </div>
        )
    }

    const checkUser = await onAuthenticateuser()

    // TODO: Create API keys

    const apikey = 'process.env.STREAM_API_KEY' as string
    const token = 'process.env.STREAM_TOKEN' as string
    const callId = 'process.env.STREAM_CALL_ID' as string


  return (
    <div className='w-full min-h-screen mx-auto'>
        <RenderWebinar
            apiKey = {apikey}
            token = {token}
            callId = {callId}
            user = {checkUser.user || null}
            error = {error}
            webinar={webinarData}
        />
    </div>

  )
}

export default page
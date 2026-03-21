'use client'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { OnBoardingSteps } from '@/lib/data'

const OnBoarding = () => {
  return (
    <div className='flex flex-col gap-1 items-start justify-start'>
        {OnBoardingSteps.map((step,index) =>(
            <Link key={index} href={step.link} className='flex items-center gap-2'>
            <CheckCircle/> 
            <p className='text-base text-foreground'>{step.title}</p>
            </Link>
        ))}
    </div>

  )
}

export default OnBoarding
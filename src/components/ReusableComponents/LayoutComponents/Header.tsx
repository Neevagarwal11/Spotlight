'use client'
import React from 'react'
import { usePathname, useRouter} from 'next/navigation';
import {User} from '@prisma/client'
import { Button } from '@/components/ui/button';
import { ArrowLeft, CloudLightning, Zap } from 'lucide-react';
import PurpleIcon from '../Purpelicon/index';
import CreateWebinarButton from '../CreateWebinarButton';
import Stripe from 'stripe';
import {StripeElements} from '../Stripe/StripeElements';
import SubscriptionModal from '../SubscriptionModal';


type Props={user : User , stripeProducts: Stripe.Product[] | []}

// TODO :  assistant
const Header = ({ user, stripeProducts }: Props) => {
    const pathname = usePathname();
    const router = useRouter();

  return (
    <div className='w-full px-4 p-10  sticky top-0 z-10 flex justify-between items-center  flex-wrap gap-4 bg-background'>
        {pathname.includes("pipeline") ? 
        <Button className='bg-primary/10 border border-border rounded-xl' variant={'outline'} onClick={() => router.push('/webinar')}>
            <ArrowLeft/>
        </Button>
        : 
        <div className='px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize'>
            {pathname.split('/')[1]}
        </div>
        }


    {/* TODO: build stripe subscription and create webinar button */}
        <div className='flex gap-6 items-center flex-wrap'>
            <PurpleIcon>
                <Zap/>
            </PurpleIcon>
            {/* TODO: Add stripe subscription and create webinar button */}
            {user.subscription ? (
            <CreateWebinarButton stripeProducts={stripeProducts} ></CreateWebinarButton>
            ) : (
                <StripeElements children={undefined}>
                    <SubscriptionModal user={user} /> 
                </StripeElements>
            )}




        </div>

    </div>

  )
}

export default Header
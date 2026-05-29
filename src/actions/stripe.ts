"use server"

import { stripe } from "@/lib/stripe";
import { onAuthenticateuser } from "./auth";
import { Stripe } from "stripe";
import { prismaClient } from "@/lib/prismaClient";


export const getAllProductsFromStripe = async() =>{

    try{
        const currentUser = await onAuthenticateuser();
        if(!currentUser.user){
            return{status:401, error:'User not authenticated' , success: false}
        }

        if(!currentUser.user.stripeConnectId){
            return{
                error:"User not connected to Stripe",
                status: 401,
                success : false,
            }
        }

        const products = await stripe.products.list(
            {},
            {
                stripeAccount: currentUser.user.stripeConnectId,
            }
        )

        return{
            products:products.data,
            status:200,
            success: true,
        }

    }catch(error){
        console.log('Error getting products from Stripe' , error)
        return{
            error:"Error getting products from Stripe",
            status: 500,
            success: false
        }

    }

}

export const onGetStripeClientSecret = async (email:string , userId: string) =>{
    try{
        let customer : Stripe.Customer 
        const existingCustomer = await stripe.customers.list({email:email});
        if(existingCustomer.data.length >0){
            customer = existingCustomer.data[0]
        }else{
            customer = await stripe.customers.create({
                email:email,
                metadata:{
                    userId: userId,
                },
            })
        }

        await prismaClient.user.update({
            where : {id:userId},
            data:{
                stripeCustomerId: customer.id
            },
        })

        const priceId = process.env.SUBSCRIPTION_PRICE_ID
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{price: priceId}],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent'],
            metadata:{
                userId:userId,
            },
        })

        const paymentIntent = (subscription.latest_invoice as Stripe.Invoice).payment_intent as Stripe.PaymentIntent;

        return{
            status: 200,
            secret : paymentIntent.client_secret,
            customerId: customer.id
        }
       
    }catch(error){
        console.log('Subscription creation error:' , error)
        return{
            status:400,
            message: "Failed to create subscription "
        }

    }
}



export const updateSubscription = async(subscription: Stripe.Subscription) => {
    try{
        const userId = subscription.metadata.userId

        await prismaClient.user.update({
            where:{id: userId}, 
            data:{
                subscription: subscription.status === 'active' ? true : false,
            },
        })
    }catch(error){
        console.log('Error updating subscription' , error )
    }
}
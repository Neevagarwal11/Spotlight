"use client";
import { onGetStripeClientSecret } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { User } from "@prisma/client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  user: User;
};

const index = ({ user }: Props) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async() => {
    try{
        setLoading(true)
        if(!stripe || !elements){
            return toast.error("Stripe not initialized")
        }
        const intent = await onGetStripeClientSecret(user.email , user.id)

        if(!intent?.secret){
            throw new Error('Failed to initialize payment')
        }
        const cardElement = elements.getElement(CardElement)
        if(!cardElement){
            throw new Error('Card element not found')
        }

        const {error} = await stripe.confirmCardPayment(intent.secret, {
            payment_method:{
                card: cardElement
            }
        })

        if(error){
            throw new Error(error.message)
        }
        console.log('Payment successful' , paymentIntent)
        router.refresh()

    }catch(error){
        console.log('SUBSCRIPTON --->' , error)
        toast.error('Failed to update subscription')
    }
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm font-normal text-primary hover:bg-primary-20">
          <PlusIcon />
          Create Webinar
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Spotlight Subscription</DialogTitle>
        </DialogHeader>
        <DialogFooter className="gap-4 items-center">
          <DialogClose
            className="w-full sm:w-auto border border-border rounded-md px-3 p-2"
            disabled={loading}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                </>
            ): (
                'Confirm'
            )}

          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default index;

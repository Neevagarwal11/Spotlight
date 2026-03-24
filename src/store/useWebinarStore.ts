import { CtaTypeEnum } from '@prisma/client';
import { ValidationErrors } from '@/lib/type';
import {create} from 'zustand'


type WebinarStore ={
    isModalOpen : boolean;
    isComplete : boolean;
    isSubmitting : boolean
    formData : WebinarFormState
    validation : ValidationState

    setModalOpen : (open : boolean) => void;
    setIsComplete : (complete : boolean) => void;
    setSubmitting : (submitting: boolean) => void 
}

export type WebinarFormState = {
    basicInfo:{
        webinarName?:string
        description? : string
        date?: Date
        time?: string
        timeFormat? : 'AM' | 'PM'
    }
    cta: {
        ctaLabel? : string
        tags? : string[]
        ctaType: CtaTypeEnum
        aiAgent?:string
        priceId?:string
    }
    additionalInfo : {
        lockChat?:boolean
        couponCode?:string
        couponEnabled?: boolean
    }
}

const initialState: WebinarFormState = {
    basicInfo:{
        webinarName:"",
        description : "",
        date: undefined,
        time: "",
        timeFormat : 'AM',
    },
    cta: {
        ctaLabel: "",
        tags: [],
        ctaType: "BOOK_A_CALL",
        aiAgent:"",
        priceId:"",
    },
    additionalInfo : {
        lockChat:false,
        couponCode:"",
        couponEnabled: false,
    }
}


type ValidationState={
    basicInfo:{
        valid: boolean
        errors: ValidationErrors
    }
    cta:{
        valid: boolean
        errors: ValidationErrors
    }
    additionalInfo:{
        valid: boolean
        errors:ValidationErrors
    }
}
const initialValidation : ValidationState ={
    basicInfo:{valid : false , errors: {}},
    cta: {valid: false, errors : {}},
    additionalInfo:{valid: false, errors:{}},
}


export const useWebinarStore = create<WebinarStore>((set) => ({
    isModalOpen : false,
    isComplete : false,
    isSubmitting : false,
    formData: initialState,
    validation: initialValidation,
     

    setModalOpen : (open : boolean) => set({isModalOpen : open}),
    setIsComplete : (complete : boolean) => set({isComplete : complete}),
    setSubmitting : (submitting: boolean) => set({isSubmitting : submitting})




}))
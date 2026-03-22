import { cn } from '@/lib/utils'
import { Attendee } from '@prisma/client'
import React from 'react'

type Props ={
    customer: Attendee
    tags: string[]
    className? : string
}

const index = ({ customer, tags, className }: Props) => {
  return (

    <div className={cn('flex flex-col w-fit text-primary p-3 pr-10 gap-3 rounded-xl border-[0.5px] border-border backdrop-blur-[20px] bg-background/10', className )}>
        <h3 className='font-semibold text-xs'>{customer.name}</h3>
        <div className='flex gap-2 flex-wrap'>
            {tags.map((tag,index) =>(
                <span className='text-foreground px-3 py-1 rounded-md border border-border' key={index}>
                    {tag}
                </span>
            ))}
        </div>

    </div>

  )
}

export default index
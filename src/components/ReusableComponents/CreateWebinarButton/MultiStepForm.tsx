import React from 'react'

type Step ={
    id:string
    title:string
    desctiption : string
    component : React.ReactNode
}

type Props = {
    steps: Step[]
    onComplete : (id:string) => void

}

const MultiStepForm = ({steps , onComplete} : Props) => {
  return (
    <div>MultiStepForm</div>
  )
}

export default MultiStepForm
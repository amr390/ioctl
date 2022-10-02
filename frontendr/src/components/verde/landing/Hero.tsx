import { Check, Close } from '@mui/icons-material'
import React from 'react'
import toast from 'react-hot-toast'

export const Hero = (props: {}) => {
  return (
    <div className='flex flex-col border-2 border-solid border-green-500 rounded-2xl hue-rotate-30 h-[50vh] w-11/12 bg-gradient-to-b from-black to-white'>
      <IoRecord text={'Lets build something awesome'}>
        <Check />
      </IoRecord>
      <IoRecord text={'Lets take a diserved rest'}>
        <Close />
      </IoRecord>
    </div>
  )
}

const IoRecord = (props: { text: string; children: JSX.Element }) => {
  const makeAToast = () => toast('Hello World')

  return (
    <div
      onClick={makeAToast}
      className='flex flex-1 justify-evenly items-center pt-1'
    >
      <div className='bg-gray-200 rounded-full h-14 w-14'>{props.children}</div>
      <div className='bg-gray-200 rounded-xl h-14 w-5/6'>{props.text} </div>
    </div>
  )
}

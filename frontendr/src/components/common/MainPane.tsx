import { CropFree } from '@mui/icons-material'
import React, { PropsWithChildren, useContext } from 'react'

export const MainPane = (props: PropsWithChildren<any>) => {
  return (
    <>
      <span><CropFree className="cursor-pointer" onClick={()=>console.log("expand/contract") } /></span>
      <main role='main'
        className='relative m-auto h-[90vh] z-10 flex-grow pt-1 px-3 bg-white shadow-[0_0_10px_rgb(0,0,0,0.2)] shadow-gray-200 hover:shadow-gray-300'
      >
        {props.children}
      </main>
    </>
  )
}

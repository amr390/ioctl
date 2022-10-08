import React, { PropsWithChildren } from 'react'

export const MainPane = (props: PropsWithChildren<any>) => {
  return (
      <main role="main" className="w-full flex-grow pt-1 px-3 bg-white box-border shadow shadow-gray-300">
        {props.children}
      </main>
  )
}

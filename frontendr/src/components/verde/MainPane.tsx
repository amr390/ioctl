import React, { PropsWithChildren } from 'react'

export const MainPane = (props: PropsWithChildren<any>) => {
  return (
      <main role="main" className="relative m-auto h-[90vh] z-10 flex-grow pt-1 px-3 bg-white shadow-lg hover:shadow-md shadow-gray-200 hover:shadow-gray-300">
        {props.children}
      </main>
  )
}

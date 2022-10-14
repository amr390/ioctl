import React from 'react'

export const LeftPane = (props: {}) => {
  return (
    <div className='w-fixed h-screen w-1/4 flex-shrink flex-grow-0 px-4 bg-white'>
      <div className='sticky top-0 p-4 w-full h-full'>left pane</div>
    </div>
  )
}

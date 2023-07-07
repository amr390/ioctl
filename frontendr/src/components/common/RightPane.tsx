import React, { FC } from 'react'

export const RightPane: React.FC = (props: {}) => {
  return (
    <div className='hidden bg-white float-right justify-between lg:flex lg:flex-grow-1 lg:flex-shrik lg:h-screen lg:w-fixed lg:w-1/4 lg:px-2 '>
      <div className='flex gap-5 w-full items-center p-4 sm:flex-col px-2'>
        <ChecksView />
        <MeetingsView />
        <TeamView />
        <VacationsView />
      </div>
    </div>
  )
}

const ChecksView: FC = () => {
  return (
    <section className='flex flex-col justify-around px-2 w-full items-center h-32 rounded-sm border bg-gray-50 border-gray-100'>
      <div className='flex flex-row justify-between px-2 w-full items-center'>
        <div className='flex flex-col gap-2 pt-2 shadow-sm shadow-gray-100'>
          <h2 className='font-bold txt-lg'>Checks</h2>
          <span className='text-sm text-neutral-500 font-light'>In/Out checks</span>
        </div>
        <div className='flex items-start'>
          <button className='w-10 h-6 rounded-md text-black text-xs font-semibold bg-yellow-400'>
            Show
          </button>
        </div>
      </div>
      <div className='flex w-full h-2/5 justify-center'>
        <div className='flex flex-row justify-between items-center px-2 border rounded-md w-11/12 bg-black text-white text-center'>
          <span className='text-white text-sm '>Current status</span>
          <span className='flex justify-center items-center w-10 h-6 rounded-xl text-black text-xs font-semibold bg-gray-300'>
            IN
          </span>
        </div>
      </div>
    </section>
  )
}

const TeamView: FC = () => (
  <section className='flex flex-col justify-around px-2 w-full items-center h-32 rounded-sm border bg-gray-50 border-gray-100'>
    <div className='flex flex-row justify-between px-2 w-full items-center'>
      <div className='flex flex-col gap-2 pt-2 shadow-sm shadow-gray-100'>
        <h2 className='font-bold txt-lg'>Team</h2>
        <span className='text-sm text-neutral-500 font-light'>Team view</span>
      </div>
      <div className='flex items-start'>
        <button className='w-10 h-6 rounded-md border-white shadow-gray-200 text-black text-xs font-semibold bg-yellow-400'>
          Show
        </button>
      </div>
    </div>
    <div className='flex w-full h-2/5 justify-center'>
      <div className='flex flex-row justify-between items-center px-2 border rounded-md w-11/12 bg-black text-white text-center'>
        <span className='text-white text-sm '>New member</span>
        <button className='w-10 h-6 rounded-md border-white shadow-gray-200 text-black text-xs font-semibold bg-yellow-400'>
          join
        </button>
      </div>
    </div>
  </section>
)

const MeetingsView: FC = () => (
  <section className='flex flex-row justify-evenly w-full items-center h-20 rounded-sm border bg-gray-50 border-gray-100'>
    <div className='shadow-sm shadow-gray-100'>
      <h2 className='font-bold txt-lg'>Meetings</h2>
      <span className='text-sm text-neutral-500 font-light'>
        Latest meetings
      </span>
    </div>
    <div className='flex items-start'>
      <button className='w-16 h-8 rounded-md border-white shadow-gray-200 txt-black text-sm font-semibold bg-yellow-400'>
        Show
      </button>
    </div>
  </section>
)

const VacationsView: FC = () => (
  <section className='flex flex-row justify-evenly w-full items-center h-20 rounded-sm border bg-gray-50 border-gray-100'>
    <div className='shadow-sm shadow-gray-100'>
      <h2 className='font-bold txt-lg'>Vacations</h2>
      <span className='text-sm text-neutral-500 font-light'>
        Time off from work
      </span>
    </div>
    <div className='flex items-start'>
      <button className='w-16 h-8 rounded-md border-white shadow-gray-200 txt-black text-sm font-semibold bg-yellow-400'>
        Show
      </button>
    </div>
  </section>
)

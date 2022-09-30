import React from 'react'

export const Login = (props: {}) => {
  return (
    <>
        <div className='flex flex-col justify-center items-center rounded-t-lg lg:rounded-b-lg rounded-tr-lg w-full lg:w-1/4 lg:justify-center lg:align-middle h-3/4 md:h-[600px] lg:h-[600px] bg-sky-500/80'>
          <form
            className='flex flex-col py-4'
            action='some-action'
            method='post'
          >
            <input
              className='px-4 bg-sky-500/10 border-b-[0.1rem] border-white outline-none placeholder:text-sky-50 focus:border-b-2 text-sky-50 pt-2 autofill:bg-transparent appearance-none'
              type='text'
              id='first'
              name='first'
              placeholder='Email'
            />
            <input
              className='px-4 bg-sky-500/10 border-b-[0.1rem] border-white outline-none placeholder:text-sky-50 focus:border-b-2 text-sky-50 pt-2 appearance-none'
              type='password'
              id='last'
              name='last'
              placeholder='Password'
            />
            <button
              className='bg-sky-50 rounded-md mt-16 h-10 text-xl'
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
    </>
  )
}

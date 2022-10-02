import react from 'react'

const styles = {
  toastWrapper:
    'flex items-center text-white max-w-sm w-full bg-red-400 shadow-md rounded-lg overflow-hidden mx-auto',
  toastIconWrapper: 'w-10 border-4 px-2',
  toastMessageWrapper: 'flex items-center px-2 py-3',
}

const Notification = () => {
  return (
    <div className='mx-auto sm:w-3/4 md:w-3/4 fixed inset-0 flex items-center'>
      <div className='grid grid-cols-1 gap-2 justify-center items-center'>
        {/* <!-- Danger --> */}
        <div className='flex items-center text-white max-w-sm w-full bg-red-400 shadow-md rounded-lg overflow-hidden mx-auto'>
          <div className='w-10 border-r px-2'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
              ></path>
            </svg>
          </div>

          <div className='flex items-center px-2 py-3'>
            <div className='mx-3'>
              <p>Your message</p>
            </div>
          </div>
        </div>

        {/* <!-- succes --> */}
        <div className='flex items-center text-white max-w-sm w-full bg-green-400 shadow-md rounded-lg overflow-hidden mx-auto'>
          <div className='w-10 border-r px-2'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
              ></path>
            </svg>
          </div>

          <div className='flex items-center px-2 py-3'>
            <div className='mx-3'>
              <p>Your message</p>
            </div>
          </div>
        </div>

        {/* <!-- warning --> */}
        <div className='flex items-center text-white max-w-sm w-full bg-yellow-400 shadow-md rounded-lg overflow-hidden mx-auto'>
          <div className='w-10 border-r px-2'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01'
              ></path>
            </svg>
          </div>

          <div className='flex items-center px-2 py-3'>
            <div className='mx-3'>
              <p>Your message</p>
            </div>
          </div>
        </div>
        {/* <!-- info --> */}
        <div className='flex items-center text-white max-w-sm w-full bg-blue-400 shadow-md rounded-lg overflow-hidden mx-auto'>
          <div className='w-10 border-r px-2'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </div>

          <div className='flex items-center px-2 py-3'>
            <div className='mx-3'>
              <p>Your message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification

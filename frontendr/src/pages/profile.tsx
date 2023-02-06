/* import { APP_ROUTES } from '@utils/constants' */
import { useProfile } from '@hooks/useProfile'
import { IUser } from '@models'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'



export default function Profile() {
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const profile = useProfile();

  const repasswordStyle = {
    success:
      'focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8',
    error:
      'focus:outline-none border-b w-full pb-2 border-red-400 placeholder-gray-500 mb-8',
  }

  const validatePasswords = () => {
    setValidPassword(profile.password === profile.repassword)
  }

  return (
    <div className='w-full h-auto p-4 flex items-center justify-center'>
      <div className='bg-white flex flex-col py-6 px-10 w-full md:max-w-full'>
        <div className='sm:text-3xl text-2xl font-semibold text-left text-gray-600  mb-12'>
          <EditIcon /> profile Profile
          <hr />
        </div>
        <div className='flex flex-col w-full justify-center align-middle items-center self-center'>
          <div className='flex flex-row gap-4 md:gap-16 w-full md:w-10/12'>
            <label className='w-24' htmlFor='name'>
              Name
            </label>
            <input
              id='name'
              type='text'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='Full Name'
              onChange={(e) => (profile.full_name = e.target.value)}
            />
          </div>
          <div className='flex flex-row gap-4 md:gap-16 w-full md:w-10/12'>
            <label className='w-24' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              type='email'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='Eamil Adress '
              onChange={(e) => (profile.email = e.target.value)}
            />
          </div>
          <div className='flex flex-row gap-4 md:gap-16 w-full md:w-10/12'>
            <label className='w-24' htmlFor='phone'>
              Phone
            </label>
            <input
              type='phone'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='Phone'
              onChange={(e) => (profile.phone = e.target.value)}
            />
          </div>
          <div className='flex flex-row gap-4 md:gap-16 w-full md:w-10/12'>
            <label className='w-24' htmlFor='hunter'>
              Hunter
            </label>
            <input
              id='hunter'
              type='text'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='hunter'
              onChange={(e) => (profile.hunter = e.target.value)}
            />
          </div>
          <div className='flex flex-col lg:flex-row gap-4 md:gap-16 w-10/12'>
            <div className='flex flex-row gap-4 md:gap-16 w-10/12'>
              <label className='w-24' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
                onChange={(e) => (profile.password = e.target.value)}
              />
            </div>
            <div className='flex flex-row gap-4 md:gap-16 w-10/12'>
              <label className='w-24' htmlFor='repassword'>
                Repeat Password
              </label>
              <input
                id='repassword'
                type='password'
                className={
                  validPassword
                    ? repasswordStyle.success
                    : repasswordStyle.error
                }
                onChange={(e) => {
                  profile.repassword = e.target.value
                  validatePasswords()
                }}
              />
            </div>
          </div>

          <div className='flex justify-center my-6'>
            <button className=' rounded-md  p-3 w-full sm:w-56   bg-black text-gray-50 text-lg font-semibold '>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

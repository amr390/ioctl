/* import { APP_ROUTES } from '@utils/constants' */
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { useProfile } from '@hooks/useProfile'
import { IUser } from '@models'
import EditIcon from '@mui/icons-material/Edit'
import UserApi from '@services/users'
import { AxiosInstance, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const { profile, setProfile } = useProfile()
  const axiosPrivate: AxiosInstance = useAxiosPrivate()
  const userApi = UserApi

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e?.target.id]: e?.target.value })
  }

  const handlePasswordChange = (e: any) => {
    const newProfile = { ...profile, [e.target.id]: e.target.value }
    setValidPassword(newProfile.password === newProfile.repassword)

    setProfile(newProfile)
  }

  const handleUpdate = async () => {
    const newProfile: IUser = await userApi.updateMe(axiosPrivate, profile)
    setProfile(newProfile)
  }

  useEffect(() => {
    const controller = new AbortController()

    const getProfile = async () => {
      try {
        const response: AxiosResponse = await userApi.getMe(axiosPrivate, {
          signal: controller.signal,
        })
        console.log('user profile: ', response.data)

        setProfile(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    getProfile()

    return () => {
      controller.abort() // abort any on going requests
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const repasswordStyle = {
    success:
      'focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8',
    error:
      'focus:outline-none border-b w-full pb-2 border-red-400 placeholder-gray-500 mb-8',
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
              id='first_name'
              type='text'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='First Name'
              value={profile.first_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-row gap-4 md:gap-16 w-full md:w-10/12'>
            <label className='w-24' htmlFor='name'>
              Last Name
            </label>
            <input
              id='last_name'
              type='text'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='Last Name'
              value={profile.last_name || ''}
              onChange={handleChange}
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
              value={profile.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-row gap-4 md:gap-16 w-full md:w-10/12'>
            <label className='w-24' htmlFor='phone'>
              Phone
            </label>
            <input
              id='phone'
              type='phone'
              className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
              placeholder='Phone'
              value={profile.phone || ''}
              onChange={handleChange}
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
              value={profile.hunter || ''}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col lg:flex-row gap-4 md:gap-16 w-10/12'>
            <div className='flex flex-row gap-4 md:gap-16 w-10/12'>
              <label className='w-24' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                type='password'
                className='focus:outline-none border-b w-full pb-2 border-gray-400 placeholder-gray-500 mb-8'
                value={profile.password || ''}
                onChange={handlePasswordChange}
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
                value={profile.repassword || ''}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className='flex justify-center my-6'>
            <button
              className=' rounded-md  p-3 w-full sm:w-56   bg-black text-gray-50 text-lg font-semibold '
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

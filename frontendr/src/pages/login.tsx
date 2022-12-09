import AuthContext from '@context/AuthProvider'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { API_ROUTES } from '@utils/constants'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className='absolute w-full h-full'>
          {/* <div */}
          {/*   className='absolute top-0 w-full h-full bg-gray-100' */}
          {/*   style={{ */}
          {/*     backgroundImage: 'url(/img/bkn-image_c0dede.jpg)', */}
          {/*     backgroundSize: '100%', */}
          {/*     backgroundRepeat: 'no-repeat', */}
          {/*   }} */}
          {/* ></div> */}
          <div className='container mx-auto px-4 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full lg:w-4/12 px-8'>
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-900 border-0'>
                  <div className='rounded-t mb-0 px-6 py-6'>
                    <div className='text-center mb-3'>
                      <h6 className='text-gray-200 text-sm font-bold'>
                        Sign in
                      </h6>
                    </div>
                    <SocialButtons />
                    <hr className='mt-6 border-b-1 border-gray-300' />
                  </div>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <div className='text-gray-300 text-center mb-3 font-bold hidden'>
                      <small>Or sign in with credentials</small>
                    </div>
                    <RegularLoginForm />
                  </div>
                </div>
                <ResetPassword />
              </div>
            </div>
          </div>
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  )
}

const SocialButtons: FC = (): ReactJSXElement => (
  <div className='btn-wrapper text-center hidden'>
    <button
      className='bg-gray-200 active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs'
      type='button'
      style={{ transition: 'all .15s ease' }}
    >
      <Image
        alt='...'
        className='w-5 mr-1'
        layout='fill'
        src={'/img/github.svg'}
      />
      Github
    </button>
    <button
      className='bg-gray-200 active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs'
      type='button'
      style={{ transition: 'all .15s ease' }}
    >
      <Image
        alt='...'
        className='w-5 mr-1'
        layout='fill'
        src={'/img/google.svg'}
      />
      Google
    </button>
  </div>
)

const RegularLoginForm: FC = (): ReactJSXElement => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const { auth, setAuth } = useContext(AuthContext)
  const axiosPrivate = useAxiosPrivate()

  const handleLogin = async () => {
    try {
      const response = await axiosPrivate.post(
        `${API_ROUTES.SIGN_IN}`,
        new URLSearchParams({ username, password }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (response.data) {
        toast.success(`welcome ${username}`)
      }

      setAuth(response.data)

      if (response) {
        router.replace('/users')
      }
    } catch (err) {
      toast.error(`Failed to authenticate: ${err}`)
    }
  }

  return (
    <form>
      <div className='relative w-full mb-3'>
        <label
          className='block uppercase text-gray-300 text-xs font-bold mb-2'
          htmlFor='grid-password'
        >
          Email
        </label>
        <input
          type='email'
          className='border-0 px-3 py-3 placeholder-gray-300 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
          placeholder='Email'
          style={{ transition: 'all .15s ease' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='relative w-full mb-3'>
        <label
          className='block uppercase text-gray-300 text-xs font-bold mb-2'
          htmlFor='grid-password'
        >
          Password
        </label>
        <input
          type='password'
          className='border-0 px-3 py-3 placeholder-gray-300 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
          placeholder='Password'
          style={{ transition: 'all .15s ease' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label className='inline-flex items-center cursor-pointer'>
          <input
            id='customCheckLogin'
            type='checkbox'
            className='form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5'
            style={{ transition: 'all .15s ease' }}
          />
          <span className='ml-2 text-sm font-semibold text-gray-300'>
            Remember me
          </span>
        </label>
      </div>

      <div className='text-center mt-6'>
        <button
          className='bg-gray-300 text-gray-800 active:bg-gray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
          type='button'
          style={{ transition: 'all .15s ease' }}
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </form>
  )
}
const ResetPassword: FC = (): ReactJSXElement => (
  <div className='flex flex-wrap mt-6'>
    <div className='w-1/2'>
      <a href='#' onClick={(e) => e.preventDefault()} className='text-gray-300'>
        <small>Forgot password?</small>
      </a>
    </div>
    <div className='w-1/2 text-right'>
      <a href='#' onClick={(e) => e.preventDefault()} className='text-gray-300'>
        <small>Create new account</small>
      </a>
    </div>
  </div>
)

import { useEffect, useState } from 'react'
import axios from '@utils/axios'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import useRefreshToken from '@hooks/useRefreshToken'

export default function Users() {
  const [users, setUsers] = useState([])
  const refresh = useRefreshToken()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response: AxiosResponse = await axios.get(API_ROUTES.USER_CRUD, {
          withCredentials: true,
          signal: controller.signal,
        })
        console.log('user list: ', response.data)

        isMounted && setUsers(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    getUsers()

    return () => {
      controller.abort() // abort any requests on going
      isMounted = false // don't let set any state once the component is unmountejjkk
    }
  }, [])
  return (
    <>
      <h2>User list</h2>
      <article>
        {users?.length &&
          users.map((user, idx) => <div key={idx}> {user}</div>)}
      </article>
      <button onClick={() => refresh()}> Refresh</button>
    </>
  )
}

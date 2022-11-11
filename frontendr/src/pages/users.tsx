import React from 'react'
import { useAuthenticated } from '@hooks/useAuthenticated'

export const users = () => {
  const { authenticated } = useAuthenticated();
  return (
    <div>

    </div>
  )
}

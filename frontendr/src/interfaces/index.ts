export interface IUser {
  username: string
  timestamp: number
  isLoggedIn: boolean
  isExpired: boolean
}

export interface ICredentials {
  username: string
  password: string
}

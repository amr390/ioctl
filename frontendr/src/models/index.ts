export interface IUser {
  id: number
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  password?: string
  repassword?: string
  hunter?: string
  is_active?: boolean
  is_superuser?: boolean
 }

export interface ICredentials {
  username: string
  password: string
}

export type IToken = {
  access_token: string
  token_type: string
}

import { ICredentials, IUser } from '@interfaces'
import { decode, Jwt, JwtPayload } from 'jsonwebtoken'

type IToken = {
  exp: number
  sub: number
}

class UserService {
  public login = (credentials: ICredentials): boolean => {
    fetch('http://localhost:8000/api/v1/login/access-token', {
      method: 'POST',
      headers: new Headers([
        ['content-type', 'application/x-www-form-urlencoded'],
      ]),
      body: new URLSearchParams({ ...credentials }),
    })
      .then((response) => response.json())
      .then((json) => this.storeToken(JSON.stringify(json)))

    return true
  }

  public logout = (): void => this.cleanTokenInformation()

  public isLoggedIn = (): boolean => {
    return !this.isExpired()
  }

  public isExpired = (): boolean => {
    const token = this.getToken()
    const now = new Date()
    // if no token set date to 1970
    const exp: Date = token?.exp ? new Date(token.exp * 1000) : new Date(0)

    return exp.getTime() > now.getTime()
  }

  private getToken = (): JwtPayload => {
    const storedEncodedToken = JSON.parse(localStorage.getItem('token') || '')
    // it should be always a JwtPayload
    const token: JwtPayload = decode(
      storedEncodedToken['access_token']
    ) as JwtPayload

    return token
  }

  private storeToken = (token: string): void =>
    localStorage.setItem('token', JSON.stringify(token))

  private cleanTokenInformation = (): void => localStorage.removeItem('token')
}

export const userService = new UserService()

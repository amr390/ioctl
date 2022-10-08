import { ICredentials } from '@interfaces'
import { decode, JwtPayload } from 'jsonwebtoken'
import { toast } from 'react-hot-toast'

const endpoint = 'http://localhost:8000'

type IToken = {
  access_token: string
  token_type: string
}

class AuthenticationService {
  public login = async (credentials: ICredentials): Promise<boolean> => {
    return new Promise((resolve, reject) =>
      fetch(`${endpoint}/api/v1/login/access-token`, {
        method: 'POST',
        headers: new Headers([
          ['content-type', 'application/x-www-form-urlencoded'],
        ]),
        body: new URLSearchParams({ ...credentials }),
      })
        .then((response) => response.json())
        .then((json) => {
          this.storeToken(json)
          toast.success(`Welcome ${credentials.username}`)
          resolve(true)
        })
        .catch((err) => {
          toast.error(`Problem ocurred on login: ${err}`)
          reject(false)
        })
    )
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

    return exp.getTime() < now.getTime()
  }

  private getToken = (): JwtPayload => {
    if (typeof window !== 'undefined') {
      const storedToken: string = localStorage.getItem('token') || ''

      // it should be always a JwtPayload
      const token: JwtPayload = decode(storedToken) as JwtPayload
      return token
    }
    return { key: '' }
  }

  private storeToken = (token: IToken): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token['access_token'])
    }
  }

  private cleanTokenInformation = (): void => localStorage.removeItem('token')
}

export const authenticationService = new AuthenticationService()

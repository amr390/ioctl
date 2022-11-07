import { API_ROUTES } from '@utils/constants'
import { decode, JwtPayload } from 'jsonwebtoken'
import { ICredentials, IToken } from 'models'
import { toast } from 'react-hot-toast'

class AuthService {
  public login = async (credentials: ICredentials): Promise<boolean> => {
    return new Promise((resolve, reject) =>
      fetch(`${API_ROUTES.SIGN_IN}`, {
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

  public getDetails = () => ({
    authenticated: this.isLoggedIn(),
    userId: this.getUserId(),
  })

  public logout = (): void => this.cleanTokenInformation()

  public isLoggedIn = (): boolean => !this.isExpired()

  public getUserId = (): string => {
    const token = this.getDecodedToken()
    const userId: string = token?.sub || '-1'
    return userId
  }

  public isExpired = (): boolean => {
    const token = this.getDecodedToken()
    const now = new Date()
    // if no token set date to 1970
    const exp: Date = token?.exp ? new Date(token.exp * 1000) : new Date(0)

    return exp.getTime() < now.getTime()
  }

  public getToken = (): string => {
    const storedToken: string = localStorage.getItem('token') || ''
    return storedToken
  }

  private getDecodedToken = (): JwtPayload => {
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

export const authService = new AuthService()

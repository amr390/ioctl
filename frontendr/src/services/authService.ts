import axios from '@utils/axios'
import { API_ROUTES } from '@utils/constants'
import { decode, JwtPayload } from 'jsonwebtoken'
import { ICredentials, IToken } from 'models'
import { toast } from 'react-hot-toast'

class AuthService {
  private auth: string | undefined = undefined

  public login = async (credentials: ICredentials): Promise<boolean> => {
    return new Promise((resolve, reject) =>
      axios
        .post(
          `${API_ROUTES.SIGN_IN}`,
          new URLSearchParams({ ...credentials }),
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((response) => {
          this.auth = response.data
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
    return this.auth || ''
  }

  private getDecodedToken = (): JwtPayload => {
    // it should be always a JwtPayload
    const token: JwtPayload = decode(this.auth || '') as JwtPayload
    return token
  }

  private cleanTokenInformation = (): void => (this.auth = undefined)
}

export const authService = new AuthService()

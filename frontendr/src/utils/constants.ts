
const endpoint = 'http://localhost:8000'

export const API_ROUTES = {
  SIGN_UP:  `${endpoint}/api/v1/auth/signup`,
  SIGN_IN:  `${endpoint}/api/v1/auth/signin`,
  SIGN_OUT: `${endpoint}/api/v1/auth/signuot`,
  GET_USER: `${endpoint}/api/v1/user/userDetails`
}


export const APP_ROUTES = {
  SIGN_UP: `/signup`,
  SIGN_IN: `/login`,
  HOME: `/`,
  PROFILE: `/profile`
}

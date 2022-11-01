
const endpoint = 'http://localhost:8000'

export const API_ROUTES = {
  SIGN_UP:  `${endpoint}/api/v1/auth/signup`,
  SIGN_IN:  `${endpoint}/api/v1/auth/signin`,
  SIGN_OUT: `${endpoint}/api/v1/auth/signuot`,
  USER_CRUD: `${endpoint}/api/v1/user`,
  USER_ME_PUT: `${endpoint}/api/v1/user/me`,
  USER_ME_GET: `${endpoint}/api/v1/user/me`,
  CLOCK_ME_CRUD: `${endpoint}/api/v1/clock/me`,
  CLOCK_CRUD: `${endpoint}/api/v1/clock`,
  TEAM_ME_CRUD: `${endpoint}/api/v1/team/me`,
  TEAM_CRUD: `${endpoint}/api/v1/team`,
  GROUP_ME_CRUD: `${endpoint}/api/v1/group/me`,
  GROUP_CRUD: `${endpoint}/api/v1/group`,


}


export const APP_ROUTES = {
  SIGN_UP: `/signup`,
  SIGN_IN: `/login`,
  HOME: `/`,
  PROFILE: `/profile`
}

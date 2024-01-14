import { environment as env } from '../../environments/environment'
export const Endpoints = {
  auth: `${env.API_BASEURL}/api/v1/auth`,
  dashboard: `${env.API_BASEURL}/api/v1/dashboard`,
  user: `${env.API_BASEURL}/api/v1/user`,
  socialHub: `${env.API_BASEURL}/api/v1/socialHub`,
}

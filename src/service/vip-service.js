import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'
import { getLanguage } from '@/service/user-service'
import { getVIP } from '@/service/cookie-service'

function validateCodeFunc (code) {
  let options = {
    url: baseURLs.vip + '/verifyCode',
    method: 'post',
    headers: getHeaders(true),
    data: {
      code
    }
  }
  return axios(options)
}
export const validateCode = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(validateCodeFunc)

function getCardFromCodeFunc ({ code, email, name }) {
  let options = {
    url: baseURLs.vip + '/code',
    method: 'post',
    headers: getHeaders(true),
    data: {
      code,
      email,
      name,
      language: getLanguage()
    }
  }
  return axios(options)
}
export const getCardFromCode = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCardFromCodeFunc)

export function getVIPUser () {
  return getVIP()
}



// WEBPACK FOOTER //
// ./src/service/vip-service.js
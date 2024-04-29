import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'

function getEmailOptModalFunc () {
  let options = {
    url: baseURLs.users + '/emailopt/all',
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const getEmailOptModal = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getEmailOptModalFunc)



// WEBPACK FOOTER //
// ./src/service/emailopt-service.js
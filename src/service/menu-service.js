import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'

function getMenuFunc () {
  let options = {
    url: baseURLs.users + '/website-menu',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getMenu = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getMenuFunc)



// WEBPACK FOOTER //
// ./src/service/menu-service.js
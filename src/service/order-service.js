import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { getLanguage, isLoggedIn, isRegistered } from '@/service/user-service'
import { compose, promiseInterceptor } from '@/utils'

function postOrderFunc (order) {
  let options = {
    url: baseURLs.store + '/v2/order',
    method: 'post',
    headers: {
      ...((isLoggedIn() && isRegistered) ? getHeaders(true) : {})
    },
    data: {
      language: getLanguage(),
      ...order
    }
  }
  return axios(options)
}

export const postOrder = compose(
  createRefreshed
)(postOrderFunc)

function postPaypalOrderFunc (order) {
  let options = {
    url: baseURLs.store + '/v2/order/paypal',
    method: 'post',
    headers: {
      ...((isLoggedIn() && isRegistered) ? getHeaders(true) : {})
    },
    data: {
      language: getLanguage(),
      ...order
    }
  }
  return axios(options)
}

export const postPaypalOrder = compose(
  createRefreshed
)(postPaypalOrderFunc)

export function getProductsAndBonuses () {
  let options = {
    url: baseURLs.store + '/product_and_bonus',
    method: 'get'
  }
  return axios(options)
}

export function getConfigFlagFunc (flagID) {
  let options = {
    url: baseURLs.store + '/getConfigFlag',
    method: 'get',
    headers: {
      id: flagID
    }
  }
  return axios(options)
}
export const getConfigFlag = compose(
  promiseInterceptor(r => r.data)
)(getConfigFlagFunc)



// WEBPACK FOOTER //
// ./src/service/order-service.js
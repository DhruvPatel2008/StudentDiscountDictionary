import axios from 'axios'
import { baseURLs } from '@/service/api-config'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { compose, promiseInterceptor } from '@/utils'
import { getLanguage, isLoggedIn, isRegistered } from '@/service/user-service'
import store from '@/store'

export function getTaxRateFunc () {
  const options = {
    url: `${baseURLs.store}/v2/taxrate`,
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const getTaxRate = compose(
  createRefreshed
)(getTaxRateFunc)

export function getClientTokenFunc () {
  const options = {
    url: `${baseURLs.store}/v2/vault_client_token`,
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const getClientToken = compose(
  createRefreshed
)(getClientTokenFunc)

export function postPaymentFunc (paymentData, order, isActivationFlow = null) {
  const options = {
    url: `${baseURLs.store}/v3/checkout`,
    method: 'post',
    headers: {
      ...((isLoggedIn() && isRegistered) ? getHeaders(true) : {}),
      payment_method_nonce: paymentData ? paymentData.nonce : null
    },
    data: {
      ...order,
      language: getLanguage(),
      isActivationFlow: isActivationFlow && isActivationFlow.flow === true,
      sendActivationEmail: isActivationFlow !== null ? isActivationFlow : {}
    }
  }
  return axios(options)
}

export function postGuestPaymentFunc (paymentData, postal, order) {
  const options = {
    url: `${baseURLs.store}/v2/checkout/guest`,
    method: 'post',
    headers: {
      payment_method_nonce: paymentData.nonce
    },
    data: {
      ...order,
      postal,
      language: getLanguage()
    }
  }
  return axios(options)
}

export function postPurchasePaymentFunc (paymentData, order) {
  const options = {
    url: `${baseURLs.store}/v4/checkout/purchase`,
    method: 'post',
    headers: {
      ...((isLoggedIn() && isRegistered) ? getHeaders(true) : {}),
      payment_method_nonce: paymentData ? paymentData.nonce : null
    },
    data: {
      ...order,
      language: getLanguage()
    }
  }
  return axios(options)
}

export const postPurchasePayment = compose(
  createRefreshed
)(postPurchasePaymentFunc)

export function postActivationPaymentFunc (paymentData, order, isActivationFlow = null) {
  const options = {
    url: `${baseURLs.store}/v4/checkout/activation`,
    method: 'post',
    headers: {
      ...((isLoggedIn() && isRegistered) ? getHeaders(true) : {}),
      payment_method_nonce: paymentData ? paymentData.nonce : null
    },
    data: {
      ...order,
      language: getLanguage(),
      isActivationFlow: isActivationFlow && isActivationFlow.flow === true,
      sendActivationEmail: isActivationFlow !== null ? isActivationFlow : {}
    }
  }
  return axios(options)
}

export const postActivationPayment = compose(
  createRefreshed
)(postActivationPaymentFunc)

export const postGuestPayment = compose(
  createRefreshed
)(postGuestPaymentFunc)

export function getFreeTrialCard () {
  const options = {
    url: `${baseURLs.store}/getFreeTrialCard`,
    method: 'post'
  }
  return axios(options)
}

export const postPayment = compose(
  createRefreshed
)(postPaymentFunc)

export function getTransactionsFunc () {
  const options = {
    url: `${baseURLs.store}/user_transactions`,
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const getTransactions = compose(
  createRefreshed
)(getTransactionsFunc)

export function validatePromoCodeFunc (promoCode) {
  const options = {
    url: `${baseURLs.partners}/validatePromoCode/${promoCode}`,
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const validatePromoCode = compose(
  createRefreshed
)(validatePromoCodeFunc)

export function getProductDetailFunc (params = null, isHashed = false) {
  const options = {
    url: `${baseURLs.promos}/v2/product`,
    method: 'get',
    headers: getHeaders(true)
  }
  if (params) {
    options.params = {
      is_hashed: isHashed,
      promocode: params
    }
  }
  return axios(options)
}

export const getProductDetail = compose(
  createRefreshed
)(getProductDetailFunc)

export function getGuestProductDetailFunc (promocode = null, postal = '') {
  const options = {
    url: `${baseURLs.promos}/v2/product/guest`,
    method: 'get'
  }
  options.params = {
    promocode: promocode,
    postal: postal
  }
  return axios(options)
}

export const getGuestProductDetail = compose(
  createRefreshed
)(getGuestProductDetailFunc)

function validateSchoolCodeFunc (schoolCode) {
  let options = {
    url: baseURLs.partners + '/school_code/' + schoolCode,
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const validateSchoolCode = compose(
  createRefreshed
)(validateSchoolCodeFunc)

export function updatePayment (payment) {
  store.dispatch('updatePayment', payment)
}

export function getTokenizationKey () {
  return process.env.BRAINTREE_TOKENIZATION_KEY
}

function giftCardDetailFunc () {
  let options = {
    url: baseURLs.partners + '/boxing_day/gift_card/is_available',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const giftCardDetail = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(giftCardDetailFunc)

export function verifyRecaptchaFunc (recaptchaToken) {
  return axios({
    url: `${baseURLs.store}/verifyRecaptcha`,
    method: 'get',
    headers: {
      recaptcha_token: recaptchaToken
    }
  })
}

export const verifyRecaptcha = compose(
  createRefreshed
)(verifyRecaptchaFunc)

export function verifyHCaptchaFunc (captchaToken) {
  return axios({
    url: `${baseURLs.store}/verifyHCaptcha`,
    method: 'get',
    headers: {
      captcha_token: captchaToken
    }
  })
}

export const verifyHCaptcha = compose(
  createRefreshed
)(verifyHCaptchaFunc)

export function updatePaymentMethodFunc (nonce, promoCode = null) {
  return axios({
    url: `${baseURLs.store}/updatePaymentMethod`,
    method: 'put',
    headers: getHeaders(true),
    data: {
      nonce,
      promoCode
    }
  })
}

export const updatePaymentMethod = compose(
  createRefreshed
)(updatePaymentMethodFunc)

export function gettopBannerStatusFunc () {
  return axios({
    url: `${baseURLs.store}/topBannerStatus`,
    method: 'get',
    headers: getHeaders(true)
  })
}

export const gettopBannerStatus = compose(
  createRefreshed
)(gettopBannerStatusFunc)

export function getIncentiveCodeFunc (incentiveIdentifier) {
  return axios({
    url: `${baseURLs.partners}/activation-incentive/${incentiveIdentifier}`,
    method: 'get',
    headers: getHeaders(true)
  })
}

export const getIncentiveCode = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getIncentiveCodeFunc)



// WEBPACK FOOTER //
// ./src/service/payment-service.js
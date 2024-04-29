import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { getCurrentID } from '@/service/user-service'
import { createServiceAnalyzed } from '@/service/analytics-service'
import partial from 'lodash/partial'
import { compose, promiseInterceptor } from '@/utils'
import { isCIBCRegistration, getCIBCValidation } from '@/service/seabiscuit-service'
import { isSchoolPortalFlow, getSchoolPortalValidation } from '@/service/school-service'

function postRegisterFunc (profile) {
  let options = {
    url: `${baseURLs.users}/register`,
    method: 'post',
    headers: getHeaders(true),
    withCredentials: true,
    data: {
      firebase_uid: getCurrentID(),
      ...profile,
      ...(isCIBCRegistration() ? getCIBCValidation() : {})
    }
  }
  const response = axios(options)
  return response
}
export const registerUser = compose(
  partial(createServiceAnalyzed, 'register_user'),
  createRefreshed
)(postRegisterFunc)

function associateCardFunc (card) {
  let options = {
    url: `${baseURLs.users}/v2/associateCard`,
    method: 'post',
    headers: getHeaders(true),
    withCredentials: true,
    data: {
      ...(isCIBCRegistration() ? getCIBCValidation() : {}),
      ...(isSchoolPortalFlow() ? getSchoolPortalValidation() : {})
    }
  }
  return axios(options)
}

export const associateCard = compose(
  partial(createServiceAnalyzed, 'associate_card'),
  createRefreshed
)(associateCardFunc)

function postRegisterCardFunc (card) {
  let options = {
    url: `${baseURLs.users}/v2/register/card`,
    method: 'post',
    headers: getHeaders(true),
    data: {
      ...card
    }
  }
  return axios(options)
}
export const registerCard = compose(
  partial(createServiceAnalyzed, 'register_card'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(postRegisterCardFunc)

function checkUserRegisteredFunc () {
  let options = {
    url: `${baseURLs.users}/userIsRegistered`,
    method: 'get',
    headers: getHeaders(false)
  }
  return axios(options)
}
export const checkUserRegistered = compose(
  partial(createServiceAnalyzed, 'check_if_registered'),
  createRefreshed
)(checkUserRegisteredFunc)

function checkCardRegisterableFunc ({ card_number, csv }) {
  let options = {
    url: `${baseURLs.users}/v2/card/registerable`,
    method: 'post',
    data: {
      card_number,
      csv
    }
  }
  return axios(options)
}

export const checkCardRegisterable = compose(
  partial(createServiceAnalyzed, 'check_if_card_registerable')
)(checkCardRegisterableFunc)

function checkPasswordValidFunc (password, email) {
  return axios({
    url: `${baseURLs.users}/passwordIsValid`,
    method: 'post',
    data: {
      email: email,
      password: password
    }
  })
}
export const checkPasswordValid = compose(
  partial(createServiceAnalyzed, 'check_if_password_valid')
)(checkPasswordValidFunc)

function unlockUserLoginFunc (data) {
  return axios({
    url: `${baseURLs.users}/unlock-account`,
    method: 'post',
    data: data
  })
}
export const unlockUserLogin = compose(
  promiseInterceptor(r => r.data)
)(unlockUserLoginFunc)

function checkPostalValidFunc (postalCode) {
  return axios({
    url: `${baseURLs.users}/validate/postal/${postalCode}`,
    method: 'get'
  })
}
export const checkPostalValid = compose(
  partial(createServiceAnalyzed, 'check_if_postal_valid')
)(checkPostalValidFunc)

export const updateLoginFailAttempt = compose(
  partial(createServiceAnalyzed, 'update_user_login_fail_attempt')
)(updateLoginFailAttemptFunc)

function updateLoginFailAttemptFunc (email) {
  let options = {
    url: baseURLs.users + '/updateLoginFailAttempt',
    method: 'post',
    data: {
      email: email
    }
  }
  return axios(options)
}

export const isAllowedLogin = compose(
  partial(createServiceAnalyzed, 'check_if_user_loginable')
)(isAllowedLoginFunc)

function isAllowedLoginFunc (email) {
  let options = {
    url: baseURLs.users + '/isAllowedLogin',
    method: 'post',
    data: {
      email: email
    }
  }
  return axios(options)
}

export function uploadGform (url, body) {
  let options = {
    url: url,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },
    data: body
  }
  return axios(options)
}

function deleteFirebaseUserFunc (data) {
  return axios({
    url: baseURLs.users + '/deleteFirebaseUser',
    method: 'post',
    data
  })
}

export const deleteFirebaseUser = compose(
  partial(createServiceAnalyzed, 'delete_firebase_user')
)(deleteFirebaseUserFunc)

function postBraintreeUserRegFunc (profile) {
  let options = {
    url: `${baseURLs.users}/v2/user/register`,
    method: 'post',
    headers: getHeaders(true),
    withCredentials: true,
    data: {
      ...profile,
      firebase_uid: getCurrentID(),
      ...(isCIBCRegistration() ? getCIBCValidation() : {}),
      ...(isSchoolPortalFlow() ? getSchoolPortalValidation() : {})
    }
  }
  const response = axios(options)
  return response
}
export const braintreeUserRegistration = compose(
  partial(createServiceAnalyzed, 'register_user'),
  createRefreshed
)(postBraintreeUserRegFunc)

function getProvinceListFunc () {
  let options = {
    url: baseURLs.users + '/province',
    method: 'get'
  }
  return axios(options)
}
export const getProvinceList = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getProvinceListFunc)

function validateVerifiedEmailFunc (data) {
  let options = {
    url: baseURLs.users + '/user/verifyemail',
    method: 'post',
    data
  }
  return axios(options)
}
export const validateVerifiedEmail = compose(
  promiseInterceptor(r => r.data)
)(validateVerifiedEmailFunc)

function userAccessTokenFunc (cardNumber = null, utmData = null, redirect = null, resend = false) {
  let body = {}
  if (cardNumber) body['card_number'] = cardNumber
  if (utmData) body['utm_data'] = utmData
  if (redirect) body['redirect'] = redirect
  if (resend) body['resend_verification'] = resend
  let options = {
    url: baseURLs.users + '/user/accesstoken',
    method: 'post',
    headers: {
      ...getHeaders(true)
    },
    data: body
  }
  return axios(options)
}
export const userAccessToken = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(userAccessTokenFunc)

function updateResendRatelimitFunc () {
  let options = {
    url: baseURLs.users + '/update/resendratelimit',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const updateResendRatelimit = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(updateResendRatelimitFunc)



// WEBPACK FOOTER //
// ./src/service/register-service.js
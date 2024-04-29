import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'
import { associateCard } from '@/service/register-service'
import { SCHOOL_PORTAL_TYPE } from '@/models/schoolPortal'

const SCHOOL_EMAIL = 'school_email'
const SCHOOL_ID = 'school_id'
const UNIQUE_TOKEN = 'unique_token'
const AFFILIATE_KEY = 'affiliate_registration'
const SCHOOL_PORTAL = 'school_portal'

/**
 * Method to check if user comes from schoolportal
 * @returns Boolean
 */
export function isSchoolPortalFlow () {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  if (window.sessionStorage.getItem(UNIQUE_TOKEN)) return true
  return false
}

/**
 * Method to get schoolPortal details from sessionStorage
 * @returns Object
 */
export function getSchoolPortalValidation () {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  const token = window.sessionStorage.getItem(UNIQUE_TOKEN)
  return {
    [AFFILIATE_KEY]: SCHOOL_PORTAL,
    [UNIQUE_TOKEN]: token
  }
}

/**
 * Method to set student details in sessionStorage
 * @param {String} email
 * @param {String} schoolId
 */
export function setSchoolPortalDetails (email, schoolId) {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  window.sessionStorage.setItem(SCHOOL_EMAIL, email)
  window.sessionStorage.setItem(SCHOOL_ID, schoolId)
}

/**
 * Method to get student details from sessionStorage
 * @returns Object
 */
export function getSchoolPortalDetails () {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  const email = window.sessionStorage.getItem(SCHOOL_EMAIL)
  const id = window.sessionStorage.getItem(SCHOOL_ID)
  return {
    [SCHOOL_EMAIL]: email,
    [SCHOOL_ID]: id
  }
}

/**
 * Method to set the unique_token in sessionStorage
 * @param {String} token
 */
export function setSchoolPortalToken (token) {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  window.sessionStorage.setItem(UNIQUE_TOKEN, token)
}

/**
 * Method to get the unique_token from sessionStorage
 */
export function getSchoolPortalToken () {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  const uniqueToken = window.sessionStorage.getItem(UNIQUE_TOKEN)
  return uniqueToken
}

/**
 * Method to remove schoolportal details from sessionStorage
 */
export function clearSchoolPortalDetails () {
  if (!window.sessionStorage) throw new Error('Local storage unavailable')
  window.sessionStorage.removeItem(SCHOOL_EMAIL)
  window.sessionStorage.removeItem(SCHOOL_ID)
  window.sessionStorage.removeItem(UNIQUE_TOKEN)
}

/**
 * Method to get the school list
 * @param {String} url
 * @returns Object
 */
function getSchoolListFunc () {
  let options = {
    url: baseURLs.users + '/school/list',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getSchoolList = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getSchoolListFunc)

/**
 * Method to verify unique token
 * @param {Object} params
 * @returns Object
 */
function verifyStudentCredFunc (params) {
  let options = {
    url: baseURLs.users + `/student/verification`,
    method: 'post',
    headers: getHeaders(),
    data: params
  }
  return axios(options)
}
export const verifyStudentCred = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(verifyStudentCredFunc)

/**
 * Method to add new card to existing user
 */
export async function associateSchoolPortal () {
  try {
    await associateCard()
    clearSchoolPortalDetails()
    return {AlreadyRegister: false}
  } catch (error) {
    console.log(error)
    if (!error.response.data.success && error.response.data.message === SCHOOL_PORTAL_TYPE.ACTIVE_CARD) {
      // Already registered
      clearSchoolPortalDetails()
      return {AlreadyRegister: true}
    } else {
      window.alert('School Portal Registration failed')
    }
  }
}



// WEBPACK FOOTER //
// ./src/service/school-service.js
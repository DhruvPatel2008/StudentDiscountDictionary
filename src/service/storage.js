
import { isValidLanguage } from '@/models'

const LANGUAGE_KEY = 'language'
const LOCATION_KEY = 'location'
const POSTAL_KEY = 'postal'
const PREFERENCES_KEY = 'preferences'
const ROUTE_KEY = 'route'
const PEPPERJAM_CLICK_IDS_KEY = 'pepperjam_click_ids'
const HAS_SHOW_EMAIL_SUB_MODAL = 'has_show_email_sub_modal'
const HAS_DEVICE_SUB_EMAIL = 'has_device_sub_email'
const LEANPLUM_DEVICE_ID = '__leanplum_device_id'
const LEANPLUM_USER_ID = '__leanplum_user_id'
const SHOW_EMAIL_OPT = 'show_email_opt'
const SHOW_CIBC_MEMBERSHIP_MODAL = 'show_cibc_membership_modal'
const FAILED_REGISTRATION_ATTEMPTS = 'failed_registration_count'
const ACTIVATION_FLOW_INCOMPLETE = 'activation_flow_incomplete'
const REDIRECT_BACK_URL = 'redirectBackURL'
const JOIN_NOW_FLOW = 'isJoinNowFlow'
const HBC_REDIRECTION = 'hbcFlow'
const UTM_DATA_MAP = {
  UTM_Campaign_Latest: 'utm_campaign',
  UTM_Content_Latest: 'utm_content',
  UTM_Medium_Latest: 'utm_medium',
  UTM_Source_Latest: 'utm_source',
  UTM_Term_Latest: 'utm_term',
  UTM_Code: 'utm_code'
}
const IDENTITY = 'identity'
const SIGN_UP_METHOD = 'signUpMethodFollowed'
const RESEND_COUNTDOWN = 'resend_countdown'
const EASY_PROMO_FLOW = 'easy_promo_flow'
const EASY_PROMO_LOGIN = 'easy_promo_login'

export function setShowEmailOpt () {
  if (!window.sessionStorage.getItem(SHOW_EMAIL_OPT)) {
    window.sessionStorage.setItem(SHOW_EMAIL_OPT, true)
  }
  return window.sessionStorage.getItem(SHOW_EMAIL_OPT)
}

export function updateShowEmailOpt () {
  window.sessionStorage.setItem(SHOW_EMAIL_OPT, false)
  return window.sessionStorage.getItem(SHOW_EMAIL_OPT)
}

export function setLanguage (language) {
  if (isValidLanguage(language)) {
    window.localStorage.setItem(LANGUAGE_KEY, JSON.stringify(language))
  }
}

export function setLocation (location) {
  window.localStorage.setItem(LOCATION_KEY, JSON.stringify(location))
}

export function setPostal (postal) {
  // TODO: Check for validity
  window.localStorage.setItem(POSTAL_KEY, JSON.stringify(postal))
}

export function setPreferences (preferences) {
  window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
}

export function setRoute (route) {
  window.localStorage.setItem(ROUTE_KEY, JSON.stringify(route))
}

export function setPepperjamClickID (clickIds) {
  window.localStorage.setItem(PEPPERJAM_CLICK_IDS_KEY, JSON.stringify(clickIds))
}

export function setHasShownEmailSubModal (value) {
  window.localStorage.setItem(HAS_SHOW_EMAIL_SUB_MODAL, value)
}

export function setHasDeviceSubEmail (value) {
  window.localStorage.setItem(HAS_DEVICE_SUB_EMAIL, value)
}

export function getLanguage () {
  try {
    return JSON.parse(window.localStorage.getItem(LANGUAGE_KEY))
  } catch (e) {
    return null
  }
}

export function getLocation () {
  try {
    return JSON.parse(window.localStorage.getItem(LOCATION_KEY))
  } catch (e) {
    return null
  }
}

export function getPostal () {
  try {
    return JSON.parse(window.localStorage.getItem(POSTAL_KEY))
  } catch (e) {
    return null
  }
}

export function getPreferences () {
  try {
    return JSON.parse(window.localStorage.getItem(PREFERENCES_KEY))
  } catch (e) {
    return null
  }
}

export function getRoute () {
  try {
    return JSON.parse(window.localStorage.getItem(ROUTE_KEY))
  } catch (e) {
    return null
  }
}

export function getPepperjamClickIds () {
  try {
    return JSON.parse(window.localStorage.getItem(PEPPERJAM_CLICK_IDS_KEY))
  } catch (e) {
    return null
  }
}

export function getHasShownEmailSubModal () {
  try {
    return JSON.parse(window.localStorage.getItem(HAS_SHOW_EMAIL_SUB_MODAL))
  } catch (e) {
    return false
  }
}

export function getHasDeviceSubEmail () {
  try {
    return JSON.parse(window.localStorage.getItem(HAS_DEVICE_SUB_EMAIL))
  } catch (e) {
    return false
  }
}

export function getLeanplumDeviceID () {
  try {
    return window.localStorage.getItem(LEANPLUM_DEVICE_ID)
  } catch (e) {
    return null
  }
}

export function getLeanplumUserID () {
  try {
    return window.localStorage.getItem(LEANPLUM_USER_ID)
  } catch (e) {
    return null
  }
}

/**
 * Method to set the Boolean value if user viewed the modal for first time in localStorage
 *
 * @returns Boolean
 */
export function setShowCIBCMembershipModal (value) {
  window.localStorage.setItem(SHOW_CIBC_MEMBERSHIP_MODAL, value)
}

/**
 * Method to get the localStorage value for CIBC Modal
 *
 * @returns Boolean
 */
export function getShowCIBCMembershipModal () {
  return window.localStorage.getItem(SHOW_CIBC_MEMBERSHIP_MODAL)
}

/**
 * Method to check if user comes from easyPromo flow
 * @returns Boolean
 */
export function isEasyPromoFlow () {
  if (!window.sessionStorage) {
    throw new Error('Local storage unavailable')
  }
  if (window.sessionStorage.getItem(EASY_PROMO_FLOW)) {
    return true
  }
  const easyPromo = window.localStorage.getItem(EASY_PROMO_FLOW, null)
  if (easyPromo !== null) {
    return easyPromo === 'true'
  }
  return false
}

/**
 * Method to set get easyPromo Flow in Client Storage
 */
export function setGetEasyPromo (query = null) {
  if (query !== null) {
    window.localStorage.setItem(EASY_PROMO_FLOW, query)
    window.sessionStorage.setItem(EASY_PROMO_FLOW, query)
    return
  }
  const value = window.localStorage.getItem(EASY_PROMO_FLOW, null)
  if (value !== null) {
    window.localStorage.removeItem(EASY_PROMO_FLOW)
    return value === 'true'
  }
  return false
}

/**
 * Method to easyPromo login redirect
 * @param {String} query options: true
 * @returns Boolean
 */
export function isEasyPromoLoginRedirection (query = null) {
  if (query !== null) {
    window.sessionStorage.setItem(EASY_PROMO_LOGIN, query)
    return
  }
  const value = window.sessionStorage.getItem(EASY_PROMO_LOGIN, null)
  if (value !== null) {
    window.sessionStorage.removeItem(EASY_PROMO_LOGIN)
    return value === 'true'
  }
  return false
}

/**
 * Set in session storage Account creation
 * Check in checkout page for discount
 *
 * @param {Object} query queryparams
 */

export function dateStringToDate (dateString) {
  const dateData = dateString.split('-')
  const year = parseInt(dateData[0])
  const month = parseInt(dateData[1]) - 1
  const day = parseInt(dateData[2])
  return new Date(year, month, day)
}

export function mapSessionUTMToLocalUTM (utmData = null) {
  let mapUTMData = {}
  if (utmData) {
    Object.keys(UTM_DATA_MAP).map(key => {
      mapUTMData[UTM_DATA_MAP[key]] = utmData[key]
    })
  }
  return mapUTMData
}

export function setGetUTMData (query = null) {
  if (query) {
    const queryData = JSON.stringify(query)
    window.localStorage.setItem('purchase_UTM', queryData)
    return true
  } else {
    let queryData = null
    queryData = window.localStorage.getItem('purchase_UTM')
    if (queryData) {
      const JSONParsedData = JSON.parse(queryData)
      window.localStorage.removeItem('purchase_UTM')
      return JSONParsedData
    }
    return null
  }
}

/**
 * Method to set registration attempt fail count in session storage
 */

export function setRegistrationAttemptCount (value) {
  window.sessionStorage.setItem(FAILED_REGISTRATION_ATTEMPTS, value)
}

/**
 * Method to get registration attempt fail count in session storage
 */
export function getRegistrationAttemptCount () {
  try {
    return JSON.parse(window.sessionStorage.getItem(FAILED_REGISTRATION_ATTEMPTS))
  } catch (e) {
    return null
  }
}
/**
 * Method to set the Boolean value if user from activation flow incomplete in localStorage
 *
 * @returns Boolean
 */
export function setActivationFlowIncomplete (value) {
  window.localStorage.setItem(ACTIVATION_FLOW_INCOMPLETE, value)
}
/**
 * Method to get the localStorage value for activation flow incomplete
 *
 * @returns Boolean
 */
export function getActivationFlowIncomplete () {
  return JSON.parse(window.localStorage.getItem(ACTIVATION_FLOW_INCOMPLETE))
}

/**
 * Set pathname if args given
 * Get pathname and remove if args not given
 *
 * @returns String if Get Mode
 */
export function setOrGetRedirectBackUrl (pathname = null) {
  if (pathname) {
    window.sessionStorage.setItem(REDIRECT_BACK_URL, pathname)
    return
  }
  const backUrl = window.sessionStorage.getItem(REDIRECT_BACK_URL)
  if (backUrl) window.sessionStorage.removeItem(REDIRECT_BACK_URL)
  return backUrl
}

/**
 * Set or Get new JOIN NOW FLOW
 *
 * @params String - used 'yes' as default in function call
 * @returns String || null
 */
export function setOrGetMockLoginStatus (value) {
  if (value) {
    window.sessionStorage.setItem(JOIN_NOW_FLOW, value)
    return null
  }
  const IS_JOIN_NOW = window.sessionStorage.getItem(JOIN_NOW_FLOW, null)
  if (IS_JOIN_NOW) window.sessionStorage.removeItem(JOIN_NOW_FLOW)
  return IS_JOIN_NOW
}

// Add user firebase ID (As Impact customer ID) and email into storage
export function setUserIdentity (value) {
  if (value) {
    window.localStorage.setItem(IDENTITY, JSON.stringify(value))
  }
}

export function removeUserIdentity () {
  window.localStorage.removeItem(IDENTITY)
}

export function trackSignupFlow (value = null, remove = false) {
  if (value) {
    window.sessionStorage.setItem(SIGN_UP_METHOD, value)
    return null
  }
  const SIGNED_UP = window.sessionStorage.getItem(SIGN_UP_METHOD, null)
  if (SIGNED_UP && remove) window.sessionStorage.removeItem(SIGN_UP_METHOD)
  return SIGNED_UP
}

export function resendcountdownTimer (value = null, remove = false) {
  if (value) {
    window.localStorage.setItem(RESEND_COUNTDOWN, value)
    return null
  }
  const COUNTDOWN = window.localStorage.getItem(RESEND_COUNTDOWN, null)
  if (COUNTDOWN && remove) window.localStorage.removeItem(RESEND_COUNTDOWN)
  return COUNTDOWN
}

export function getSetHBCRedirect (method = 'set', remove = false) {
  if (method === 'set') {
    window.localStorage.setItem(HBC_REDIRECTION, 'true')
  } else if (method === 'get') {
    let val = window.localStorage.getItem(HBC_REDIRECTION)
    if (remove) {
      window.localStorage.removeItem(HBC_REDIRECTION)
    }
    return val === 'true'
  }
}



// WEBPACK FOOTER //
// ./src/service/storage.js
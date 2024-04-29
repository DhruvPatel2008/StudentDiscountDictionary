import firebase from 'firebase/app'
import 'firebase/auth'
import { updateToken, getCurrentID, getToken } from '@/service/user-service'
import { setExtensionToken } from '@/service/cookie-service'

export function getHeaders (useToken = false) {
  let authID = useToken ? getToken() : getCurrentID()
  return {
    Authorization: authID
  }
}

export function getAuthHeaders () {
  return {
    Authorization: getToken(),
    firebase_uid: getCurrentID()
  }
}

async function refreshToken () {
  const user = firebase.auth().currentUser

  if (user) {
    const token = await user.getIdToken()
    await updateToken(token)

    setExtensionToken(token)
  }
}

/**
 * @param {function} func any function that requires the token to be valid
 * @return {function} a function that takes args and applies them to func after making sure the token is refreshed
 */
export function createRefreshed (func) {
  return async function refreshed (...args) {
    await refreshToken()
    return func(...args)
  }
}



// WEBPACK FOOTER //
// ./src/service/auth-service.js
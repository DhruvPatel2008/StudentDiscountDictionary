import store from '@/store'
import firebase from 'firebase/app'
import 'firebase/auth'
import { languages, defaultLanguage } from '@/models'
import zipObject from 'lodash/zipObject'
import { assert, extractFirstName, extractLastName, filterObject } from '@/utils'
import { baseURLs } from '@/service/api-config'
import axios from 'axios'
import {
  getLeanplumDeviceID
} from '@/service/storage'

export function getFirebaseUser () {
  return firebase.auth().currentUser
}

export function getCurrentID () {
  return store.getters.uid
}

export function getToken () {
  return store.getters.token
}

export function getEmailVerificationSent () {
  return store.getters.emailVerificationSent
}

function getUserProviderId (user) {
  if (!user) return null
  const providerData = user.providerData ? user.providerData[0] : null
  if (!providerData) return null
  return providerData.providerId
}

export function getUserProvider (user) {
  const providerID = getUserProviderId(user)
  if (!providerID) return null
  const mapping = {
    'password': 'Email',
    'google.com': 'Google',
    'facebook.com': 'Facebook'
  }
  const provider = mapping[providerID]
  return provider || null
}

function getProvider () {
  return getUserProvider(getFirebaseUser())
}

export function updateUser (user) {
  const lens = [
    'uid',
    'displayName',
    'email',
    'emailVerified'
  ]
  const userData = !user ? user : {
    ...filterObject(user, lens),
    'providerId': getUserProviderId(user),
    'providerList': getUserProviderList(user)
  }
  return store.dispatch('updateUser', userData)
}
/**
 * Will get the list of provider id's if user have merged account.
 * @param {Object} user firebase user object.
 * @returns {Array} returns the array of provider id's.
 */
export function getUserProviderList (user) {
  let providerList = []
  if (!user) return providerList
  if (user.providerData && user.providerData.length) {
    user.providerData.forEach(res => {
      providerList.push(res.providerId.split('.')[0])
    })
  }
  return providerList
}

export function updateToken (token) {
  return store.dispatch('updateToken', token)
}

export function emailVerificationSent (emailVerificationSent) {
  return store.dispatch('updateEmailVerificationSent', emailVerificationSent)
}

export async function loadRegistration () {
  await store.dispatch('loadRegistration')
  try {
    if (store.getters.loggedIn && store.getters.registered) {
      await store.dispatch('offers/loadFavourites')
    } else {
      await store.dispatch('offers/clearFavourites')
    }
  } catch (error) {
    console.error(error)
  }
}

export function loadCards () {
  return store.dispatch('loadCards')
}

export function loadProfile () {
  return store.dispatch('loadProfile')
}

export function updateLoading (loading) {
  return store.dispatch('updateLoading', loading)
}

export function updateError (error) {
  return store.dispatch('updateError', error)
}

export function translate (options) {
  let language = store.getters.language
  if (!options.hasOwnProperty(language)) {
    throw new Error(`No options for the current language: '${language}'`)
  } else {
    return options[language]
  }
}

export function translateProperty (item, property) {
  assert(item, 'Object')
  assert(property, 'String')
  return translate(zipObject(
    languages,
    languages.map(lang => item[`${property}_${lang}`])
  ))
}

export function translateWithDefault (options, defaultLang) {
  if (!defaultLang) defaultLang = defaultLanguage
  let language = store.getters.language
  if (!options.hasOwnProperty(language) || !options[language]) {
    if (!options.hasOwnProperty(defaultLang)) {
      throw new Error(`No options for the default language: '${defaultLang}'`)
    } else {
      return options[defaultLang]
    }
  } else {
    return options[language]
  }
}

export function translateWithDefaultRelaxed (options, defaultLang) {
  if (typeof options === 'string') return options
  else return translateWithDefault(options, defaultLang)
}

export function translatePropertyWithDefault (item, property) {
  if (item) {
    assert(item, 'Object')
    assert(property, 'String')
    return translateWithDefault(zipObject(
      languages,
      languages.map(lang => item[`${property}_${lang}`])
    ))
  }
}

export function getFirstName () {
  return extractFirstName(store.getters.user.displayName)
}

export function getLastName () {
  return extractLastName(store.getters.user.displayName)
}

export function getDisplayName () {
  return store.getters.user.displayName
}

export function getEmail () {
  return store.getters.email
}

export function getPostalCode () {
  return store.getters.profilePostal
}

export function toggleLanguage () {
  let language = store.getters.language === 'en' ? 'fr' : 'en'
  store.dispatch('updateLanguage', language)
  if (store.getters.loggedIn && store.getters.registered) {
    store.dispatch('updateProfileLanguage', language)
  }
}

export function isAutoRenew () {
  return store.getters.isAutoRenew
}

export function getLanguage () {
  return store.getters.language ? store.getters.language : defaultLanguage
}

export function getEmailVerified () {
  let user = store.getters.user
  return user ? user.emailVerified : null
}

export async function sendEmailVerification () {
  let user = store.getters.user
  if (!user) throw new Error('No user logged in.')

  const fbUser = getFirebaseUser()

  if (!user.emailVerified && !getEmailVerificationSent()) {
    await fbUser.sendEmailVerification()
    emailVerificationSent(true)
    return true
  } else {
    return false
  }
}

export function isBMO () {
  return store.getters.hasBMO
}

export function isRegistered () {
  return store.getters.registered
}

export function getCountry () {
  return store.getters.country
}

export function isLoggedIn () {
  return store.getters.loggedIn
}

export async function logout () {
  await firebase.auth().signOut()

  // Preserve language settings after logout
  let language = store.getters.language

  store.dispatch('logout')
  store.dispatch('updateLanguage', language)
  store.dispatch('payment/resetPayment')
}

export function refreshStore () {
  if (!store.getters['offers/summaryLoading'] && store.getters['offers/hasLoadedSummary']) {
    store.dispatch('offers/loadSummary', true)
  }
}

export function updatePreviousRoute (from) {
  store.dispatch('updatePreviousRoute', from)
}

export function subscribeEmail (email, deviceId) {
  let id = getLeanplumDeviceID()
  if (deviceId) {
    id = deviceId
  }
  let options = {
    url: baseURLs.users + '/subscribe',
    method: 'post',
    data: {
      email: email,
      device_id: id
    }
  }
  return axios(options)
}

async function getCredentials (providerID, password = null) {
  if (providerID === 'Email') {
    const email = getEmail()
    if (!email) {
      throw new Error('Invalid email')
    }
    if (!password) {
      throw new Error('Invalid password')
    }
    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    )
    return credentials
  } else if (providerID === 'Google') {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const result = await firebase.auth().signInWithPopup(googleProvider)
    return result.credential
  } else if (providerID === 'Facebook') {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const result = await firebase.auth().signInWithPopup(facebookProvider)
    return result.credential
  } else {
    throw new Error('Invalid provider id: ' + providerID)
  }
}

export async function reauthenticate (password = null) {
  const providerId = getProvider()
  if (!providerId) {
    throw new Error('No provider, not logger in')
  }
  const credentials = await getCredentials(providerId, password)
  const fbUser = getFirebaseUser()
  if (!fbUser) {
    throw new Error('Missing firebase user')
  }
  await fbUser.reauthenticateWithCredential(credentials)
}



// WEBPACK FOOTER //
// ./src/service/user-service.js
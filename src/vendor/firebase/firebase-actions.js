import firebase from 'firebase/app'
import 'firebase/auth'
import { getCurrentBaseUrl } from '@/utils.js'
const scopes = [
  'email'
]

export function loginEmail (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function loginCustomToken (token) {
  return firebase.auth().signInWithCustomToken(token)
}

export function signupEmail (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export function isEmailInFirebase (email) {
  return firebase.auth().fetchSignInMethodsForEmail(email)
}

export function loginFacebook (email, password) {
  const facebookProvider = new firebase.auth.FacebookAuthProvider()
  scopes.forEach(scope => facebookProvider.addScope(scope))
  return firebase.auth().signInWithPopup(facebookProvider)
}

export function loginGoogle (email, password) {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  scopes.forEach(scope => googleProvider.addScope(scope))
  return firebase.auth().signInWithPopup(googleProvider)
}

export function resetPassword (email) {
  return firebase.auth().sendPasswordResetEmail(email)
}

export function verifyPasswordResetCode (actionCode) {
  return firebase.auth().verifyPasswordResetCode(actionCode)
}

export function verifyEmailVerification (actionCode) {
  return firebase.auth().applyActionCode(actionCode)
}

export function confirmPasswordReset (actionCode, newPassword) {
  return firebase.auth().confirmPasswordReset(actionCode, newPassword)
}

export function deleteCurrentLoginUserOnFirebase () {
  const user = firebase.auth().currentUser
  user.delete()
}

export function loginApple () {
  const appleProvider = new firebase.auth.OAuthProvider('apple.com')
  scopes.forEach(scope => appleProvider.addScope(scope))
  return firebase.auth().signInWithPopup(appleProvider)
}

export function sendUserEmailVerification (token) {
  return firebase.auth().currentUser.sendEmailVerification({
    url: getCurrentBaseUrl() + '?verifyToken=' + token
  })
}



// WEBPACK FOOTER //
// ./src/vendor/firebase/firebase-actions.js
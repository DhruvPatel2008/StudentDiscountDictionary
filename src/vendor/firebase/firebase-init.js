import firebase from 'firebase/app'
import 'firebase/auth'

import config from './firebase-config'
import * as userService from '@/service/user-service'
import registrationBus from '@/buses/registration-event-bus'
import { ACTIONS } from '@/service/analytics-service'
import { deleteExtensionToken } from '@/service/cookie-service'
import { removeUserIdentity } from '@/service/storage'

export function init () {
  firebase.initializeApp(config)
  initChangeListener()
}

function initChangeListener () {
  // login into same account no longer triggers onAuthStateChange,
  // in case error happens here and relogin will skip below logic, changed it to be onIdTokenChanged.
  // for more info https://firebase.google.com/docs/auth/users#auth_tokens
  firebase.auth().onIdTokenChanged(async user => {
    if (!user) { // Logout
      ACTIONS.LOGOUT()
      userService.updateUser(null)
      userService.updateLoading(false)
      userService.refreshStore()
      removeUserIdentity()
      // Remove extension token cookie
      deleteExtensionToken()

      return
    }
    try { // Login
      registrationBus.$emit('is_LoggingIn', true)
      if (user.uid !== userService.getCurrentID()) {
        await userService.updateUser(user)
      }
      const token = await user.getIdToken()
      userService.updateToken(token)
      await userService.loadRegistration()
      userService.updateLoading(false)
      if (userService.isRegistered()) {
        await userService.loadProfile()
      }
      registrationBus.$emit('registration_loaded')
      userService.refreshStore()
    } catch (error) {
      console.error(error)
      userService.updateError(error)
      registrationBus.$emit('is_LoggingIn', false)
      await userService.updateUser(null)
      await userService.loadRegistration()
      userService.updateLoading(false)
      userService.refreshStore()
    }
  })
}



// WEBPACK FOOTER //
// ./src/vendor/firebase/firebase-init.js
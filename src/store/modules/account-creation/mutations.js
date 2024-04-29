import * as types from './types'
import { isValidEmail, calculateAge } from '@/utils'
import { AGE_RESTRICTION_MIN } from '@/models/profile'

export default {
  [types.UPDATE_EMAIL] (state, email) {
    state.emailField = email
    state.isEmailValid = isValidEmail(email)
  },
  [types.UPDATE_PASSWORD] (state, password) {
    state.password = password
  },
  [types.UPDATE_BIRTHDATE] (state, birthdate) {
    state.birthdate = birthdate
    let age = calculateAge(birthdate)
    state.age = age
    state.aboveAgeLimit = (!age) ? false : age >= AGE_RESTRICTION_MIN
  },
  [types.UPDATE_SIGNUP_METHOD] (state, signupMethod) {
    state.signupMethod = signupMethod
  },
  [types.UPDATE_STEP_ONE_COMPLETE] (state, isStepOneComplete) {
    state.isStepOneComplete = isStepOneComplete
  },
  [types.UPDATE_FIRST_NAME] (state, firstName) {
    state.firstName = firstName
  },
  [types.UPDATE_LAST_NAME] (state, lastName) {
    state.lastName = lastName
  },
  [types.UPDATE_EMAIL_OPT_IN] (state, emailOptIn) {
    state.emailOptIn = emailOptIn
  },
  [types.UPDATE_LOGIN_STATUS] (state, status) {
    state.mockLoginStatus = status
  },
  [types.UPDATE_AGREE] (state, agree) {
    state.agree = agree
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/account-creation/mutations.js
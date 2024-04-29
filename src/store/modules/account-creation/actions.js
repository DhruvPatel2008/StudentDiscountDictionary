import * as types from './types'

export default {
  updateEmail ({ commit }, email) {
    commit(types.UPDATE_EMAIL, email)
  },
  updatePassword ({ commit }, password) {
    commit(types.UPDATE_PASSWORD, password)
  },
  updateBirthday ({ commit }, birthday) {
    commit(types.UPDATE_BIRTHDATE, birthday)
  },
  updateSignUpMethod ({ commit }, value) {
    commit(types.UPDATE_SIGNUP_METHOD, value)
  },
  updateStepOneCompletion ({ commit }, isStepOneComplete) {
    commit(types.UPDATE_STEP_ONE_COMPLETE, isStepOneComplete)
  },
  updateFirstName ({ commit }, firstName) {
    commit(types.UPDATE_FIRST_NAME, firstName)
  },
  updateLastName ({ commit }, lastName) {
    commit(types.UPDATE_LAST_NAME, lastName)
  },
  reset ({ commit }) {
    commit(types.UPDATE_EMAIL, null)
    commit(types.UPDATE_PASSWORD, null)
    commit(types.UPDATE_BIRTHDATE, null)
    commit(types.UPDATE_SIGNUP_METHOD, null)
    commit(types.UPDATE_STEP_ONE_COMPLETE, false)
  },
  updateEmailOptIn ({ commit }, emailOptIn) {
    commit(types.UPDATE_EMAIL_OPT_IN, emailOptIn)
  },
  updateMockLoginStatus ({ commit }, status) {
    commit(types.UPDATE_LOGIN_STATUS, status)
  },
  updateAgree ({ commit }, agree) {
    commit(types.UPDATE_AGREE, agree)
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/account-creation/actions.js
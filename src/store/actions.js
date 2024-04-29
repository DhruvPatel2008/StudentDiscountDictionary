import * as types from './types'
import { checkUserRegistered, getProvinceList } from '@/service/register-service'
import { getProfile,
        putProfile,
        getActiveSubscription,
        getCards,
        updateUserLanguage,
        updateAutoRenew,
        getCheckBraintreeSub } from '@/service/profile-service'
import { getReferrals } from '@/service/referral-service'
import { updateMemberType } from '@/service/analytics-service'
import { getIsFreeTrial, getThemes } from '@/service/offer-service'
import { getContestRules } from '@/service/contest-rules-service'

export default {
  updateUser ({ commit }, user) {
    commit(types.UPDATE_USER, user)
  },
  updateToken ({ commit }, token) {
    commit(types.UPDATE_TOKEN, token)
  },
  updateEmailVerificationSent ({ commit }, emailVerificationSent) {
    commit(types.UPDATE_EMAIL_VERIFICATION_SENT, emailVerificationSent)
  },
  updateLanguage ({ commit }, language) {
    commit(types.UPDATE_LANGUAGE, language)
  },
  updateLocation ({ commit }, location) {
    commit(types.UPDATE_LOCATION, location)
  },
  updatePostal ({ commit }, postal) {
    commit(types.UPDATE_POSTAL, postal)
  },
  async loadRegistration ({ commit }) {
    const response = await checkUserRegistered()
    let registration = response.data
    const type = registration.membership_type
    updateMemberType(type)
    commit(types.UPDATE_REGISTRATION, registration)
  },
  async loadProfile ({ commit }) {
    const response = await getProfile()
    let profile = response.data
    commit(types.UPDATE_PROFILE, profile)
  },
  async loadCards ({ commit }) {
    const cards = await getCards()
    commit(types.UPDATE_CARDS, cards)
  },
  async updateProfile ({ commit }, profile) {
    await putProfile(profile)
    commit(types.UPDATE_PROFILE, profile)
  },
  async updateProfileLanguage ({ commit }, language) {
    try {
      await updateUserLanguage(language)
      commit(types.UPDATE_PROFILE, { language })
    } catch (error) {
      throw error
    }
  },
  updateLoading ({ commit }, loading) {
    commit(types.UPDATE_LOADING, loading)
  },
  updateError ({ commit }, error) {
    commit(types.UPDATE_ERROR, error)
  },
  login ({ commit }, { user, token }) {
    commit(types.UPDATE_USER, user)
    commit(types.UPDATE_TOKEN, token)
  },
  logout ({ commit }) {
    commit(types.UPDATE_USER, null)
    commit(types.UPDATE_TOKEN, null)
    commit(types.UPDATE_PROFILE, null)
    commit(types.RESET_CARD_VALIDATION, false)
    commit(types.UPDATE_REGISTRATION, {
      registered: false,
      hasCard: false,
      bmo: false
    })
  },
  async updateIsAutoRenewBraintreeBased ({ commit, getters }) {
    try {
      await getCheckBraintreeSub().then(data => {
        if (getters.isAutoRenew !== data.is_auto_renew) {
          const profile = { is_auto_renew: data.is_auto_renew }
          commit(types.UPDATE_PROFILE, profile)
        }
      })
    } catch (error) {
      throw error
    }
  },
  async updateIsAutoRenew ({ commit, getters }, {isAutoRenew, promoCode = null}) {
    const oldAutoRenew = getters.isAutoRenew
    const data = { is_auto_renew: isAutoRenew, promoCode }
    const oldProfile = { oldAutoRenew }
    commit(types.UPDATE_PROFILE, data)
    try {
      return await updateAutoRenew(data)
    } catch (error) {
      commit(types.UPDATE_PROFILE, oldProfile)
      throw error
    }
  },
  updateNextRoute ({ commit }, nextRoute) {
    commit(types.UPDATE_NEXT_ROUTE, nextRoute)
  },
  updateAnalyticsReady ({ commit }, ready) {
    commit(types.UPDATE_ANALYTICS_READY, ready)
  },
  updatePreviousRoute ({ commit }, previousRoute) {
    commit(types.UPDATE_PREVIOUS_ROUTE, previousRoute)
  },
  updateOptimizeReady ({ commit }, ready) {
    commit(types.UPDATE_OPTIMIZE_READY, ready)
  },
  updatePreferences ({ commit }, preferences) {
    commit(types.UPDATE_PREFERENCES, preferences)
  },
  updatePreference ({ commit }, preference) {
    commit(types.UPDATE_PREFERENCE, preference)
  },
  async refreshReferrals ({ commit }) {
    const referrals = await getReferrals()
    commit(types.UPDATE_REFERRALS, referrals)
  },
  async getFreeTrialStatus ({ commit }) {
    const isFreeTrial = await getIsFreeTrial()
    commit(types.UPDATE_FREE_TRIAL, isFreeTrial)
  },
  async getActiveSubscriptions ({ commit }) {
    const response = await getActiveSubscription()
    let hasActiveSubscription = response.data.has_active_subscription
    commit(types.UPDATE_ACTIVE_SUBSCRIPTIONS, hasActiveSubscription)
  },
  updatePurchaseNavigation ({ commit }, purchasePageNavigation) {
    commit(types.PURCHASE_NAVIGATION, purchasePageNavigation)
  },
  updateReNavigation ({ commit }, pageReNavigation) {
    commit(types.REDEEM_NAVIGATION, pageReNavigation)
  },
  updateSchoolCode ({ commit }, copiedSchoolCode) {
    commit(types.SCHOOL_CODE, copiedSchoolCode)
  },
  hasValidCard ({ commit }, cards) {
    commit(types.UPDATE_CARD_VALIDATION, cards)
  },
  async loadContestRules ({ commit }, contestName) {
    const rules = await getContestRules(contestName)
    commit(types.UPDATE_CONTEST_RULES, rules)
  },
  updateCoordinate ({commit}, coordinates) {
    commit(types.UPDATE_COORDINATES, coordinates)
  },
  updateFromExtension ({commit}, value) {
    commit(types.UPDATE_FROM_EXTENSION, value)
  },
  updateFromQRLanding ({commit}, value) {
    commit(types.UPDATE_FROM_QR_LANDING, value)
  },
  async loadUserTheme ({ commit }) {
    const themeResponse = await getThemes()
    commit(types.UPDATE_THEME, themeResponse)
  },
  updateOfferId ({ commit }, offerId) {
    commit(types.UPDATE_OFFER_ID, offerId)
  },
  updateUpgradeType ({ commit }, type) {
    commit(types.UPDATE_UPGRADE_TYPE, type)
  },
  async getProvinces ({commit}) {
    await getProvinceList().then(res => {
      commit(types.PROVINCES, res.provinces)
    })
  }
}



// WEBPACK FOOTER //
// ./src/store/actions.js
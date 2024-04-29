import * as types from './types'
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { assert } from '@/utils'
import merge from 'lodash/merge'
import router from '../router'
import { updateLanguage } from '@/service/analytics-service'

export default {
  [types.UPDATE_USER] (state, user) {
    assert(user, 'Maybe Object')
    state.user = cloneDeep(user)
  },
  [types.UPDATE_TOKEN] (state, token) {
    assert(token, 'Maybe String')
    state.token = token
  },
  [types.UPDATE_EMAIL_VERIFICATION_SENT] (state, emailVerificationSent) {
    assert(emailVerificationSent, 'Boolean')
    state.emailVerificationSent = emailVerificationSent
  },
  [types.UPDATE_LANGUAGE] (state, language) {
    assert(language, 'String')
    updateLanguage(state.languageList[language])
    state.language = language
  },
  [types.UPDATE_LOCATION] (state, location) {
    assert(location, 'Maybe Object')
    state.location = location
  },
  [types.UPDATE_POSTAL] (state, postal) {
    assert(postal, 'Maybe String')
    state.postal = postal
  },
  [types.UPDATE_LOADING] (state, loading) {
    assert(loading, 'Boolean')
    state.loading = loading
  },
  [types.UPDATE_ERROR] (state, error) {
    state.error = error
  },
  [types.UPDATE_REGISTRATION] (
    state,
    { registered, hasCard, bmo, notify = false }
  ) {
    assert(registered, 'Boolean')
    assert(hasCard, 'Boolean')
    assert(bmo, 'Boolean')
    assert(notify, 'Boolean')
    state.registered = registered
    state.hasCard = hasCard
    state.bmo = bmo
    state.notifyExpiresSoon = notify
  },
  [types.UPDATE_PROFILE] (state, profile) {
    assert(profile, 'Maybe Object')
    state.profile = profile == null ? null : merge(state.profile, profile)
    if (state.profile && 'language' in profile) {
      state.profile.language = profile.language
    } else {
      state.language = state.english
    }
  },
  [types.UPDATE_NEXT_ROUTE] (state, nextRoute) {
    assert(nextRoute, 'Maybe Object')
    state.nextRoute = nextRoute
  },
  [types.UPDATE_PREVIOUS_ROUTE] (state, previousRoute) {
    assert(previousRoute, 'Maybe Object')
    state.previousRoute = previousRoute
  },
  [types.UPDATE_ROUTE_INTENT] (state, routeIntent) {
    state.routeIntent = routeIntent
  },
  [types.UPDATE_ANALYTICS_READY] (state, ready) {
    assert(ready, 'Boolean')
    state.analyticsReady = ready
  },
  [types.UPDATE_OPTIMIZE_READY] (state, ready) {
    assert(ready, 'Boolean')
    state.optimizeReady = ready
  },
  [types.UPDATE_PREFERENCES] (state, preferences) {
    assert(preferences, 'Maybe Object')
    state.preferences = preferences
  },
  [types.UPDATE_PREFERENCE] (state, { category, property, value }) {
    assert(category, 'String')
    assert(property, 'String')
    if (!state.preferences) {
      state.preferences = {}
    }
    if (typeof state.preferences[category] === 'undefined') {
      Vue.set(state.preferences, category, {})
    }
    if (typeof state.preferences[category][property] === 'undefined') {
      Vue.set(state.preferences[category], property, value)
    } else {
      state.preferences[category][property] = value
    }
  },
  [types.UPDATE_REFERRALS] (state, referrals) {
    assert(referrals, 'Object')
    state.referrals = merge(state.referrals, referrals)
  },
  [types.UPDATE_CARDS] (state, cards) {
    state.cards = cards
  },
  [types.UPDATE_FREE_TRIAL] (state, isFreeTrial) {
    assert(isFreeTrial, 'Object')
    const { is_free_trial } = isFreeTrial
    // eslint-disable-next-line
    state.isFreeTrial = is_free_trial
  },
  [types.FINALIZE_PURCHASE] (state, appStatus) {
    assert(appStatus, 'Object')
    // During Free Trial
    if (appStatus.isFreeTrial) {
      if (!appStatus.isLoggedIn) {
        router.push('/signup')
      } else if (appStatus.isLoggedIn) {
        if (appStatus.hasValidMembership || !appStatus.hasValidMembership) {
          router.push('/deals')
        }
      }
    } else if (!appStatus.isFreeTrial || appStatus.isFreeTrial == null) { // After Free Trial
      if (!appStatus.isLoggedIn) {
        router.push('/signup')
      } else if (appStatus.isLoggedIn) {
        if (appStatus.hasValidMembership) {
          router.push('/deals')
        }
      }
    }
  },
  [types.PURCHASE_NAVIGATION] (state, purchasePageNavigation) {
    assert(purchasePageNavigation, 'Boolean')
    state.purchasePageNavigation = purchasePageNavigation
  },
  [types.REDEEM_NAVIGATION] (state, pageReNavigation) {
    assert(pageReNavigation, 'String')
    state.pageReNavigation = pageReNavigation
  },
  [types.SCHOOL_CODE] (state, copiedSchoolCode) {
    assert(copiedSchoolCode, 'String')
    state.copiedSchoolCode = copiedSchoolCode
  },
  [types.UPDATE_CARD_VALIDATION] (state, cards) {
    state.hasValidCard = false
    cards.forEach(card => {
      if (!card.is_expired && card.status === 'active') {
        state.hasValidCard = true
      }
    })
  },
  [types.RESET_CARD_VALIDATION] (state, value) {
    state.hasValidCard = value
  },
  [types.UPDATE_COORDINATES] (state, value) {
    state.coordinates = value
  },
  [types.UPDATE_CONTEST_RULES] (state, rules) {
    state.contestRulesEn = rules.rule_en
    state.contestRulesFr = rules.rule_fr
  },
  [types.UPDATE_FROM_EXTENSION] (state, value) {
    state.fromExtension = value
  },
  [types.UPDATE_FROM_QR_LANDING] (state, value) {
    state.fromQRLanding = value
  },
  [types.UPDATE_THEME] (state, themes) {
    if (state.profile) {
      state.themeImage = themes.filter(theme => theme.id === state.profile.theme_id)[0].image_large_en
    }
  },
  [types.UPDATE_OFFER_ID] (state, offerId) {
    state.offerId = offerId
  },
  [types.UPDATE_UPGRADE_TYPE] (state, value) {
    state.spcPlusUpgradeType = value
  },
  [types.PROVINCES] (state, provinces) {
    state.provinces = provinces
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations.js
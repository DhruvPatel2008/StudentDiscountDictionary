import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { getCurrentID } from '@/service/user-service'
import { createServiceAnalyzed } from '@/service/analytics-service'
import partial from 'lodash/partial'
import { compose, promiseInterceptor } from '@/utils'
import store from '@/store'

function getProfileFunc () {
  let options = {
    url: baseURLs.users + '/v2/user/register',
    method: 'get',
    headers: {
      ...getHeaders(true),
      firebase_uid: getCurrentID()
    }
  }
  return axios(options)
}
export const getProfile = compose(
  partial(createServiceAnalyzed, 'get_user'),
  promiseInterceptor(r => {
    if (r.data.theme_id) {
      let properties = {
        'Theme ID': r.data.theme_id
      }
      window.mixpanel.register(properties)
    }
    return r
  }),
  createRefreshed
)(getProfileFunc)

function putProfileFunc (profile) {
  let options = {
    url: baseURLs.users + '/v2/user/register',
    method: 'put',
    headers: getHeaders(true),
    data: profile
  }
  return axios(options)
}
export const putProfile = compose(
  partial(createServiceAnalyzed, 'update_user_profile'),
  createRefreshed
)(putProfileFunc)

function getCardsFunc () {
  let options = {
    url: baseURLs.users + '/v2/cardsForUser',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  const emptyCardDispatch = () => store.dispatch('hasValidCard', [])
  if (options.headers.Authorization === null) {
    emptyCardDispatch()
    return
  }
  return axios(options).catch(err => { // eslint-disable-line
    emptyCardDispatch()
  })
}
export const getCards = compose(
  partial(createServiceAnalyzed, 'get_cards'),
  promiseInterceptor(r => {
    let cards = r && r.data ? r.data : []
    let primaryCard = false
    store.dispatch('hasValidCard', cards)
    if (Array.isArray(cards) && cards.length) {
      primaryCard = cards.filter(card => card.is_primary)[0]
      if (primaryCard) {
        window.mixpanel.register({
          'Cobrand': primaryCard.cobrand
        })
      }
    }
    if (!primaryCard) {
      window.mixpanel.unregister('Cobrand')
    }
    return cards
  }),
  createRefreshed
)(getCardsFunc)

export async function getIsSpcPlusUser (cards) {
  try {
    cards = cards || await getCards()
    if (Array.isArray(cards) && cards.length) {
      return cards.filter(card => (card.cobrand || '').toLowerCase() === 'cibc' && !card.is_expired && card.status === 'active').length > 0
    }
  } catch (ex) {}

  return false
}

export async function getUserCampus (cards) {
  try {
    cards = cards || await getCards()
    if (Array.isArray(cards) && cards.length) {
      const campusCards = cards.filter(card => (card.cobrand || '').toLowerCase() === 'campus' && !card.is_expired && card.status === 'active')
      if (campusCards.length > 0) {
        return campusCards[0].campus
      }
    }
  } catch (ex) {}
  return null
}

// Checks and updates auto_renew based on Braintree
function getCheckBraintreeSubFunc () {
  let options = {
    url: baseURLs.users + '/user/check_braintree_subscription',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const getCheckBraintreeSub = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCheckBraintreeSubFunc)

function getSubscriptionFunc () {
  let options = {
    url: baseURLs.store + '/isSubscriber',
    method: 'get',
    headers: {
      ...getHeaders(true),
      uid: getCurrentID()
    }
  }
  return axios(options)
}
export const getSubscription = compose(
  promiseInterceptor(r => r.data.is_subscriber),
  createRefreshed
)(getSubscriptionFunc)

function cancelSubscriptionFunc (profile) {
  let options = {
    url: baseURLs.store + '/unsubscribe',
    method: 'post',
    headers: getHeaders(true),
    data: {
      uid: getCurrentID()
    }
  }
  return axios(options)
}
export const cancelSubscription = createRefreshed(cancelSubscriptionFunc)

// Favourite Categories

function getFavouriteCategoriesFunc () {
  let options = {
    url: baseURLs.users + '/v2/user/categories',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const getFavouriteCategories = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getFavouriteCategoriesFunc)

function updateFavouriteCategoriesFunc (categories) {
  let options = {
    url: baseURLs.users + '/v2/user/categories',
    method: 'put',
    headers: {
      ...getHeaders(true)
    },
    data: {
      favourite_categories: categories
    }
  }
  return axios(options)
}

export const updateFavouriteCategories = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(updateFavouriteCategoriesFunc)

function getFavouriteOffersFunc () {
  let options = {
    url: baseURLs.users + '/v2/user/favouriteOffers',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const getFavouriteOffers = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getFavouriteOffersFunc)

function updateFavouriteOffersFunc (offerIds) {
  let options = {
    url: baseURLs.users + '/v2/user/favouriteOffers',
    method: 'put',
    headers: {
      ...getHeaders(true)
    },
    data: {
      favourite_offer_ids: offerIds
    }
  }
  return axios(options)
}

export const updateFavouriteOffers = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(updateFavouriteOffersFunc)

function getActiveSubscriptionFunc () {
  let options = {
    url: baseURLs.store + '/has_active_subscription',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}

export const getActiveSubscription = compose(
  promiseInterceptor(r => r.data.has_active_subscription),
  createRefreshed
)(getActiveSubscriptionFunc)

function updateUserLanguageFunc (language) {
  let options = {
    url: baseURLs.users + '/user/update_language',
    method: 'put',
    headers: getHeaders(true),
    data: { language }
  }
  return axios(options)
}

export const updateUserLanguage = compose(
  createRefreshed
)(updateUserLanguageFunc)

/**
 * Create the new saved list
 *
 * @param {String} savedListName New savedList name
 */

function createSavedListFunc (savedListName) {
  let options = {
    url: baseURLs.partners + '/user/saved-list',
    method: 'post',
    headers: {
      ...getHeaders(true)
    },
    data: {
      name: savedListName
    }
  }
  return axios(options)
}

export const createSavedList = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(createSavedListFunc)

/**
 * Get Saved list by Id
 *
 * @param {String} savedListId SavedList id
 */

function getSavedListByIdFunc (savedListId) {
  let options = {
    url: baseURLs.partners + '/user/saved-list' + `/${savedListId}`,
    method: 'get',
    headers: getHeaders(true)
  }
  return axios(options)
}

export const getSavedListByName = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getSavedListByIdFunc)

function updateAutoRenewFunc (data) {
  let options = {
    url: baseURLs.users + '/user/updateAutoRenew',
    method: 'put',
    headers: getHeaders(true),
    data
  }
  return axios(options)
}
export const updateAutoRenew = compose(
  partial(createServiceAnalyzed, 'update_user_profile'),
  createRefreshed
)(updateAutoRenewFunc)

function verifyAttemptFunc (data) {
  let options = {
    url: baseURLs.users + '/user/failed_payment_verification',
    method: 'post',
    headers: getHeaders(true),
    data
  }
  return axios(options)
}
export const verifyAttempt = compose(
  createRefreshed
)(verifyAttemptFunc)



// WEBPACK FOOTER //
// ./src/service/profile-service.js
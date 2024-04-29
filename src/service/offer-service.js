import axios from 'axios'
import store from '@/store'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { getCurrentID } from '@/service/user-service'
import partial from 'lodash/partial'
import { createServiceAnalyzed } from '@/service/analytics-service'
import {
  compose,
  promiseInterceptor,
  cleanBOM,
  unixToDateLocale,
  findSubstringMatches,
  sortBySubstringIndex,
  sortArrayObjectsBySortOrder
} from '@/utils'

import moment from 'moment'

// Offer Summary

function getOffersSummaryFunc (coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v4/offers/summary',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords
    }
  }
  return axios(options)
}

export const getOffersSummary = compose(
  partial(createServiceAnalyzed, 'offers_summary'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getOffersSummaryFunc)

// Categories

function getCategoriesFunc () {
  let options = {
    url: baseURLs.partners + '/v2/categories',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID()
    }
  }
  return axios(options)
}
export const getCategories = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCategoriesFunc)

// Offers by Category

function getOffersByCategoryFunc (category, featureOffer = false, coordinates = {}, page = 1, filters = [], sortBy = 'views', subcategoryFilter = []) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }

  let options = {
    url: baseURLs.partners + '/v4/offers/category/' + category,
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords,
      current_page: featureOffer ? '' : page,
      offer_filters: filters,
      sort_by: sortBy,
      subcategory_filters: subcategoryFilter,
      load_feature_offers: featureOffer
    }
  }
  return axios(options)
}

export const getOffersByCategory = compose(
  partial(createServiceAnalyzed, 'offers_by_category'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getOffersByCategoryFunc)

// Offer

function getOfferFunc (offerID, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v2/offers/' + offerID,
    method: 'get',
    headers: {'Cache-Control': 'no-cache', ...getHeaders()},
    params: {
      firebase_uid: getCurrentID(),
      ...coords
    }
  }
  return axios(options)
}

export const getOffer = compose(
  partial(createServiceAnalyzed, 'offer'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getOfferFunc)

// Tag Suggestions

function getTagSuggestionsFunc (query, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v2/tags/suggestions',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords,
      q: query
    }
  }
  return axios(options)
}

export const getTagSuggestions = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getTagSuggestionsFunc)

// Tags

function getTagsFunc (coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v2/tags',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords
    }
  }
  return axios(options)
}
export const getTags = compose(
  partial(createServiceAnalyzed, 'get_tags'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getTagsFunc)

// Search

function searchMultiFunc (tags = [], coordinates = {}, page = 1, filters = [], sortBy = 'views') {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v2/search',
    method: 'post',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords,
      include_generated_urls: true,
      current_page: page,
      offer_filters: filters,
      sort_by: sortBy
    },
    data: {
      tags
    }
  }
  return axios(options)
}

export const searchMulti = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(searchMultiFunc)

// Collection

function getCollectionFunc (id, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v2/collection/' + id,
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords
    }
  }
  return axios(options)
}

export const getCollections = () => {
  let options = {
    url: baseURLs.partners + '/v2/collection',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID()
    }
  }
  return axios(options)
}

export const getCollection = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCollectionFunc)

// Trending

function getTrendingOffersFunc (coordinates = {}, category = null) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let params = {
    ...coords,
    full: true
  }
  if (category) {
    params.category = category
  }
  let options = {
    url: baseURLs.partners + '/v2/trendingOffers',
    method: 'get',
    headers: {
      ...getHeaders()
    },
    params
  }
  return axios(options)
}
export const getTrendingOffers = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getTrendingOffersFunc)

// Offer Promo Code

function getOfferCodeFunc (offer, type) {
  let options = {
    url: baseURLs.partners + `/v2/offers/${offer.offer_id}/code`,
    method: 'get',
    headers: {
      ...getHeaders(true)
    },
    params: {
      is_online: type === 'online',
      is_website: 'True'
    }
  }
  return axios(options)
}
export const getOfferCode = compose(
  partial(createServiceAnalyzed, 'get_promo_code'),
  promiseInterceptor(r => {
    const codeData = r.data
    codeData.code = cleanBOM(codeData.code)
    return codeData
  }),
  createRefreshed
)(getOfferCodeFunc)

// Offer Promo URL

function getOfferURLFunc (offer) {
  let options = {
    url: baseURLs.partners + `/v2/offers/${offer.offer_id}/url`,
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const getOfferURL = compose(
  partial(createServiceAnalyzed, 'get_offer_url'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getOfferURLFunc)

// Get Proxy Website Toggled Partner URL

function getProxyWebsiteOfferURLFunc (offerId, firebaseUid = null) {
  let params = {}
  if (firebaseUid !== null) {
    params.firebase_uid = firebaseUid
  }
  let options = {
    url: baseURLs.partners + `/proxy/website/${offerId}/url`,
    method: 'get',
    headers: {
      ...getHeaders(true)
    },
    params: params
  }
  return axios(options)
}
export const getProxyWebsiteOfferURL = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getProxyWebsiteOfferURLFunc)

// Legal

function getLegalFunc () {
  let options = {
    url: baseURLs.partners + '/offerLegal',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getLegal = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getLegalFunc)

// Utility

export function offerTimeLeft (expiryTimestamp, round = false) {
  const expiry = unixToDateLocale(expiryTimestamp)
  const now = moment()
  let yearsLeft = moment(expiry).diff(now, 'years', true)
  let monthsLeft = moment(expiry).diff(now, 'months', true)
  let weeksLeft = moment(expiry).diff(now, 'weeks', true)
  const daysLeft = moment(expiry).diff(now, 'days')
  const hoursLeft = moment(expiry).diff(now, 'hours')
  const minutesLeft = moment(expiry).diff(now, 'minutes')
  yearsLeft = round ? Math.round(yearsLeft) : Math.trunc(yearsLeft)
  monthsLeft = round ? Math.round(monthsLeft) : Math.trunc(monthsLeft)
  weeksLeft = round ? Math.round(weeksLeft) : Math.trunc(weeksLeft)
  return {
    years: yearsLeft,
    months: monthsLeft,
    weeks: weeksLeft,
    days: daysLeft,
    hours: hoursLeft,
    minutes: minutesLeft
  }
}

export function filterTags (tags, query, limit = 10) {
  // commenting below line to allow users search with - in search input
  let searchSubstring = query.trim()
  let substringMatches = findSubstringMatches(tags, searchSubstring)
  let matches = substringMatches
  sortBySubstringIndex(query, matches)
  return matches.slice(0, limit)
}

export function filterOffers (filter, sort, offers, subcategory) {
  const onlineFilter = offer => !!offer.online
  const instoreFilter = offer => !!offer.in_store
  const spcPlusFilter = offer => !!offer.is_spc_plus
  const newofferOrPartnerFilter = offer => !!offer.is_new_offer || !!offer.is_new_partner
  const lto = (offer) => {
    if (offer.is_limited_time) {
      let currentDate = Date.now()
      if ((offer.lto_start_date <= currentDate) && (offer.lto_end_date >= currentDate)) {
        return offer
      }
    }
  }
  const subcategoryFilter = ({ subcategory_ids }) => subcategory_ids.some(subcategoryId => subcategory.includes(subcategoryId))

  if (filter) {
    if (filter.includes('online')) {
      offers = offers.filter(onlineFilter)
    }
    if (filter.includes('instore')) {
      offers = offers.filter(instoreFilter)
    }
    if (filter.includes('spc_plus')) {
      offers = offers.filter(spcPlusFilter)
    }
    if (filter.includes('lto')) {
      offers = offers.filter(lto)
    }
    if (filter.includes('new')) {
      offers = offers.filter(newofferOrPartnerFilter)
    }
  }
  if (sort) {
    offers = sortOffers(sort, offers)
  }
  if (subcategory) {
    if (subcategory.length) {
      offers = offers.filter(subcategoryFilter)
    } else return offers
  }
  return offers
}

export function sortOffers (sort, offers) {
  let sortedOffers = offers.slice(0)
  if (sort === 'most_redeemed') {
    return sortArrayObjectsBySortOrder(sortedOffers, 'views', 'desc')
  } else if (sort === 'highest_discount') {
    return sortedOffers.sort((a, b) => {
      if (a.discount_rank === b.discount_rank) {
        return a.views > b.views ? -1 : 1
      } else {
        return a.discount_rank > b.discount_rank ? -1 : 1
      }
    })
  } else if (sort === 'alphabetical') {
    return sortedOffers.sort((a, b) => a.partner_name.localeCompare(b.partner_name))
  } else if (sort === 'new') {
    return sortArrayObjectsBySortOrder(sortedOffers, 'start_date', 'desc')
  } else {
    return sortedOffers
  }
}

export function determineOfferType (offer) {
  if (!offer) return null
  if (offer.online) {
    if (offer.in_store) {
      return 'Both'
    } else {
      return 'Online'
    }
  } else {
    return 'Instore'
  }
}

// isFreeTrial

function getIsFreeTrialFunc () {
  let options = {
    url: baseURLs.partners + '/isFreeTrial',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getIsFreeTrial = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getIsFreeTrialFunc)

export function sortSPCPlusOffers (offers, partnersByID) {
  let spcplus = []
  spcplus = offers.filter(itm => itm.is_spc_plus)
  spcplus.map(itm => {
    itm.name = partnersByID[itm['partner_id']]['partner_name']
  })
  return sortArrayObjectsBySortOrder(spcplus, 'name')
}

function getActiveOffersByPartnerUrlNameFunc (partnerUrlName) {
  return axios({
    url: baseURLs.partners + '/v2/offers/partner/' + partnerUrlName,
    method: 'get'
  })
}

export const getActiveOffersByPartnerUrlName = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getActiveOffersByPartnerUrlNameFunc)

function getTrendingOffersHomePageFunc () {
  let options = {
    url: baseURLs.partners + '/offer/trending/active',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getTrendingOffersHomePage = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getTrendingOffersHomePageFunc)

function getPartnerOffersFunc (offerID, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: `${baseURLs.partners}/offer/${offerID}/partner/offers`,
    method: 'get',
    headers: {...getHeaders()},
    params: {
      firebase_uid: getCurrentID(),
      ...coords
    }
  }
  return axios(options)
}

export const getPartnerOffers = compose(
  partial(createServiceAnalyzed, 'offer'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getPartnerOffersFunc)

function getRelatedOffersFunc (offerID, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: `${baseURLs.partners}/offer/${offerID}/related/offers`,
    method: 'get',
    headers: {...getHeaders()},
    params: {
      firebase_uid: getCurrentID(),
      ...coords
    }
  }
  return axios(options)
}

export const getRelatedOffers = compose(
  partial(createServiceAnalyzed, 'offer'),
  promiseInterceptor(r => r.data),
  createRefreshed
)(getRelatedOffersFunc)

/**
 * Function to get active holiday events
 *
 * @returns {Array} Return holiday event array
 */

function getActiveHolidayEventFunc () {
  let options = {
    url: baseURLs.careers + '/holiday/active',
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getActiveHolidayEvent = compose(
  createRefreshed
)(getActiveHolidayEventFunc)

/**
 * Get Saved lists
 */

function getSavedListsFunc () {
  let options = {
    url: baseURLs.partners + `/user/saved-list`,
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}

export const getSavedLists = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getSavedListsFunc)

/**
 * Update Saved list by Id
 *
 * @param {String} savedListId SavedList id
 * @param {String} savedListName SavedList name
 * @param {Array} offerIds Offer ids
 */

function updateSavedListOfferFunc (savedListId, savedListName, offerIds) {
  let options = {
    url: baseURLs.partners + '/user/saved-list' + `/${savedListId}`,
    method: 'put',
    headers: {
      ...getHeaders(true)
    },
    data: {
      name: savedListName,
      offer_ids: offerIds
    }
  }
  return axios(options)
}

export const updateSavedListOffer = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(updateSavedListOfferFunc)

/**
 * Delete Saved list by Id
 *
 * @param {String} savedListId SavedList id
 *
 */

function deleteSavedListFunc (savedListId) {
  let options = {
    url: baseURLs.partners + '/user/saved-list' + `/${savedListId}`,
    method: 'delete',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}

export const deleteSavedList = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(deleteSavedListFunc)

function getCategoryDataFunc (categoryName, coordinates = {}) {
  return axios({
    url: baseURLs.partners + `/v4/categoryData/${categoryName}`,
    method: 'get',
    headers: getHeaders()
  })
}

export const getCategoryData = compose(
  promiseInterceptor(r => r.data)
)(getCategoryDataFunc)

function getLTOsFunc () {
  return axios({
    url: baseURLs.partners + '/v4/limitedTimeOffers',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...store.getters['location/coordinates']
    }
  })
}

export const getLTOs = compose(
  promiseInterceptor(r => r.data)
)(getLTOsFunc)

function getContestsFunc () {
  return axios({
    url: baseURLs.partners + '/v4/contests',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID()
    }
  })
}

export const getContests = compose(
  promiseInterceptor(r => r.data)
)(getContestsFunc)

function getCollectionsFunc () {
  return axios({
    url: baseURLs.partners + '/v4/collections',
    method: 'get',
    headers: getHeaders()
  })
}

export const getActiveCollections = compose(
  promiseInterceptor(r => r.data)
)(getCollectionsFunc)

function getAdsFunc () {
  return axios({
    url: baseURLs.partners + '/v4/ads',
    method: 'get',
    headers: getHeaders()
  })
}

export const getAds = compose(
  promiseInterceptor(r => r.data)
)(getAdsFunc)

/**
 * Function to get the available themes
 *
 * @returns response
 */

function getThemesFunc () {
  let options = {
    url: baseURLs.partners + '/theme/order',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID()
    }
  }
  return axios(options)
}
export const getThemes = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getThemesFunc)

// Category Offers by Locations

function getCategoryOffersByLocationFunc (category, postalCode, distance, coordinates = {}, page = 1, filters = [], sortBy = 'views', subcategoryFilter = []) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }
  let options = {
    url: baseURLs.partners + '/v4/offers/category/' + category,
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      distance: distance,
      postal_code: postalCode,
      ...coords,
      current_page: page,
      offer_filters: filters,
      sort_by: sortBy,
      subcategory_filters: subcategoryFilter
    }
  }
  return axios(options)
}

export const getCategoryOffersByLocation = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCategoryOffersByLocationFunc)

// SPCPlus Offers by Locations

function getSPCPlusOffersByLocationFunc (postalCode, distance, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }

  let options = {
    url: baseURLs.partners + '/v4/offers/summary',
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      distance: distance,
      postal_code: postalCode,
      ...coords
    }
  }
  return axios(options)
}

export const getSPCPlusOffersByLocation = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getSPCPlusOffersByLocationFunc)

// Search Offers by Locations

function getSearchOffersByLocationFunc (tags = [], postalCode, distance, coordinates = {}, page = 1, filters = [], sortBy = 'views') {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }

  let options = {
    url: baseURLs.partners + '/v2/search',
    method: 'post',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      ...coords,
      include_generated_urls: true,
      distance: distance,
      postal_code: postalCode,
      current_page: page,
      offer_filters: filters,
      sort_by: sortBy
    },
    data: {
      tags
    }
  }
  return axios(options)
}

export const getSearchOffersByLocation = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getSearchOffersByLocationFunc)

// Collection Offers by Locations

function getCollectionOffersByLocationFunc (id, postalCode, distance, coordinates = {}) {
  let coords = {}
  if (coordinates) {
    coords.lat = coordinates.lat
    coords.lon = coordinates.lon
  }
  if (!(coords.lat && coords.lon)) {
    coords = store.getters['location/coordinates']
  }

  let options = {
    url: baseURLs.partners + '/v2/collection/' + id,
    method: 'get',
    headers: getHeaders(),
    params: {
      firebase_uid: getCurrentID(),
      distance: distance,
      postal_code: postalCode,
      ...coords
    }
  }
  return axios(options)
}

export const getCollectionOffersByLocation = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCollectionOffersByLocationFunc)

function usedPromoCodeFunc (codeId) {
  let options = {
    url: baseURLs.partners + '/redeemedcode/' + codeId,
    method: 'delete',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const usedPromoCode = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(usedPromoCodeFunc)

// verify if valid HBC user
function getVerifyHbcUserFunc () {
  let options = {
    url: baseURLs.partners + '/verify-user/hbc',
    method: 'get',
    headers: {
      ...getHeaders(true)
    }
  }
  return axios(options)
}
export const getVerifyHbcUser = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getVerifyHbcUserFunc)



// WEBPACK FOOTER //
// ./src/service/offer-service.js
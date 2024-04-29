import * as types from './types'
import { assert } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

export default {
  [types.LOAD_CATEGORIES] (state, categories) {
    assert(categories, '[Object]')
    state.categories = cloneDeep(categories)
    state.hasLoadedCategories = true
  },
  [types.LOAD_OFFER_SUMMARY] (state, offersByCategory) {
    assert(offersByCategory, 'Object')
    state.offersSummaryByCategory = cloneDeep(offersByCategory)
    state.hasLoadedOffersSummaryByCategory = true
  },
  [types.LOAD_OFFERS] (state, offers) {
    assert(offers, '[Object]')
    state.offers = cloneDeep(offers)
    state.hasLoadedOffers = true
  },
  [types.LOAD_LIMITED_TIME] (state, limitedTime) {
    assert(limitedTime, '[Object]')
    state.offersLimitedTime = cloneDeep(limitedTime)
    state.hasLoadedLimitedTime = true
  },
  [types.LOAD_TRENDING] (state, trending) {
    assert(trending, '[Object]')
    state.offersTrending = cloneDeep(trending)
    state.hasLoadedTrending = true
  },
  [types.LOAD_COLLECTIONS] (state, collections) {
    assert(collections, '[Object]')
    state.collections = cloneDeep(collections)
    state.hasLoadedCollections = true
  },
  [types.LOAD_SEARCH_TAGS] (state, tags) {
    assert(tags, '[Object]')
    state.searchTags = cloneDeep(tags)
    state.hasLoadedSearchTags = true
  },
  [types.LOAD_OFFER_LEGAL] (state, legal) {
    assert(legal, 'Object')
    state.offerLegal = cloneDeep(legal)
    state.hasLoadedOfferLegal = true
  },
  [types.LOAD_CONTESTS] (state, contests) {
    assert(contests, '[Object]')
    state.contests = cloneDeep(contests)
    state.hasLoadedContests = true
  },
  [types.LOAD_ADS] (state, ads) {
    assert(ads, '[Object]')
    state.ads = cloneDeep(ads)
    state.hasLoadedAds = true
  },
  [types.LOAD_FAVOURITE_OFFERS] (state, favourites) {
    assert(favourites, 'Array')
    state.favouriteOffers = cloneDeep(favourites)
    state.hasLoadedFavouriteOffers = true
  },
  [types.UPDATE_PARTNER_MAP] (state, partners) {
    assert(partners, 'Object')
    state.partnersByID = { ...state.partnersByID, ...partners }
    state.hasLoadedPartners = true
  },
  [types.UPDATE_FLAG] (state, { flag, value }) {
    assert(flag, 'String')
    assert(value, 'Boolean')
    state[flag] = value
  },
  [types.LOAD_SAVED_LIST] (state, savedList) {
    assert(savedList, '[Object]')
    state.savedList = cloneDeep(savedList)
    state.hadSavedList = true
  },
  [types.LOAD_OFFERS_BY_CATEGORY] (state, { categoryName, offers }) {
    Vue.set(state.offersByCategory, categoryName, offers)
    state.hasLoadedOffersByCategory = true
  },
  [types.LOAD_PARTNERS_BY_CATEGORY] (state, { categoryName, partners }) {
    Vue.set(state.partnersByCategory, categoryName, partners)
    state.hasLoadedPartnersByCategory = true
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/offers/mutations.js
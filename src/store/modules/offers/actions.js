import * as types from './types'
import {
  getOffersSummary,
  getTrendingOffers,
  getTags,
  getLegal,
  determineOfferType,
  getCategories,
  getSavedLists,
  updateSavedListOffer,
  getCategoryData,
  getLTOs,
  getContests,
  getActiveCollections,
  getAds
} from '@/service/offer-service'
import {
  getFavouriteOffers,
  updateFavouriteOffers
} from '@/service/profile-service'
import { ACTIONS } from '@/service/analytics-service'

export default {
  async loadSummary ({ commit, getters }, force = false) {
    if (!force && getters.hasLoadedSummary) {
      return
    }
    const loadingFlags = [
      'summaryLoading',
      'catergoriesLoading',
      'partnersLoading',
      'offersSummaryByCategoryLoading',
      'offersLimitedTimeLoading',
      'collectionsLoading',
      'contestsLoading',
      'adsLoading',
      'offerLegalLoading',
      'offersLoading'
    ]
    const updateFlags = (flags, value) => {
      loadingFlags.forEach(flag => {
        commit(types.UPDATE_FLAG, { flag, value })
      })
    }
    updateFlags(loadingFlags, true)
    try {
      const data = await getOffersSummary()
      commit(types.LOAD_CATEGORIES, data.categories)
      commit(types.LOAD_OFFERS, data.offers)
      commit(types.UPDATE_PARTNER_MAP, data.partners_by_id)
      commit(types.LOAD_LIMITED_TIME, data.limited_time_offers)
      commit(types.LOAD_COLLECTIONS, data.collections)
      commit(types.LOAD_CONTESTS, data.contests)
      commit(types.LOAD_ADS, data.ads)
      commit(types.LOAD_OFFER_LEGAL, data.legal)
      commit(types.UPDATE_FLAG, {
        flag: 'hasLoadedSummary',
        value: true
      })
    } finally {
      updateFlags(loadingFlags, false)
    }
  },
  async loadTrending ({ commit, getters }, force = false) {
    if (!force && getters.hasLoadedTrending) {
      return
    }
    const flag = 'offersLimitedTimeLoading'
    commit(types.UPDATE_FLAG, { flag, value: true })
    try {
      const data = await getTrendingOffers()
      commit(types.LOAD_TRENDING, data.trending_offers)
      commit(types.UPDATE_PARTNER_MAP, data.partners_by_id)
    } finally {
      commit(types.UPDATE_FLAG, { flag, value: false })
    }
  },
  async loadFavourites ({ commit }) {
    const flag = 'favouriteOffersLoading'
    commit(types.UPDATE_FLAG, { flag, value: true })
    try {
      const data = await getFavouriteOffers()
      commit(types.LOAD_FAVOURITE_OFFERS, data)
    } finally {
      commit(types.UPDATE_FLAG, { flag, value: false })
    }
  },
  async updateFavourites ({ commit, getters }, { additions = [], removals = [], section }) {
    const additionIDs = additions.map(addition => addition.offer.offer_id)
    const removalIDs = removals.map(removal => removal.offer.offer_id)
    const backup = [...getters.favouriteOffers]
    const preview = []
    getters.favouriteOffers.forEach(datum => {
      if (!removalIDs.includes(datum)) preview.push(datum)
    })
    additionIDs.forEach(offerID => preview.push(offerID))
    commit(types.LOAD_FAVOURITE_OFFERS, preview)
    const newData = []
    let data = []
    try {
      const data = await getFavouriteOffers()
      data.forEach(datum => {
        if (!removalIDs.includes(datum)) newData.push(datum)
      })
      additionIDs.forEach(offerID => newData.push(offerID))
    } catch (error) {
      commit(types.LOAD_FAVOURITE_OFFERS, backup)
      throw error
    }
    try {
      const updatedOfferIDs = await updateFavouriteOffers(newData)
      commit(types.LOAD_FAVOURITE_OFFERS, updatedOfferIDs)
      removals.forEach(({ offer, partner }) => {
        ACTIONS.FAVOURITE_REMOVED({
          offerID: offer.offer_id,
          offerName: offer.title_en,
          offerType: determineOfferType(offer),
          featured: offer.is_limited_time,
          category: offer.category,
          partnerName: partner.partner_name,
          partnerID: partner.partner_id,
          sourceSection: section,
          plusOffer: offer.is_spc_plus
        })
      })
      additions.forEach(({ offer, partner }) => {
        ACTIONS.FAVOURITE_ADDED({
          offerID: offer.offer_id,
          offerName: offer.title_en,
          offerType: determineOfferType(offer),
          featured: offer.is_limited_time,
          category: offer.category,
          partnerName: partner.partner_name,
          partnerID: partner.partner_id,
          sourceSection: section,
          plusOffer: offer.is_spc_plus
        })
      })
      return updatedOfferIDs
    } catch (error) {
      commit(types.LOAD_FAVOURITE_OFFERS, data)
      throw error
    }
  },
  async clearFavourites ({ commit }) {
    commit(types.LOAD_FAVOURITE_OFFERS, [])
  },
  async loadTags ({ commit }) {
    const flag = 'searchTagsLoading'
    commit(types.UPDATE_FLAG, { flag, value: true })
    try {
      const data = await getTags()
      commit(types.LOAD_SEARCH_TAGS, data)
    } finally {
      commit(types.UPDATE_FLAG, { flag, value: false })
    }
  },
  async loadLegal ({ commit }) {
    const flag = 'offerLegalLoading'
    commit(types.UPDATE_FLAG, { flag, value: true })
    try {
      const data = await getLegal()
      commit(types.LOAD_OFFER_LEGAL, data)
    } finally {
      commit(types.UPDATE_FLAG, { flag, value: false })
    }
  },
  async loadCategories ({ commit, getters }, refresh = false) {
    if (getters.hasLoadedCategories && !refresh) return

    const categories = await getCategories()
    commit(types.LOAD_CATEGORIES, categories)
  },
  /**
    * Action to get the saved list
    */
  async loadSavedList ({ commit }, authStatus = true) {
    const flag = 'savedListLoading'
    if (!authStatus) return
    commit(types.UPDATE_FLAG, { flag, value: true })
    try {
      const data = await getSavedLists()
      commit(types.LOAD_SAVED_LIST, data)
    } finally {
      commit(types.UPDATE_FLAG, { flag, value: false })
    }
  },
  /**
    * Action to update the saved list
    */
  async updateSavedList ({ commit, getters }, { offerIds = [], listId, listName, offerAdded = [], offerRemoved = [] }) {
    const currentSavedList = [...getters.savedList]
    try {
      const updatedList = await updateSavedListOffer(listId, listName, offerIds)
      var list = currentSavedList.filter(itm => itm.id === updatedList.id)[0]
      list.offer_ids = updatedList.offer_ids
      list.name = updatedList.name
      commit(types.LOAD_SAVED_LIST, currentSavedList)
      return updatedList
    } catch (error) {
      commit(types.LOAD_SAVED_LIST, currentSavedList)
      throw error
    }
  },
  async loadCategoryData ({ commit, getters }) {
    if (getters.hasLoadedOffersByCategory && getters.hasLoadedPartnersByCategory) return

    for (const category of getters.categories) {
      const categoryData = await getCategoryData(category.name_en)
      commit(types.LOAD_OFFERS_BY_CATEGORY, {categoryName: category.name_en, offers: categoryData.offers})
      commit(types.LOAD_PARTNERS_BY_CATEGORY, {categoryName: category.name_en, partners: categoryData.partners_by_id})
    }
  },
  async loadLTOs ({ commit, getters }, coordinates) {
    if (getters.hasLoadedLimitedtime) return

    const ltoData = await getLTOs()
    commit(types.LOAD_LIMITED_TIME, ltoData.ltos)
    commit(types.LOAD_PARTNERS_BY_CATEGORY, {categoryName: 'lto', partners: ltoData.partners_by_id})
  },
  async loadContests ({ commit, getters }) {
    if (getters.hasLoadedContests) return

    const contests = await getContests()
    commit(types.LOAD_CONTESTS, contests)
  },
  async loadCollections ({ commit, getters }) {
    if (getters.hasLoadedCollections) return

    const collections = await getActiveCollections()
    commit(types.LOAD_COLLECTIONS, collections)
  },
  async loadAds ({ commit, getters }) {
    if (getters.hasLoadedAds) return

    const ads = await getAds()
    commit(types.LOAD_ADS, ads)
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/offers/actions.js
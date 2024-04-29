import { filterTags, filterOffers } from '@/service/offer-service'

const RESULTS_LIMIT = 10

export default {
  summaryLoading: state => state.summaryLoading,
  hasLoadedSummary: state => state.hasLoadedSummary,
  categories: state => state.categories,
  catergoriesLoading: state => state.catergoriesLoading,
  hasLoadedCategories: state => state.hasLoadedCategories,
  partnersByID: state => state.partnersByID,
  partnersLoading: state => state.partnersLoading,
  hasLoadedPartners: state => state.hasLoadedPartners,
  offersSummaryByCategory: state => state.offersSummaryByCategory,
  filterOffersSummaryByCategory: state => (filter, offer) => filterOffers(filter, null, offer),
  offersSummaryByCategoryLoading: state => state.offersSummaryByCategoryLoading,
  hasLoadedOffersSummaryByCategory: state => state.hasLoadedOffersSummaryByCategory,
  offersLimitedTime: state => state.offersLimitedTime,
  offersLimitedTimeLoading: state => state.offersLimitedTimeLoading,
  hasLoadedLimitedtime: state => state.hasLoadedLimitedtime,
  offersTrending: state => state.offersTrending,
  offersTrendingLoading: state => state.offersTrendingLoading,
  hasLoadedTrending: state => state.hasLoadedTrending,
  collections: state => state.collections,
  collectionsLoading: state => state.collectionsLoading,
  hasLoadedCollections: state => state.hasLoadedCollections,
  searchTags: state => state.searchTags,
  searchTagStrings: state => state.searchTags.map(tag => tag.name),
  searchTagsLoading: state => state.searchTagsLoading,
  hasLoadedSearchTags: state => state.hasLoadedSearchTags,
  searchTagSuggestions: (_, getters) => query => filterTags(getters.searchTagStrings, query, RESULTS_LIMIT),
  offerLegal: state => state.offerLegal,
  offerLegalLoading: state => state.offerLegalLoading,
  hasLoadedOfferLegal: state => state.hasLoadedOfferLegal,
  contests: state => state.contests,
  contestsLoading: state => state.contestsLoading,
  hasLoadedContests: state => state.hasLoadedContests,
  ads: state => state.ads,
  adsLoading: state => state.adsLoading,
  hasLoadedAds: state => state.hasLoadedAds,
  favouriteOffers: state => state.favouriteOffers,
  favouriteOffersLoading: state => state.favouriteOffersLoading,
  hasLoadedFavouriteOffers: state => state.hasLoadedFavouriteOffers,
  isMostredeemed: state => state.isMostredeemed,
  offers: state => state.offers,
  filterOffers: state => (filter, offer) => filterOffers(filter, null, offer),
  offersLoading: state => state.offersLoading,
  hasLoadedOffers: state => state.hasLoadedOffers,
  savedList: state => state.savedList,
  savedListLoading: state => state.savedListLoading,
  hadSavedList: state => state.hadSavedList,
  offersByCategory: state => state.offersByCategory,
  hasLoadedOffersByCategory: state => state.hasLoadedOffersByCategory,
  partnersByCategory: state => state.partnersByCategory,
  hasLoadedPartnersByCategory: state => state.hasLoadedPartnersByCategory
}



// WEBPACK FOOTER //
// ./src/store/modules/offers/getters.js
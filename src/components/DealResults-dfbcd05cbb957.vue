<template>
  <SPCPage>
    <div v-if="typeKey==='Favourites' || typeKey==='SavedList' && !loading" class="en_collection_desktop"
      :style="`background-image: url(${getURL(themeImage)})`"
    >
      <img v-if="typeKey==='SavedList'" class="trash-img" @click="showDeleteAlert" :src="require('@/assets/images/icons/general/icon-linear-trash-alt.png')"/>
      <div class="title-left">
        <h1 v-if="!showEditList" class="saved-offer-title">
          <span :title="$t(title)" v-if="$t(title).length > savedDealtitleLength" >
           {{ $t(title).slice(0, savedDealsliceLimit).concat('...') }}
          </span>
          <span v-else>
            {{ $t(title) }}
          </span>
          <img v-if="typeKey==='SavedList'" class="pencil-img" @click="showEditPopup" :src="require('@/assets/images/icons/general/icon-solid-pencil-alt.png')"/>
        </h1>
      </div>
      <p v-if="loggedIn && fullName" class="user-name">
        {{ fullName }}
      </p>
      </div>
      <div v-if="typeKey==='Favourites'" class="trending-outer-wrap">
        <div class="page-container">
          <div class="custom-list-heading">
            <h1 class="category-title">{{ $t('shopping_list') }}</h1>
            <a class="view-all" @click="showCreateListModal">{{ $t('new_list') }}</a>
          </div>
          <div v-if="typeKey==='Favourites' && customList && customList.length > 0" class="trending-box-wrap">
            <div class="trending-list-wrap text-center">
              <div class="slider-container">
                <div v-if="showArrows" @click="scrollLeft()" class="nav arrow-nav" :class="{ hidden: !showLeftArrow }">
                  <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowLeft_Black.svg')"/>
                </div>
                <div v-if="!validateDeviceWidth('Mobile', screenWidth)" class="overflow-container fade-container">
                  <ul class="list-reset-horizontal padded-list hide-scrollbar trending-list custom-ul-design" ref="scroll-container" @scroll="handleScroll">
                    <li v-for="list of customList" :key="list.id"  class="trending-list-item">
                      <div class="custom-list-container" @click="showList(list)">
                        <h1 class="my-list" v-if="list.name.length < tabletMaxWidth" :class="{ 'my-list-extend': list.name.length > tabletMinWidth }">
                          {{ list.name }}
                        </h1>
                        <h1 v-else class="my-list-extend" :title="list.name">
                          {{ list.name.slice(0,tabletSliceLimit).concat('...')}}
                        </h1>
                        <p class="items">
                          {{ list.offer_ids ? list.offer_ids.length : 0 }} {{ $t('items') }}
                        </p>
                        <img class="arrow-img" :src="require(`@/assets/images/qrlanding/arrow.png`)" alt="arrow">
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-else class="offers-grid">
                  <div class="offer-grid-item-container" :class="{'mr-bt': enableMobileAppView}">
                    <carousel :per-page="1">
                      <slide v-for="(v, index) in customList.length > 10 ? 5 : Math.ceil(customList.length / 2)" :key="index">
                          <div class="outer-container" @click="showList(customList[index === 0 ? index : (index+index)])">
                            <div class="app-view-container" v-if="customList[index === 0 ? index : (index+index)]">
                              <div class="list-container">
                                <div class="list-name" v-if=" screenWidth > screenMinWidth && customList[index === 0 ? index : (index+index)].name.length > mobileMaxWidth">{{customList[index === 0 ? index : (index+index)].name.slice(0,mobileMaxsliceLimit).concat('...')}}</div>
                                <div class="list-name" v-else-if="screenWidth < screenMinWidth && customList[index === 0 ? index : (index+index)].name.length > mobileMinWidth">{{customList[index === 0 ? index : (index+index)].name.slice(0,mobileMinsliceLimit).concat('...')}}</div>
                                <div class="list-name" v-else>{{customList[index === 0 ? index : (index+index)].name}}</div>
                                <div class="list-length">{{ customList[index === 0 ? index : (index+index)].offer_ids ? customList[index === 0 ? index : (index+index)].offer_ids.length : 0 }}&nbsp;{{ $t('items') }}</div>
                              </div>
                              <div class="button-container" >
                                <div class="button">
                                  View <img :src="require(`@/assets/images/qrlanding/arrow.png`)" alt="arrow">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="outer-container" @click="showList(customList[index === 0 ? index+1 : (index+index+1)])">
                            <div class="app-view-container" v-if="customList[index === 0 ? index+1 : (index+index+1)]">
                              <div class="list-container">
                                <div class="list-name" v-if="screenWidth > screenMinWidth && customList[index === 0 ? index+1 : (index+index+1)].name.length > mobileMaxWidth">{{customList[index === 0 ? index+1 : (index+index+1)].name.slice(0,mobileMaxsliceLimit).concat('...')}}</div>
                                <div class="list-name" v-else-if="screenWidth < screenMinWidth && customList[index === 0 ? index+1 : (index+index+1)].name.length > mobileMinWidth">{{customList[index === 0 ? index+1 : (index+index+1)].name.slice(0,mobileMinsliceLimit).concat('...')}}</div>
                                <div class="list-name" v-else>{{customList[index === 0 ? index+1 : (index+index+1)].name}}</div>
                                <div class="list-length">{{ customList[index === 0 ? index+1 : (index+index+1)].offer_ids ? customList[index === 0 ? index+1 : (index+index+1)].offer_ids.length : 0 }}&nbsp;{{ $t('items') }}</div>
                              </div>
                              <div class="button-container" >
                                <div class="button">
                                  View <img :src="require(`@/assets/images/qrlanding/arrow.png`)" alt="arrow">
                                </div>
                              </div>
                            </div>
                          </div>
                      </slide>
                    </carousel>
                  </div>
                </div>
                <div v-if="showArrows" @click="scrollRight()" class="nav arrow-nav" :class="{ hidden: !showRightArrow }">
                  <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowRight_Black.svg')"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div v-if="showCollectionBanner && !loading" class="en_collection_desktop"
      :style="`background-image: url(${getURL(themeImage)})`"
    >
      <h1 class="saved-offer">
        {{ title }}
      </h1>
      <p class="user-name">
        {{ $t('collection') }}
      </p>
    </div>
    <div class="results-container">
      <div class="results-container-inner">
        <SpinnerLoading v-if="loading" class="loading-margin"/>
        <div v-else class="offer-results-container">
          <div v-if="typeKey === 'All Offers'" class="banner" slot="pre" :class="typeKey">
            <Banner :name="categoryURL" :showBackOption="true"></Banner>
          </div>
          <!--Feature Section Start-->
          <FeatureSection
            v-if="featureSection"
            :offers="offersFiltered('lto', offerSort, featureOffers ? featureOffers : offers, offerSubcategoryFilter, 'featureSection')"
            :partners="featurePartnersByID ? featurePartnersByID : partnersByID"
            :title="title"
            :alignLeft="alignLeft"
          />
          <!--Feature Section End-->
          <div class="top-adjust">
            <div class="ad-banner-container" v-if="isFromCollection && adBannerImagePath">
              <AdBanner :imagePath="adBannerImagePath"/>
            </div>
            <h1 v-if="typeKey==='Favourites'" class="inline-title center">{{this.title}}</h1>
            <h1 v-if="allCategoryTitle && isWithHeader && typeKey!='Favourites' && typeKey!='SavedList'" class="inline-title center">{{allCategoryTitle}}</h1>
            <div v-if="mostRedeemed">
              <h2>{{ $t('most_redeemed') }}</h2>
              <CategoryRow
                v-if="mostRedeemed.trending_offers && mostRedeemed.trending_offers.length"
                :category="null"
                :offers="offersFiltered(offerFilter, offerSort, mostRedeemed.trending_offers, offerSubcategoryFilter, 'mostRedeemed')"
                :partners="mostRedeemed.partners_by_id"
                :hasViewAll="false"
                :hasHeading="false"
                :sectionName="'Most Redeemed'"
                :shrinkOfferTile="true"
                />
              <div class="center-content">
                <h3 class="line"><span class="text-inside">{{allCategoryTitle}}</span></h3>
              </div>
            </div>

            <!-- Start - Rail Banner Section for Collection Pages -->
            <Banner 
              v-if="is_rail_banner" 
              :name="'collection'" 
              :clickable="true" 
              :railBannerName="title" 
              :setBannerDetails="rail_banner" />
            <!-- End - Rail Banner Section for Collection Pages -->

            <div class="sort-filter-wrapper" v-if="typeKey!='SavedList' && (isWithSort || isWithFilter || isWithSubcategoryFilter) && (offers.length || offerFilter || offerSort)">
              <div class="sort-wrap" v-if="isWithSort">
                <OfferSort v-model="offerSort" @select="updateOfferSort"/>
              </div>
              <div class="filter-wrap" v-if="isWithFilter">
                <OfferTypeFilter v-model="offerFilter" @select="updateOfferFilter" @updateLocationFilter="updateLocationFilter"/>
              </div>
              <div class="subcategory-filter-wrap" v-if="isWithSubcategoryFilter">
                <OfferSubcategoryFilter v-model="offerSubcategoryFilter" :subcategories="subcategories" @select="updateOfferSubcategoryFilter"/>
              </div>
              <div class="sort-filter-wrap show-mobile">
                <MobileSortFilter @mobilefilter="updateMobileFilter" @mobilesort="updateMobileSort" @updateLocationFilter="updateLocationFilter"/>
              </div>
              <div class="sort-subcategory-filter-wrap show-mobile">
                <MobileSubcategoryFilter @mobilesubcategoryfilter="updateMobileSubcategoryFilter" :subcategories="subcategories"/>
              </div>
            </div>
            <OfferGrid
              v-if="carouselBanner.length <= 0"
              :offers=" isSearchOffers ? searchOffers() : mainOffersFiltered(offerFilter, offerSort, offers, offerSubcategoryFilter)"
              :partners="partnersByID"
              :source="typeKey"
              :showFavourites="showFavourites"
              :enableMobileAppView="enableMobileView"
              :scrollToLetter="selectedLetter"
              :enableScrollDelete="enableScroll"
              @refreshList="refreshList"
              :showDealsButton="showDealsButton"
              :firstLoading="page === 1"
              :offerLoaded="isSearchOffers && searchOffers().length > 0"
              :dataLoading="dataLoading"
              >
              <slot></slot>
            </OfferGrid>
            <OfferGridSlice 
              v-else
              :carouselBanner="carouselBanner"
              :primaryOffers="primaryOffers"
              :secondaryOffers="secondaryOffers"
              :partners="partnersByID"
              :source="typeKey"
              :showFavourites="showFavourites"
              :enableMobileAppView="enableMobileView"
              :scrollToLetter="selectedLetter"
              :enableScrollDelete="enableScroll"
              @refreshList="refreshList"
              :showDealsButton="showDealsButton"
              :firstLoading="page === 1"
              :offerLoaded="isSearchOffers && searchOffers().length > 0"
              :dataLoading="dataLoading"
              :locationOffers="locationOffers"
              :isLocationOfferLoaded="isLocationOfferLoaded"
              :offerFilter="offerFilter"
              :offerSubcategoryFilter="offerSubcategoryFilter"
              :offerSort="offerSort"
              :secondaryCondition="secondaryCondition" 
            />
            <CollectionSection v-if="showCollections && collections.length" :title="$t('more_collection')" :collections="collections"></CollectionSection>
            <div v-if="isSPCPlusDetail" class="view-all-deals">
              <button
                class="spc-button-v2 width-constrained"
                @click="viewAllSPCDeals()"
              >{{ $t('all_spc_deals') }}</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <DeleteListModal
        :show="showModal(MODAL_TYPES.DELETE_LIST_MODAL)"
        @close="closeModal(MODAL_TYPES.DELETE_LIST_MODAL)"
        @confirmDeleteList="confirmDeleteList"
      />
      <EditListModal
        :list="currentList"
        :show="showModal(MODAL_TYPES.EDIT_LIST_MODAL)"
        @close="closeModal(MODAL_TYPES.EDIT_LIST_MODAL)"
        @refreshList="refreshList"
      />
      <OfferTileAlertBannerModal/>
  </SPCPage>
</template>

<script>
import SPCPage from '@/components/SPCPage'
import AdBanner from '@/components/AdBanner'
import SpinnerLoading from '@/components/Utility/SpinnerLoading'
import OfferTypeFilter from '@/components/OfferTypeFilter'
import OfferSubcategoryFilter from '@/components/OfferSubcategoryFilter'
import OfferGrid from '@/components/OfferGrid'
import CategoryRow from '@/components/CategoryRow'
import AlphabeticalList from '@/components/Utility/AlphabeticalList'
import { filterOffers } from '@/service/offer-service'
import { ACTIONS } from '@/service/analytics-service'
import { PAGE_NAMES } from '@/router'
import OfferSort from '@/components/OfferSort'
import Banner from '@/components/Common/Banner'
import BannerRow from '@/components/BannerRow'
import { getURL } from '@/service/api-config'
import { mapGetters, mapActions } from 'vuex'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import FeatureSection from '@/components/Common/FeatureSection'
import CollectionSection from '@/components/Common/CollectionSection'
import MobileSortFilter from '@/components/MobileSortFilter'
import MobileSubcategoryFilter from '@/components/MobileSubcategoryFilter'
import DeleteListModal from '@/components/Modals/DeleteListModal'
import EditListModal from '@/components/Modals/EditListModal'
import OfferTileAlertBannerModal from '@/components/Modals/OfferTileAlertBannerModal'
import BannerCarousel from '@/components/Common/BannerCarousel'
import OfferGridSlice from '@/components/OfferGridSlice'
import {
  validateDeviceWidth,
  startIndex,
  endIndex
} from '@/utils'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  data () {
    return {
      selectedLetter: '',
      MODAL_TYPES,
      itemWidth: 450,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0,
      isLocationFilter: false,
      screenWidth: window.innerWidth,
      screenMinWidth: 350,
      savedDealtitleLength: 23,
      savedDealsliceLimit: 20,
      tabletMaxWidth: 56,
      tabletMinWidth: 30,
      tabletSliceLimit: 55,
      mobileMaxWidth: 60,
      mobileMinWidth: 40,
      mobileMinsliceLimit: 35,
      mobileMaxsliceLimit: 55,
      filterDistance: '',
      filterLoaction: '',
      page: 1,
      RowBanner: 1,
      enableMobileView: true,
      previousScrollTop: 0
    }
  },
  components: {
    AdBanner,
    SPCPage,
    SpinnerLoading,
    OfferTypeFilter,
    OfferSubcategoryFilter,
    OfferSort,
    OfferGrid,
    CategoryRow,
    AlphabeticalList,
    Banner,
    BannerRow,
    FeatureSection,
    CollectionSection,
    MobileSortFilter,
    MobileSubcategoryFilter,
    DeleteListModal,
    EditListModal,
    BannerCarousel,
    OfferGridSlice,
    OfferTileAlertBannerModal
  },
  props: {
    adBannerImagePath: {
      type: String,
      required: false
    },
    backUrl: {
      type: String,
      default: '/deals'
    },
    title: {
      type: String,
      required: false
    },
    imagePath: {
      type: String,
      default: null
    },
    isWithHeader: {
      type: Boolean,
      default: true
    },
    isWithFilter: {
      type: Boolean,
      default: true
    },
    carouselBanner: {
      type: Array,
      default: () => ([])
    },
    isWithSubcategoryFilter: {
      type: Boolean,
      default: false
    },
    subcategories: {
      type: Array,
      required: true,
      default: () => ([])
    },
    isWithSort: {
      type: Boolean,
      default: true
    },
    offers: {
      type: Array,
      required: true
    },
    partnersByID: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    offerFilter: {
      type: Array,
      default: null
    },
    offerSubcategoryFilter: {
      type: Array,
      default: null
    },
    offerSort: {
      type: String,
      default: 'most_redeemed'
    },
    typeKey: {
      type: String,
      default: null
    },
    showFavourites: {
      type: Boolean,
      default: true
    },
    isSPCPlusDetail: {
      type: Boolean,
      default: false
    },
    mostRedeemed: {
      type: Object,
      default: null
    },
    allCategoryTitle: {
      type: String,
      default: ''
    },
    isFromCollection: {
      type: Boolean,
      default: false
    },
    featureSection: {
      type: Boolean,
      default: false
    },
    showCollections: {
      type: Boolean,
      default: false
    },
    collections: {
      type: Array,
      required: false
    },
    showCollectionBanner: {
      type: Boolean,
      required: false,
      default: false
    },
    collectionBannerTitle: {
      type: String,
      required: false
    },
    customList: {
      type: Object,
      default: null
    },
    showEditList: {
      type: Boolean,
      default: false
    },
    currentList: {
      type: Object,
      default: null
    },
    locationOffers: {
      type: Array,
      required: false,
      default: () => ([])
    },
    isLocationOfferLoaded: {
      type: Boolean,
      required: false,
      default: false
    },
    applyFilter: {
      type: Array,
      required: false,
      default: null
    },
    showDealsButton: {
      type: Boolean,
      default: false
    },
    is_rail_banner: {
      type: Boolean,
      required: false,
      default: false
    },
    rail_banner: {
      type: Object,
      required: false,
      default: () => ({})
    },
    categoryBannerNameEn: {
      type: String,
      required: false
    },
    nextPage: {
      type: Boolean,
      default: false
    },
    isSearchOffers: {
      type: Boolean,
      default: false
    },
    dataLoading: {
      type: Boolean,
      default: false
    },
    featureOffers: {
      type: Array,
      default: () => ([])
    },
    featurePartnersByID: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters('modals', [
      'showModal'
    ]),
    ...mapGetters([
      'language',
      'fullName',
      'loggedIn',
      'themeImage',
      'offerGridDivHeight'
    ]),
    ...mapGetters('offers', [
      'favouriteOffers',
      'savedList'
    ]),
    primaryOffers () {
      if (this.isSearchOffers) {
        return this.searchOffers().slice(0, endIndex(this.screenWidth) * this.RowBanner)
      }
      return this.mainOffersFiltered(this.offerFilter, this.offerSort, this.offers, this.offerSubcategoryFilter).slice(0, endIndex(this.screenWidth) * this.RowBanner)
    },
    secondaryOffers () {
      if (this.isSearchOffers) {
        return this.searchOffers().slice(startIndex(this.screenWidth) * this.RowBanner, this.searchOffers().length)
      }
      return this.mainOffersFiltered(this.offerFilter, this.offerSort, this.offers, this.offerSubcategoryFilter).slice(startIndex(this.screenWidth) * this.RowBanner, this.searchOffers().length)
    },
    secondaryCondition () {
      return this.searchOffers().length > startIndex(this.screenWidth) * this.RowBanner || this.mainOffersFiltered(this.offerFilter, this.offerSort, this.offers, this.offerSubcategoryFilter).length > startIndex(this.screenWidth) * this.RowBanner || this.searchOffers().length === 0 || this.mainOffersFiltered(this.offerFilter, this.offerSort, this.offers, this.offerSubcategoryFilter).length === 0
    },
    categoryURL () {
      if (this.categoryBannerNameEn) {
        return 'category/' + this.categoryBannerNameEn
      }
      if (this.title) {
        return 'category/' + this.title
      }
      return ''
    },
    alignLeft () {
      if (filterOffers('lto', this.offerSort, this.offers, this.offerSubcategoryFilter).length < 3) {
        return true
      }
      return false
    },
    enableScroll () {
      if (this.typeKey === 'Favourites' || this.typeKey === 'SavedList') {
        return true
      }
      return false
    },
    showArrows () {
      return this.customList.length > 2
    },
    showLeftArrow () {
      return this.scrollPosLeft > 0
    },
    showRightArrow () {
      if (this.scrollContainerWidth === 0) {
        return true
      }
      return this.scrollPosLeft < this.scrollWidth - this.scrollContainerWidth
    }
  },
  methods: {
    validateDeviceWidth,
    ...mapActions('offers', [
      'updateFavourites',
      'loadSavedList'
    ]),
    ...mapActions('modals', [
      'openModal',
      'closeModal'
    ]),
    offersFiltered (offerFilter, offerSort, offers, offerSubcategoryFilter) {
      return filterOffers(offerFilter, offerSort, offers, offerSubcategoryFilter)
    },
    mainOffersFiltered (offerFilter, offerSort, offers, offerSubcategoryFilter) {
      if (this.isLocationFilter) {
        if (this.isLocationOfferLoaded) {
          return filterOffers(offerFilter, offerSort, this.locationOffers, offerSubcategoryFilter)
        }
      } else {
        return filterOffers(offerFilter, offerSort, offers, offerSubcategoryFilter)
      }
    },
    searchOffers () {
      if (this.isLocationFilter) {
        if (this.isLocationOfferLoaded) {
          return this.locationOffers
        }
      } else {
        return this.offers
      }
    },
    updateOfferFilter (filter, locationFilter = false) {
      this.page = 1
      this.$emit('filter', filter)
      if (this.isSearchOffers && !locationFilter) {
        this.$emit('loadOffers', this.page)
      }
    },
    updateLocationFilter (enabled, location, distance) {
      if (enabled) {
        this.page = 1
        this.isLocationFilter = true
        this.filterLoaction = location
        this.filterDistance = distance
        this.$emit('loadLocationOffers', location, distance, this.page)
      } else {
        this.isLocationFilter = false
        this.locationOffers = []
        this.offerFilter = []
      }
    },
    updateOfferSubcategoryFilter (subcategoryFilter) {
      this.$emit('subcategoryFilter', subcategoryFilter)
      this.page = 1
      if (this.isSearchOffers && !this.isLocationFilter) {
        this.$emit('loadOffers', this.page)
      } else if (this.isSearchOffers && this.isLocationFilter) {
        this.$emit('loadLocationOffers', this.filterLoaction, this.filterDistance, this.page)
      }
    },
    updateOfferSort (sort) {
      this.page = 1
      this.$emit('sort', sort)
      if (this.isSearchOffers && !this.isLocationFilter) {
        this.$emit('loadOffers', this.page)
      } else if (this.isSearchOffers && this.isLocationFilter) {
        this.$emit('loadLocationOffers', this.filterLoaction, this.filterDistance, this.page)
      }
    },
    updateMobileFilter (filter) {
      this.$emit('filter', filter)
    },
    updateMobileSubcategoryFilter (subcategoryFilter) {
      this.page = 1
      this.$emit('subcategoryFilter', subcategoryFilter)
      if (this.isSearchOffers && !this.isLocationFilter) {
        this.$emit('loadOffers', this.page)
      } else if (this.isSearchOffers && this.isLocationFilter) {
        this.$emit('loadLocationOffers', this.filterLoaction, this.filterDistance, this.page)
      }
    },
    updateMobileSort (sort, searchLocation = true) {
      this.page = 1
      this.$emit('sort', sort)
      if (this.isSearchOffers && !searchLocation) {
        this.$emit('loadOffers', this.page)
      } else if (this.isSearchOffers && this.isLocationFilter && searchLocation) {
        this.$emit('loadLocationOffers', this.filterLoaction, this.filterDistance, this.page)
      }
    },
    refreshList () {
      this.$emit('updateList')
    },
    showDeleteAlert () {
      this.openModal(MODAL_TYPES.DELETE_LIST_MODAL)
    },
    showEditPopup () {
      this.openModal(MODAL_TYPES.EDIT_LIST_MODAL)
    },
    confirmDeleteList () {
      this.$emit('deleteList')
    },
    viewAllSPCDeals () {
      ACTIONS.CLICKED_VIEW_ALL_SPC_DEALS()
      this.$router.push({
        name: PAGE_NAMES.DEALS
      })
    },
    selectedAlphabet (value) {
      this.selectedLetter = value
    },
    getURL,
    pillText (offer) {
      const instoreText = this.$t('offer.types.instore')
      const onlineText = this.$t('offer.types.online')
      if (offer.in_store && !offer.online) return instoreText
      if (offer.online && !offer.in_store) return onlineText
      return `${instoreText} + ${onlineText}`
    },
    isFavourited (offer) {
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(offer.offer_id)) {
          return true
        }
      })
      return false
    },
    instoreOnly (offer) {
      return offer.in_store && !offer.online
    },
    onlineOnly (offer) {
      return offer.online && !offer.in_store
    },
    both (offer) {
      return offer.online && offer.in_store
    },
    getPartner (offer, field) {
      return this.partnersByID[offer.partner_id][field]
    },
    toggleFavourite (offer) {
      if (!this.registered) {
        this.openModal(MODAL_TYPES.LOGIN_PROMPT)
        return
      }
      const data = {
        offer: offer,
        partner: offer
      }
      if (this.isFavourited(offer)) {
        this.updateFavourites({ removals: [ data ], section: this.section })
      } else {
        this.updateFavourites({ additions: [ data ], section: this.section })
      }
    },
    scrollLeft () {
      const listElem = this.$refs['scroll-container']
      if (listElem) {
        const currentPos = listElem.scrollLeft
        const deltaToNext = currentPos % this.itemWidth
        const nextPos = deltaToNext === 0 ? currentPos - this.itemWidth : currentPos - deltaToNext
        listElem.scrollTo({ left: nextPos, behaviour: 'smooth' })
      }
    },
    scrollRight () {
      const listElem = this.$refs['scroll-container']
      if (listElem) {
        const currentPos = listElem.scrollLeft
        const deltaToNext = currentPos % this.itemWidth
        const nextPos = deltaToNext === 0 ? currentPos + this.itemWidth : currentPos - deltaToNext + this.itemWidth
        listElem.scrollTo({ left: nextPos, behaviour: 'smooth' })
      }
    },
    handleScroll () {
      const scrollElem = this.$refs['scroll-container']
      this.scrollPosLeft = scrollElem.scrollLeft
      this.scrollWidth = scrollElem.scrollWidth
      this.scrollContainerWidth = scrollElem.clientWidth
    },
    showCreateListModal () {
      this.openModal(MODAL_TYPES.SHOW_CREATE_LIST)
    },
    showList (list) {
      this.$router.push({
        name: PAGE_NAMES.LIST,
        params: {
          id: list.id
        },
        query: {
          source: this.section
        }
      })
    },
    onResize () {
      this.screenWidth = window.innerWidth
    },
    updateScroll () {
      if (this.page === 1) {
        this.previousScrollTop = 0
      }
      if (this.previousScrollTop < document.documentElement.scrollTop && this.nextPage && Math.floor((document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100) > 10) {
        this.previousScrollTop = document.documentElement.scrollTop
        this.page = this.page + 1
        if (this.isLocationFilter && this.isLocationOfferLoaded) {
          this.$emit('loadLocationOffers', this.filterLoaction, this.filterDistance, this.page)
        } else {
          this.$emit('loadOffers', this.page, this.offerFilter)
        }
      }
    }
  },
  created () {
    this.loadSavedList(this.loggedIn)
    this.isLocationFilter = false
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.updateScroll)
  },
  destroy () {
    window.removeEventListener('scroll', this.updateScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/DealResults'
</style>

<i18n>
{
  "en": {
    "back": "Back",
    "all_spc_deals": "View All SPC Deals",
    "most_redeemed": "Most Redeemed",
    "all": "All",
    "featured": "Features",
    "saved": "SAVED",
    "collection": "Collection",
    "more_collection": "More collections",
    "shopping_list": "Shopping Lists",
    "new_list": "Create New List",
    "save": "save",
    "items": "items"
  },
  "fr": {
    "back": "Retour",
    "all_spc_deals": "Voir toutes les offres SPC",
    "most_redeemed": "Les plus rachetés",
    "all": "Tous",
    "featured": "En Vedette",
    "saved": "ENREGISTEMENTS",
    "collection": "Collection",
    "more_collection": "Plus de collections",
    "shopping_list": "Liste d'achats",
    "new_list": "Créez une Nouvelle Liste",
    "save": "enregistrer",
    "items": "articles"
  }
}
</i18n>
<i18n src='Assets/i18n/offer'></i18n>



// WEBPACK FOOTER //
// src/components/DealResults.vue
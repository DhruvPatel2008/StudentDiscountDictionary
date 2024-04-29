<template>
<div v-if="offers.length > 0 || contests.length > 0" class="trending-outer-wrap">
    <div class="page-container">
    <div class="trending-box-wrap">
      <h2 v-if="!hideTitle" class="page-title">{{title}} {{ $t('featured') }}</h2>
        <div class="trending-list-wrap">
          <div class="slider-container">
            <div v-if="showArrows" @click="scrollLeft()" class="nav arrow-nav" :class="{ hidden: !showLeftArrow }">
              <img :src="require('@/assets/images/icons/general/icon-solid-angle-left.svg')"/>
            </div>
            <div class="overflow-container fade-container">
                <ul class="list-reset-horizontal padded-list trending-list hide-scrollbar" v-bind:class="alignLeft && rowData.length < 3 ? 'leftAlign' : 'floatNone'" ref="scroll-container" @scroll="handleScroll()">
                <li v-for="offer of rowData" :key="offer.id" @click="handleSelect(offer.id)" class="trending-list-item">
                    <div class="card-img-wrap" v-lazy:background-image="offer['imagePath']" :style="`background-size: cover; background-repeat: no-repeat; background-position: center top;`">
                      <div class="pill-container">
                        <div
                          v-if="offer.isOnline"
                          class="pill online"
                          >
                            {{ $t('offer.types.online') }}
                        </div>
                        <div
                          v-if="offer.isInstore"
                          class="pill instore"
                          >
                            {{ $t('offer.types.instore') }}
                        </div>
                        <img v-if="offer.isSPCPlus" class="spc-pill-image" :src="require('@/assets/images/cibc/pill-spc-copy.png')"/>
                        <div v-if="!(offer.isOnline && offer.isInstore && offer.isSPCPlus) && offer.isLTO && !offer.hideTimer" class="pill red">
                          <img class="clock-image" :src="require(`@/assets/images/icons/general/clock.png`)"/>
                          {{ timeLeft(offer.expiry, offer.lto_end_date) }}
                        </div>
                        <div class="pill-container-2">
                          <div v-if="offer.isNewOffer && showNewofferPartnerPills" class="pill green-pill">{{ $t('offer.types.new_offer') }}</div>
                          <div v-if="offer.isNewPartner && showNewofferPartnerPills" class="pill green-pill">{{ $t('offer.types.new_partner') }}</div>
                          <div v-if="offer.isOnline && offer.isInstore && offer.isSPCPlus && offer.isLTO && !offer.hideTimer" class="pill red">
                            <img class="clock-image" :src="require(`@/assets/images/icons/general/clock.png`)"/>
                            {{ timeLeft(offer.expiry, offer.lto_end_date) }}
                          </div>
                        </div>
                      </div>
                        <span v-if="offer.type === 'offer'" class="book-mark-img" @click.stop="toggleFavourite(offer)">
                          <img v-if="!isFavourited(offer.data.offer.offer_id)" :src="require(`@/assets/images/icons/general/bookmark.png`)" alt="book-mark" class="bookmark-ar" width="32" height="32">
                          <img v-else :src="require(`@/assets/images/icons/general/bookmark-filled.png`)" alt="book-mark" class="bookmark-ar" width="32" height="32">
                        </span>
                    </div>
                    <div class="card-body-warp">
                        <div class="card-logo-wrap">
                        <div class="card-logo-img-wrap">
                            <img :src="offer['partnerImage']" alt="brand-logo">
                        </div>
                        </div>
                        <div class="card-body-right">
                        <div class="card-title">{{offer['title']}}</div>
                        <div class="card-desc" v-html="offer['description']" />
                        </div>
                    </div>
                </li>
                </ul>
            </div>
            <div v-if="showArrows" @click="scrollRight()" class="nav arrow-nav" :class="{ hidden: !showRightArrow }">
              <img :src="require('@/assets/images/icons/general/icon-solid-angle-right.svg')"/>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { safeOpen } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import { getURL } from '@/service/api-config'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { translatePropertyWithDefault } from '@/service/user-service'
import { PAGE_NAMES } from '@/router'
import { offerTimeLeft, determineOfferType } from '@/service/offer-service'
import { ACTIONS } from '@/service/analytics-service'
import store from '@/store'

const TYPES = {
  OFFER: 'offer',
  CONTEST: 'contest'
}

export default {
  props: {
    offers: {
      type: Array,
      required: true
    },
    partners: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: null
    },
    contests: {
      type: Array,
      default: () => ([])
    },
    alignLeft: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    showNewofferPartnerPills: {
      type: Boolean,
      default: true
    },
    isHoliday: {
      type: Boolean,
      default: false
    },
    isLTO: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      MODAL_TYPES,
      itemWidth: 375,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0
    }
  },
  computed: {
    ...mapGetters([
      'registered',
      'language'
    ]),
    ...mapGetters('offers', [
      'favouriteOffers',
      'savedList'
    ]),
    rowData () {
      const preparedContestData = []
      let preparedOfferData = []
      this.offers.forEach(offer => {
        offer.title_fr = (offer.title_fr) ? offer.title_fr : offer.title_en
        if (
          offer['partner_id'] &&
          this.partners[offer['partner_id']] &&
          this.partners[offer['partner_id']]['partner_name']
        ) {
          preparedOfferData.push({
            id: TYPES.OFFER + '_' + offer.offer_id,
            type: TYPES.OFFER,
            title: this.partners[offer['partner_id']]['partner_name'],
            description: translatePropertyWithDefault(offer, 'title'),
            imagePath: getURL(translatePropertyWithDefault(offer, 'image_small')),
            expiry: offer.end_date,
            isSPCPlus: offer.is_spc_plus,
            isOnline: offer.online,
            isInstore: offer.in_store,
            isNewOffer: offer.is_new_offer,
            isNewPartner: offer.is_new_partner,
            isLTO: offer.is_limited_time,
            hideTimer: offer.hide_timer,
            lto_end_date: offer.lto_end_date,
            partnerImage: getURL(offer.has_image ? this.language === 'en' ? offer.optional_image_small_en : offer.optional_image_small_fr : this.partners[offer['partner_id']][this.language === 'en' ? 'logo_web' : 'logo_web_fr']),
            data: {
              offer,
              partner: this.partners[offer['partner_id']]
            },
            orderNumber: offer.order_number ? offer.order_number : null
          })
        }
      })
      if (!this.isBts && !this.isHoliday) {
        let orderedOffer = preparedOfferData.filter(offer => offer.orderNumber)
        let unOrderedOffer = preparedOfferData.filter(offer => offer.orderNumber === null)
        orderedOffer.sort((a, b) => a.orderNumber - b.orderNumber)
        orderedOffer.sort((a, b) => {
          if (a.orderNumber === b.orderNumber) {
            return (a.expiry > b.expiry) ? 1 : (a.expiry < b.expiry) ? -1 : 0
          } else {
            return 1
          }
        })
        unOrderedOffer.sort((a, b) => a.expiry - b.expiry)
        preparedOfferData = [...orderedOffer, ...unOrderedOffer]
      }
      this.contests.forEach(contest => {
        contest.title_fr = (contest.title_fr) ? contest.title_fr : contest.title_en
        contest.description_fr = (contest.description_fr) ? contest.description_fr : contest.description_en
        preparedContestData.push({
          id: TYPES.CONTEST + '_' + contest.id,
          type: TYPES.CONTEST,
          title: translatePropertyWithDefault(contest, 'title'),
          description: translatePropertyWithDefault(contest, 'description'),
          imagePath: getURL(contest['image_large_' + this.language]),
          expiry: contest.end_date,
          isSPCPlus: contest.is_spc_plus,
          isBts: contest.is_bts,
          isLTO: true,
          preview_title: translatePropertyWithDefault(contest, 'preview_title'),
          preview_description: translatePropertyWithDefault(contest, 'preview_description'),
          preview_imagePath: getURL(contest[`preview_image_small_${this.language}`]),
          isStarted: contest.start_date >= Math.round(new Date()),
          partnerImage: getURL(contest['image_small_' + this.language]),
          hideTimer: false,
          data: {
            contest
          },
          orderNumber: contest.order_number ? contest.order_number : null
        })
      })
      if (!this.isBts) {
        preparedContestData.sort((a, b) => {
          if (a.expiry < b.expiry) return -1
          if (a.expiry > b.expiry) return 1
          return 0
        })
      }
      if (this.isLTO) {
        let ltos = [...preparedContestData, ...preparedOfferData]
        let ltoSortedNoOrder = ltos.filter(item => item.orderNumber === null).sort((a, b) => (a.expiry > b.expiry) ? 1 : (a.expiry < b.expiry) ? -1 : 0)
        let ltoSortedOrder = ltos.filter(item => item.orderNumber !== null).sort((a, b) => (a.orderNumber > b.orderNumber) ? 1 : (a.orderNumber < b.orderNumber) ? -1 : 0)
        let ltoSortedSameOrderNumber = ltoSortedOrder.sort((a, b) => {
          if (a.orderNumber === b.orderNumber) {
            return (a.expiry > b.expiry) ? 1 : (a.expiry < b.expiry) ? -1 : 0
          } else {
            return 1
          }
        })
        ltoSortedSameOrderNumber.push(...ltoSortedNoOrder)
        return ltoSortedSameOrderNumber
      }
      return [...preparedContestData, ...preparedOfferData]
    },
    rowDataMap () {
      const map = {}
      this.rowData.forEach(row => {
        map[row.id] = row
      })
      return map
    },
    showArrows () {
      return this.rowData.length > 3
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
    ...mapActions('offers', [
      'updateFavourites',
      'updateSavedList'
    ]),
    ...mapActions('modals', [
      'openModal'
    ]),
    timeLeft (ContestExpiry, offerExpiry) {
      const { years, months, weeks, days, hours } = offerExpiry !== undefined ? offerTimeLeft(offerExpiry, true) : offerTimeLeft(ContestExpiry)
      if (years > 0) return `${years} ${this.$tc('time.years', years)}`
      if (months > 0) return `${months} ${this.$tc('time.months', months)}`
      if (weeks > 0) return `${weeks} ${this.$tc('time.weeks', weeks)}`
      if (days >= 1) return `${days} ${this.$tc('time.days', days)}`
      if (hours >= 1) return `${hours} ${this.$tc('time.hours', hours)}`
      else return `<1 ${this.$tc('time.hours', 0)}`
    },
    scrollLeft () {
      const listElem = this.$refs['scroll-container']
      if (listElem) {
        const currentPos = listElem.scrollLeft
        const nextPos = currentPos - this.itemWidth
        listElem.scrollTo({ left: nextPos, behaviour: 'smooth' })
      }
    },
    scrollRight () {
      const listElem = this.$refs['scroll-container']
      if (listElem) {
        const currentPos = listElem.scrollLeft
        const nextPos = currentPos + this.itemWidth
        listElem.scrollTo({ left: nextPos, behaviour: 'smooth' })
      }
    },
    handleScroll () {
      const scrollElem = this.$refs['scroll-container']
      this.scrollPosLeft = scrollElem.scrollLeft
      this.scrollWidth = scrollElem.scrollWidth
      this.scrollContainerWidth = scrollElem.clientWidth
    },
    getURL,
    navigateTo (url) {
      if (url[0] === '/') {
        this.handleRoute(url)
      }
      if (this.validateURL(url)) {
        this.handleSiteNavigation(url)
      }
    },
    handleRoute (url) {
      this.$router.push(url)
    },
    handleSiteNavigation (link) {
      safeOpen(link)
    },
    handleSelect (id) {
      const item = this.rowDataMap[id]
      if (!item) { return }
      if (item.type === TYPES.OFFER) {
        const offer = item.data.offer
        const offerID = offer.offer_id

        let partnerName = 'partner'
        try {
          partnerName = this.partners[offer.partner_id].url_name
        } catch (error) {}

        if (this.title === 'Weekly') this.source = `${this.title} Features`

        this.$router.push({
          name: PAGE_NAMES.DEAL,
          params: {
            id: offerID,
            partnerName
          },
          query: {
            source: this.source
          }
        })
      } else if (item.type === TYPES.CONTEST) {
        if (item.isBts && item.isStarted) {
          return
        }
        const contest = item.data.contest
        const contestID = contest.id
        this.$router.push({
          name: PAGE_NAMES.CONTEST,
          params: {
            id: contestID
          },
          query: {
            source: this.source
          }
        })
      }
    },
    pillText (offer) {
      const instoreText = this.$t('offer.types.instore')
      const onlineText = this.$t('offer.types.online')
      if (offer.in_store && !offer.online) return instoreText
      if (offer.online && !offer.in_store) return onlineText
      return `${instoreText} + ${onlineText}`
    },
    isFavourited (offerId) {
      var flag = false
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(offerId)) {
          flag = true
        }
      })
      return flag
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
      return this.partners[offer.partner_id][field]
    },
    async toggleFavourite (offer) {
      if (!this.registered) {
        this.openModal(MODAL_TYPES.LOGIN_PROMPT)
        return
      }
      await store.dispatch('updateOfferId', offer.data.offer.offer_id)
      var savedList = this.getSavedListId(offer.data.offer.offer_id)
      if (savedList.id) {
        ACTIONS.FAVOURITE_REMOVED({
          offerID: offer.data.offer.offer_id,
          offerName: offer.data.offer.title_en,
          offerType: determineOfferType(offer.data.offer),
          featured: offer.data.offer.is_limited_time,
          category: offer.data.offer.category,
          partnerName: offer.data.partner.partner_name,
          partnerID: offer.data.partner.partner_id,
          sourceSection: this.section,
          plusOffer: offer.data.offer.is_spc_plus
        })
        var newList = this.savedList.filter(itm => itm.id === savedList.id)[0].offer_ids.filter(id => id !== offer.data.offer.offer_id)
        this.updateSavedList({ offerIds: newList, listId: savedList.id, listName: savedList.name })
        .catch(error => {
          console.error(error)
        })
      } else {
        ACTIONS.FAVOURITE_ADDED({
          offerID: offer.data.offer.offer_id,
          offerName: offer.data.offer.title_en,
          offerType: determineOfferType(offer.data.offer),
          featured: offer.data.offer.is_limited_time,
          category: offer.data.offer.category,
          partnerName: offer.data.partner.partner_name,
          partnerID: offer.data.partner.partner_id,
          sourceSection: this.section,
          plusOffer: offer.data.offer.is_spc_plus
        })
        this.openModal(MODAL_TYPES.SAVED_LIST_MODAL)
      }
    },
    getSavedListId (offerID) {
      var listId = []
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(offerID)) {
          listId = list
        }
      })
      return listId
    },
    partnerName (offer) {
      return this.partners[offer.partner_id]['name']
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/FeatureSection'
</style>

<i18n>
{
  "en": {
    "featured": "Features"
  },
  "fr": {
    "featured": "En Vedette"
  }
}
</i18n>
<i18n src='Assets/i18n/offer'></i18n>
<i18n src="Assets/i18n/time"></i18n>



// WEBPACK FOOTER //
// src/components/Common/FeatureSection.vue
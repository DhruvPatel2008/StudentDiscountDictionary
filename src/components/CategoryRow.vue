<template>
  <div>
    <div class="title-container" v-if="hasHeading || hasViewAll">
      <!-- Show additional block on desktop and tablet for centering -->
      <div v-if="hasHeading && hasViewAll && (!enableMobileAppView || !validateDeviceWidth('Mobile', screenWidth))"></div>
      <h1 v-if="hasHeading" class="category-title">{{ category ? translatePropertyWithDefault(category, 'name') : title }}</h1>
      <a v-if="hasViewAll" @click="$emit('view-all')" class="view-all">{{ $t('view_all') }}</a>
    </div>
    <div v-if="enableMobileAppView && validateDeviceWidth('Mobile', screenWidth)" class="offers-grid">
      <div class="offer-grid-item-container" :class="{'mr-bt': enableMobileAppView}">
        <carousel :per-page="1">
          <slide v-for="(v, index) in offers.length" :key="index" v-if="index % 2 === 0">
            <OfferTile
              v-if="mobileOffers[index]"
              :isSpcPlusUser="isSpcPlusUser"
              style="width: 100%; margin-bottom: 10px;"
              :offer="mobileOffers[index]"
              :partner="partners[mobileOffers[index]['partner_id']]"
              :offerID="mobileOffers[index].offer_id"
              :title="partners[mobileOffers[index]['partner_id']]['partner_name']"
              :description="translatePropertyWithDefault(mobileOffers[index], 'title')"
              :iconPath="mobileOffers[index].has_image ? getURL( language === 'en' ? mobileOffers[index].optional_image_small_en : mobileOffers[index].optional_image_small_fr) : getURL(partners[mobileOffers[index]['partner_id']][language === 'en' ? 'logo_web' : 'logo_web_fr'])"
              :instore="!!mobileOffers[index].in_store"
              :online="!!mobileOffers[index].online"
              :section="sectionName"
              :fromGrid="true"
              :enableMobileAppView="enableMobileAppView"/>
            <OfferTile
              v-if="mobileOffers[index + 1]"
              :isSpcPlusUser="isSpcPlusUser"
              style="width: 100%; margin-bottom: 10px;"
              :offer="mobileOffers[index + 1]"
              :partner="partners[mobileOffers[index + 1]['partner_id']]"
              :offerID="mobileOffers[index + 1].offer_id"
              :title="partners[mobileOffers[index + 1]['partner_id']]['partner_name']"
              :description="translatePropertyWithDefault(mobileOffers[index + 1], 'title')"
              :iconPath="mobileOffers[index + 1].has_image ? getURL(language === 'en' ? mobileOffers[index + 1].optional_image_small_en : mobileOffers[index + 1].optional_image_small_fr) : getURL(partners[mobileOffers[index + 1]['partner_id']][language === 'en' ? 'logo_web' : 'logo_web_fr'])"
              :instore="!!mobileOffers[index + 1].in_store"
              :online="!!mobileOffers[index + 1].online"
              :section="sectionName"
              :fromGrid="true"
              :enableMobileAppView="enableMobileAppView"/>
          </slide>
        </carousel>
      </div>
    </div>
    <div v-else class="slider-container">
      <div v-if="showArrows" @click="scrollLeft()" class="nav arrow-nav" :class="{ hidden: !showLeftArrow }">
        <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowLeft_Black.svg')"/>
      </div>
      <div class="overflow-container fade-container">
        <!-- START MOST REDEEMED OFFER SECTION -->
        <ul v-if="isMostRedeemSection" class="list-reset-horizontal padded-list hide-scrollbar" ref="scroll-container">
          <li
            v-for="offer in offers"
            :key="offer.offer_id"
          >
            <OfferTile
              :offer="offer"
              :isSpcPlusUser="isSpcPlusUser"
              :partner="partners[offer['partner_id']]"
              :offerID="offer.offer_id"
              :title="partners[offer['partner_id']] && partners[offer['partner_id']]['partner_name']"
              :description="translatePropertyWithDefault(offer, 'title')"
              :iconPath="offer.has_image ? getURL(language === 'en' ? offer.optional_image_small_en : offer.optional_image_small_fr) : getURL(partners[offer['partner_id']][language === 'en' ? 'logo_web' : 'logo_web_fr'])"
              :instore="!!offer.in_store"
              :online="!!offer.online"
              :section="sectionName"
              :shrinkOfferTile="shrinkOfferTile"
              />
          </li>
        </ul>
        <!-- START MOST REDEEMED OFFER SECTION -->
        <ul v-else class="list-reset-horizontal padded-list hide-scrollbar" ref="scroll-container">
          <!-- Start show ONLY PINNED offers section -->
          <li
            v-if="offers.filter(a => a.pin_offer).length > 0"
            v-for="offer in offers.filter(a => a.pin_offer).sort((a, b) => b.pin_offer_date - a.pin_offer_date)"
            :key="offer.offer_id"
            >
            <OfferTile
              :offer="offer"
              :isSpcPlusUser="isSpcPlusUser"
              :partner="partners[offer['partner_id']]"
              :offerID="offer.offer_id"
              :title="partners[offer['partner_id']] && partners[offer['partner_id']]['partner_name']"
              :description="translatePropertyWithDefault(offer, 'title')"
              :iconPath="offer.has_image ? getURL(language === 'en' ? offer.optional_image_small_en : offer.optional_image_small_fr) : getURL(partners[offer['partner_id']][language === 'en' ? 'logo_web' : 'logo_web_fr'])"
              :instore="!!offer.in_store"
              :online="!!offer.online"
              :section="sectionName"
              :shrinkOfferTile="shrinkOfferTile"
              />
          </li>
          <!-- End show ONLY PINNED offers section -->
          <!-- Start offers section excluding pinned offers -->
          <li
            v-for="offer in offers.filter(a => !a.pin_offer)"
            :key="offer.offer_id"
            >
            <OfferTile
              :offer="offer"
              :isSpcPlusUser="isSpcPlusUser"
              :partner="partners[offer['partner_id']]"
              :offerID="offer.offer_id"
              :title="partners[offer['partner_id']] && partners[offer['partner_id']]['partner_name']"
              :description="translatePropertyWithDefault(offer, 'title')"
              :iconPath="offer.has_image ? getURL(language === 'en' ? offer.optional_image_small_en : offer.optional_image_small_fr) : getURL(partners[offer['partner_id']][language === 'en' ? 'logo_web' : 'logo_web_fr'])"
              :instore="!!offer.in_store"
              :online="!!offer.online"
              :section="sectionName"
              :shrinkOfferTile="shrinkOfferTile"
              />
          </li>
          <!-- End offers section excluding pinned offers -->
        </ul>
        </div>
      <div v-if="showArrows" @click="scrollRight()" class="nav arrow-nav" :class="{ hidden: !showRightArrow }">
        <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowRight_Black.svg')"/>
      </div>
    </div>
  </div>
</template>

<script>
import OfferTile from '@/components/OfferTile'
import { translatePropertyWithDefault } from '@/service/user-service'
import { getURL } from '@/service/api-config'
import { validateDeviceWidth } from '@/utils'
import { getIsSpcPlusUser } from '@/service/profile-service'
import { mapGetters } from 'vuex'

export default {
  components: {
    OfferTile
  },
  props: {
    category: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    offers: {
      type: Array,
      required: true
    },
    partners: {
      type: Object,
      required: true
    },
    sectionName: {
      type: String,
      default: 'Row'
    },
    hasViewAll: {
      type: Boolean,
      default: true
    },
    hasHeading: {
      type: Boolean,
      default: true
    },
    shrinkOfferTile: {
      type: Boolean,
      default: false
    },
    enableMobileAppView: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSpcPlusUser: false,
      itemWidth: 220 + 20,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0,
      screenWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    showArrows () {
      return this.offers.length > 4
    },
    showLeftArrow () {
      return this.scrollPosLeft > 0
    },
    showRightArrow () {
      if (this.scrollContainerWidth === 0) {
        return true
      }
      return this.scrollPosLeft < this.scrollWidth - this.scrollContainerWidth
    },
    isMostRedeemSection () {
      return this.sectionName === 'Most Redeemed'
    },
    mobileOffers () {
      if (this.isMostRedeemSection) {
        return this.offers
      }
      return this.offers.sort((a, b) => b.pin_offer_date - a.pin_offer_date)
    }
  },
  watch: {
    offers: {
      async handler (value) {
        if (value) {
          await this.$nextTick()
          this.handleScroll()
        }
      }
    }
  },
  methods: {
    translatePropertyWithDefault,
    getURL,
    validateDeviceWidth,
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
      if (scrollElem) {
        this.scrollPosLeft = scrollElem.scrollLeft
        this.scrollWidth = scrollElem.scrollWidth
        this.scrollContainerWidth = scrollElem.clientWidth
      }
    },
    handleResize () {
      this.screenWidth = window.innerWidth
      this.handleScroll()
    }
  },
  async created () {
    this.isSpcPlusUser = await getIsSpcPlusUser()
  },
  mounted () {
    const scrollElem = this.$refs['scroll-container']
    scrollElem.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    const scrollElem = this.$refs['scroll-container']
    scrollElem.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  getRefs (value) {
    let partnerName = value[0]
    return partnerName.toUpperCase()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/CategoryRow'
</style>

<i18n>
{
  "en": {
    "view_all": "See all"
  },
  "fr": {
    "view_all": "Voir plus"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/CategoryRow.vue
<template>
  <div>
    <OfferGrid
      :offers="primaryOffers"
      :partners="partners"
      :source="source"
      :showFavourites="showFavourites"
      :enableMobileAppView="enableMobileAppView"
      :scrollToLetter="scrollToLetter"
      :enableScrollDelete="enableScrollDelete"
      @refreshList="refreshList"
      :showDealsButton="showDealsButton"
      :firstLoading="firstLoading"
      :offerLoaded="offerLoaded"
      :dataLoading="updatedLoading"
      >
      <slot></slot>
    </OfferGrid>
    <!-- Start Category Carousel if Banner Length -->
    <div class="banner-carousel-div">
      <BannerCarousel :bannerAds="carouselBanner" />
    </div>
    <!-- End Category Carousel if Banner Length -->
    <OfferGrid
      v-if="secondaryCondition && secondaryOffers.length > 0"
      :offers="secondaryOffers"
      :partners="partners"
      :source="source"
      :showFavourites="showFavourites"
      :enableMobileAppView="enableMobileAppView"
      :scrollToLetter="scrollToLetter"
      :enableScrollDelete="enableScrollDelete"
      @refreshList="refreshList"
      :showDealsButton="showDealsButton"
      :firstLoading="firstLoading"
      :offerLoaded="offerLoaded"
      :dataLoading="dataLoading"
      >
      <slot></slot>
    </OfferGrid>
  </div>
</template>
<script>
import BannerCarousel from '@/components/Common/BannerCarousel'
import OfferGrid from '@/components/OfferGrid'

export default {
  components: {
    OfferGrid,
    BannerCarousel
  },
  props: {
    carouselBanner: {
      type: Array,
      default: () => ([])
    },
    primaryOffers: {
      type: Array,
      required: true
    },
    secondaryOffers: {
      type: Array,
      required: true
    },
    partners: {
      type: Object,
      required: true
    },
    source: {
      type: String,
      default: null
    },
    showFavourites: {
      type: Boolean,
      default: true
    },
    enableMobileAppView: {
      type: Boolean,
      default: false
    },
    scrollToLetter: {
      type: String
    },
    enableScrollDelete: {
      type: Boolean,
      default: false
    },
    showDealsButton: {
      type: Boolean,
      default: false
    },
    firstLoading: {
      type: Boolean,
      default: false
    },
    offerLoaded: {
      type: Boolean,
      default: true
    },
    dataLoading: {
      type: Boolean,
      default: false
    },
    locationOffers: {
      type: Array,
      default: () => ([])
    },
    isLocationOfferLoaded: {
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
    secondaryCondition: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    refreshList () {
      this.$emit('updateList')
    }
  },
  computed: {
    updatedLoading () {
      if (this.primaryOffers.length <= 0 && this.dataLoading) {
        return true
      } else if (this.primaryOffers.length >= 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/OfferGridSlice'
</style>



// WEBPACK FOOTER //
// src/components/OfferGridSlice.vue
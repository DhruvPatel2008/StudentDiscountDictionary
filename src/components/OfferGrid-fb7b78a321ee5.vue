<template>
  <div>
    <SpinnerLoading v-if="!vaildOffers()" class="loading-margin"/>
    <div v-else>
      <div v-if="offers.length > 0" class="offers-grid" ref="offersDiv">
        <div v-for="offer in offers" :key="offer.offer_id" class="offer-grid-item-container" :class="{'mr-bt': enableMobileAppView}" :ref="getRefs(partners[offer['partner_id']]['partner_name'])">
          <OfferTile
            style="width: 100%;"
            :isSpcPlusUser="isSpcPlusUser"
            :offer="offer"
            :partner="partners[offer['partner_id']]"
            :offerID="offer.offer_id"
            :title="partners[offer['partner_id']]['partner_name']"
            :description="translatePropertyWithDefault(offer, 'title')"
            :iconPath="offer.has_image ? getURL(language === 'en' ? offer.optional_image_small_en : offer.optional_image_small_fr) : getURL(partners[offer['partner_id']][language === 'en' ? 'logo_web' : 'logo_web_fr'])"
            :instore="!!offer.in_store"
            :online="!!offer.online"
            :section="source"
            :showFavourites="showFavourites"
            :fromGrid="true"
            :enableMobileAppView="enableMobileAppView"
            :enableScrollDelete="enableScrollDelete"
            @reloadList="reloadList"
            />
        </div>
      </div>
      <slot v-else>
        <div class="spc-center">
          <h2>{{ $t('search.results.empty.title') }}</h2>
          <p>{{ $t('search.results.empty.description') }}</p>
        </div>
      </slot>
      <SpinnerLoading v-if="dataLoading" class="loading-margin"/>
      <div class="button-container" v-if="showDealsButton">
        <router-link to="/deals" tag="button" class="spc-button-v2 purple">{{ $t('button.action') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import OfferTile from '@/components/OfferTile'
import { translatePropertyWithDefault } from '@/service/user-service'
import { getURL } from '@/service/api-config'
import { nextClosestValue } from '@/utils'
import SpinnerLoading from '@/components/Utility/SpinnerLoading'
import { getIsSpcPlusUser } from '@/service/profile-service'
import { mapGetters } from 'vuex'

export default {
  components: {
    OfferTile,
    SpinnerLoading
  },
  data () {
    return {
      isSpcPlusUser: false
    }
  },
  props: {
    offers: {
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
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ])
  },
  methods: {
    translatePropertyWithDefault,
    getURL,
    nextClosestValue,
    scrollToRef (el) {
      window.scroll({
        top: el[0].offsetTop - 100,
        behavior: 'smooth'
      })
    },
    /**
     * Will get the offer name and add the first letter as refs and convert it to Uppercase.
     * @param {String} value
     * @returns {String}
     */
    getRefs (value) {
      let partnerName = value[0]
      return partnerName.toUpperCase()
    },
    /**
     * Method to update the saved list
     */
    reloadList () {
      this.$emit('refreshList')
    },
    vaildOffers () {
      if (this.firstLoading && this.dataLoading) {
        return false
      } else if (!(this.dataLoading && this.firstLoading) && ((!this.firstLoading) || (typeof this.offers !== 'undefined'))) {
        return true
      }
      return false
    }
  },
  async created () {
    this.isSpcPlusUser = await getIsSpcPlusUser()
  },
  watch: {
    scrollToLetter: {
      handler: function (val, oldVal) {
        let el = this.$refs[val]
        if (el && el.length) { // If the available offer has the clicked alphabet eg: "A" -> "Adidas".
          this.scrollToRef(el)
        } else { // Else choose the next closest alphabet eg "B" -> "Calvin"
          let refs = Object.keys(this.$refs)
          let closestValue = nextClosestValue(refs, val)
          let el = this.$refs[closestValue]
          if (el && el.length) {
            this.scrollToRef(el)
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/OfferGrid'
</style>

<i18n src='Assets/i18n/search'></i18n>
<i18n>
{
  "en": {
    "button": {
      "action": "Browse Discounts"
    }
  },
  "fr": {
    "button": {
      "action": "Voir les remises"
    }
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/OfferGrid.vue
<template>
  <div :class="{'restrict-banner-width': restrictBannerWidth}">
    <a v-if="isBannerAvailable && showBackOption" class="back-nav" @click="$router.go(-1)">
        <img class="icon" :src="require('@/assets/images/icons/general/arrow-icon-white.svg')" :alt="$t('back')">
        <span class="back-nav-text">{{ $t('back') }}</span>
    </a>
    <a v-else-if="showBackOption" class="back-nav common-nav" @click="$router.go(-1)">
        <img class="icon" :src="require('@/assets/images/icons/general/arrow-icon-black.svg')" :alt="$t('back')">
        <span class="back-nav-text black-text">{{ $t('back') }}</span>
    </a>
    <div v-if="isBannerAvailable" :class="{'clickable-pointer': is_clickable}">
      <img
        class="show-desktop banner"
        @click="clickedImage()"
        :src="getURL(banner['image_'+language])"
        :alt="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
      />
      <img
        class="show-tablet banner"
        @click="clickedImage()"
        :src="getURL(banner['image_tablet_'+language])"
        :alt="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
      />
      <img
        class="show-mobile banner"
        @click="clickedImage()"
        :src="getURL(banner['image_mobile_'+language])"
        :alt="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
      />
    </div>
  </div>
</template>
<script>
import { getURL } from '@/service/api-config'
import { mapGetters } from 'vuex'
import { getBanners } from '@/service/banner-service'
import { siteNavigation, bannerNames } from '@/utils'
import { ACTIONS } from '@/service/analytics-service'

export default {
  props: {
    name: {
      type: String,
      default: 'why_spc'
    },
    clickable: {
      type: Boolean,
      default: false
    },
    setBannerDetails: {
      type: Object,
      default: null
    },
    showBackOption: {
      type: Boolean,
      default: false
    },
    loginBanner: {
      type: Boolean,
      default: false
    },
    restrictBannerWidth: {
      type: Boolean,
      default: false
    },
    railBannerName: {
      type: String,
      default: 'Rail Banner'
    }
  },
  data () {
    return {
      banner: {}
    }
  },
  computed: {
    is_clickable () {
      if (this.banner.is_clickable || this.clickable) {
        return true
      }
      return false
    },
    ...mapGetters([
      'language'
    ]),
    /**
     * Returns boolean by checking length of banner list.
     *
     * @param null
     * @return {Boolean} check length of banner list.
     */
    isBannerAvailable () {
      // comparing length with 0 because v-if only accept boolean.
      return this.banner && Object.keys(this.banner).length > 0
    }
  },
  methods: {
    getURL,
    clickedImage () {
      if (this.is_clickable) {
        this.triggerTrackerEvent()
        siteNavigation(this.banner[['url_' + this.language]])
      }
    },
    /**
     * Trigger Tracker Events
     * Based on
     * Type of Banner clicked
     */
    triggerTrackerEvent () {
      if (this.name === 'collection') {
        ACTIONS.CLICKED_BANNER(this.railBannerName + ' Collection')
        return
      }
      if (this.name.includes('category')) {
        ACTIONS.CLICKED_BANNER(bannerNames['category'] + ' - ' + this.name.split('/')[1])
        return
      }
      ACTIONS.CLICKED_BANNER(bannerNames[this.name])
    },
    bannerDetail () {
      if (this.isBannerAvailable) {
        this.$emit('sendBannerDetail', this.banner)
      }
    }
  },
  async created () {
    if (this.setBannerDetails) {
      this.banner = this.setBannerDetails
    } else {
      try {
        if (this.name) {
          this.banner = await getBanners(this.name)
          .catch(error => {
            this.error = error
            console.error(error)
          })
        }
        this.bannerDetail()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/Banner'
</style>

<i18n>
{
  "en": {
    "back": "Back"
  },
  "fr": {
    "back": "Retour"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Common/Banner.vue
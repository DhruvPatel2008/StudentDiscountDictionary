<template>
  <carousel
    :autoplay="true"
    :paginationSize="12"
    paginationActiveColor="#FFFFFF"
    paginationColor="#FFFFFF"
    paginationPosition="bottom-overlay"
    :speed="1000"
    :autoplayTimeout="7000"
    :loop="true"
    :per-page="1"
    :navigation-enabled="isDesktopWeb && enableNavigation"
    :adjustableHeight="true"
    >
      <slide
        v-for="(banner, index) in bannerAds"
        :key="index">
        <img
          @click="handleSlideClick(banner['url_'+language], banner, index)"
          v-if="validateDeviceWidth('Desktop', screenWidth)"
          class="image_regular"
          :class="{'no-pointer': !banner.is_clickable}"
          :src="getURL(banner['image_'+language])"
          :alt="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
          :title="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
          />
        <img
          @click="handleSlideClick(banner['url_'+language], banner, index)"
          v-if="validateDeviceWidth('Tablet', screenWidth)"
          class="image_tablet"
          :src="getURL(banner['image_tablet_'+language])"
          :alt="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
          :title="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
          />
        <img
          :id="generateId(index)"
          v-if="validateDeviceWidth('Mobile', screenWidth)"
          class="image_mobile"
          :src="getURL(banner['image_mobile_'+language])"
          :alt="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
          :title="(banner['alt_'+language]) ? banner['alt_'+language] : banner['text_'+language]"
          />
      </slide>
    </carousel>
</template>

<script>
import { mapGetters } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import { getURL } from '@/service/api-config'
import { safeOpen, validateDeviceWidth, screenDetails } from '@/utils'
import { ACTIONS } from '@/service/analytics-service'

export default {
  props: {
    bannerAds: {
      type: Array,
      required: true
    },
    isSpcPlus: {
      type: Boolean,
      default: false
    },
    enableNavigation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      protocols: ['http', 'https'],
      screenWidth: window.innerWidth,
      screenDetails,
      touchstartX: 0,
      touchstartY: 0
    }
  },
  components: {
    Carousel,
    Slide
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    isDesktopWeb () {
      return validateDeviceWidth('Desktop', this.screenWidth)
    }
  },
  methods: {
    getURL,
    validateDeviceWidth,
    handleSlideClick (url, banner, index) {
      if (!banner.is_clickable) {
        // stop handle route change and action click events
        return
      }
      const carouselName = this.language === 'fr' ? banner.text_fr : banner.text_en
      ACTIONS.CLICKED_CAROUSEL(carouselName, index, this.isSpcPlus, this.language)
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
    /**
     * Returns boolean by checking the url is valid .
     *
     * @param url
     * @return {Boolean} check wether the link have the protocols.
     */
    validateURL (url) {
      return this.protocols.includes(url.split(':')[0])
    },
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    /**
     * It prevents the click event triggering while user swipe in mobile device.
     * @param {Object} banner
     * @param {Number} index
     */
    handleGesture (banner, index) {
      if (this.touchendY === this.touchstartY) {
        this.handleSlideClick(banner['url_' + this.language], banner, index)
      }
    },
    /**
     * Generate the Id with the given value.
     * @param {Number} index
     */
    generateId (index) {
      return 'touchableElement' + index
    },
    /**
     * Set touch event for the given Id.
     * @param {Object} banner
     * @param {Number} index
     */
    setTouchEvent (banner, index) {
      let el = document.getElementById(this.generateId(index))
      if (el) {
        el.addEventListener('touchstart', (event) => {
          this.touchstartX = event.changedTouches[0].screenX
          this.touchstartY = event.changedTouches[0].screenY
        }, {passive: true})
        el.addEventListener('touchend', (event) => {
          this.touchendX = event.changedTouches[0].screenX
          this.touchendY = event.changedTouches[0].screenY
          this.handleGesture(banner, index)
        }, {passive: true})
      }
    }
  },
  mounted () {
    this.bannerAds.forEach((banner, index) => {
      this.setTouchEvent(banner, index)
    })
  },
  created () {
    window.addEventListener('resize', this.updateScreenWidth)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/BannerCarousel'
</style>



// WEBPACK FOOTER //
// src/components/Common/BannerCarousel.vue
<template>
    <!--Brand logo Section-->
    <div class="marquee-wrapper" v-bind:style="marquee">
      <div>
        <div class="marquee-block" v-bind:style="marquee" :class="{'hudsons-bay-custom': fromHudsonsBay}">
          <div class="marquee-inner to-left">
            <span>
              <div v-for="logo of logoList" :key="logo.name" @click="handlePartnerLogoClick(logo.name, logo.url)" class="marquee-item" v-bind:class="{ 'default-pointer': !isLogoClickable }">
                <img :class="{'hudsons-bay-custom': fromHudsonsBay}" :src="require(`@/assets/images/brand-logo/${logo.name}.png`)" alt=""/>
              </div>
            </span>
            <span>
              <div v-for="logo of logoList" :key="logo.name"  @click="handlePartnerLogoClick(logo.name, logo.url)" class="marquee-item" v-bind:class="{ 'default-pointer': !isLogoClickable }">
                <img :class="{'hudsons-bay-custom': fromHudsonsBay}" :src="require(`@/assets/images/brand-logo/${logo.name}.png`)" alt=""/>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ACTIONS } from '@/service/analytics-service'
import { safeOpen } from '@/utils'
export default {
  props: {
    logoList: {
      type: Array,
      required: true
    },
    isLogoClickable: {
      type: Boolean,
      required: false,
      default: true
    },
    fromHudsonsBay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      protocols: ['http', 'https']
    }
  },
  methods: {
    navigateTo (url) {
      if (url[0] === '/') {
        this.handleRoute(url)
      }
      if (this.validateURL(url)) {
        this.handleSiteNavigation(url)
      }
    },
    validateURL (url) {
      return this.protocols.includes(url.split(':')[0])
    },
    handleRoute (url) {
      this.$router.push(url)
    },
    handleSiteNavigation (link) {
      safeOpen(link)
    },
    handlePartnerLogoClick (title, url) {
      if (!this.isLogoClickable) {
        return
      }
      ACTIONS.CLICKED_PARTNER_LOGO(title)
      this.navigateTo(url)
    }
  },
  computed: {
    marquee () {
      return {
        '--logo-px': this.logoList.length + 1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/RotatingLogoCarousel'
</style>



// WEBPACK FOOTER //
// src/components/Common/RotatingLogoCarousel.vue
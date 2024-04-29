<template>
  <div v-if="!loading && showBanner && !closeModal" class="banner-container" v-bind:class="hasNotifications">
    <div class="close-btn" @click="closeBanner">
      <img :src="require('@/assets/images/icons/general/close-icon-white.svg')" alt="Close icon">
    </div>
    <div class="banner-text">{{ $t('banner_text') }}</div>
    <button @click="openApp" class="spc-button-v2 purple">{{ $t('btn_text') }}</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ACTIONS } from '@/service/analytics-service'
import { getMobileOperatingSystem } from '@/utils'

export default {
  data () {
    return {
      closeModal: false
    }
  },
  computed: {
    ...mapGetters(['loading', 'language']),
    ...mapGetters('notifications', [
      'notifications'
    ]),
    hasNotifications () {
      return this.notifications.length > 0 ? 'with-notification-' + this.language + '-' + this.notifications.length : ''
    },
    showBanner () {
      const avoidedPages = [
        null,
        'Deal',
        'Collection',
        'Contest'
      ]
      return getMobileOperatingSystem() && !avoidedPages.includes(this.$route.name)
    }
  },
  methods: {
    closeBanner () {
      this.closeModal = true
    },
    async openApp () {
      // Firebase dynamic link
      await ACTIONS.CLICKED_APP_OPEN_BANNER()
      window.location = 'https://spcapp.page.link/openapp'
      this.closeModal = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/OpenAppBanner'
</style>

<i18n src="LocalizedAssets/i18n/apps"></i18n>
<i18n>
{
  "en": {
    "banner_text": "Enjoy a better\n experience in app",
    "btn_text": "Open App"
  },
  "fr": {
    "banner_text": "Profitez d'une meilleure\n expérience dans l'app",
    "btn_text": "Ouvrir l'app"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/OpenAppBanner.vue
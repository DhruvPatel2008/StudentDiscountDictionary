<template>
  <div class="badge-container">
    <div class="appstore" :class="{'reduce-width': reduceWidth}">
      <a target="_blank" rel="noopener noreferrer" :href="$t('app_store.link')" @click="handleAnalytics('appstore')">
        <img :src="require(`Assets/images/badges/appstore/${$t('app_store.image_src')}`)" :alt="$t('app_store.image_alt')" width="135" height="40">
      </a>
    </div>
    <div class="playstore" :class="{'reduce-width': reduceWidth}">
      <a target="_blank" rel="noopener noreferrer" :href="$t('play_store.link')" @click="handleAnalytics('playstore')">
        <img :alt="$t('play_store.image_alt')" width="135" height="40" :src="require(`Assets/images/badges/playstore/${$t('play_store.image_src')}`)"/>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ACTIONS } from '@/service/analytics-service'

export default {
  props: {
    context: {
      type: String,
      default: null
    },
    reduceWidth: {
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
    handleAnalytics (badgeType) {
      if (badgeType === 'appstore') ACTIONS.DOWNLOAD_APP_STORE_CLICKED()
      if (badgeType === 'playstore') ACTIONS.DOWNLOAD_PLAY_STORE_CLICKED()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Badges'
</style>

<i18n src="LocalizedAssets/i18n/apps"></i18n>



// WEBPACK FOOTER //
// src/components/Badges.vue
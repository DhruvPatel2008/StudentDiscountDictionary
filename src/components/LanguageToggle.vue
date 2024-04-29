<template>
  <a class="flipper no-focus focus-underline spc-pointable" @click="changeLanguage" @keyup.enter="changeLanguage" tabindex="0">
    <span v-if="positionFront">{{ title }}</span>
    <img
      class="flipper-item"
      :src="require('LocalizedAssets/images/icons/flag.svg')"
      :alt="language"
      width="20px"
      />
    <span v-if="!positionFront">{{ title }}</span>
  </a>
</template>

<script>
import { mapGetters } from 'vuex'
import { toggleLanguage } from '@/service/user-service'

export default {
  props: {
    lengthFull: {
      type: Boolean,
      default: false
    },
    positionFront: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'language',
      'country'
    ]),
    title () {
      return this.lengthFull ? this.$t('title_medium') : this.$t('title_short')
    }
  },
  methods: {
    toggleLanguage,
    changeLanguage (event) {
      if (this.country === 'us') { return }
      this.toggleLanguage()
      if (event.target.classList.contains('flip')) {
        event.target.classList.remove('flip')
      }
      window.setTimeout(() => {
        event.target.classList.add('flip')
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            if (event.target.classList.contains('flip')) {
              event.target.classList.remove('flip')
            }
          }, 500)
        })
      }, 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/LanguageToggle'
</style>

<i18n src="LocalizedAssets/i18n/language"></i18n>



// WEBPACK FOOTER //
// src/components/LanguageToggle.vue
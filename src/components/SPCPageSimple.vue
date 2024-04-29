<template>
  <div class="container" :class="{'mobile': mobileView}">
    <div class="simple-header" :class="{'header-margin': headerMargin}">
      <img :src="require('@/assets/images/logos/SPC_LOGO_BLACK.svg')" alt="SPC Logo" />
      <div class="header-font header-lang">
        <p @click="changeLanguage(english)" :class="{'header-font-normal': language !== english}">EN</p>
        <p>|</p>
        <p @click="changeLanguage(french)" :class="{'header-font-normal': language !== french}">FR</p>
      </div>
    </div>

    <div class="slot-container" :class="{'mobile': mobileView}"><slot></slot></div>

    <div class="footer">
      <div class="copyright">{{ $t('copyright') }}</div>
      <div class="footer-links">
        <a href="/terms-of-use">{{ $t('links.tos') }}</a>
        <a href="/privacy-policy">{{ $t('links.privacy') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    mobileView: {
      type: Boolean,
      default: true
    },
    headerMargin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'language',
      'french',
      'english',
      'loggedIn',
      'registered'
    ])
  },
  methods: {
    ...mapActions([
      'updateLanguage',
      'updateProfileLanguage'
    ]),
    changeLanguage (lang) {
      this.updateLanguage(lang)
      if (this.loggedIn && this.registered) {
        this.updateProfileLanguage(lang)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/SPCPageSimple'
</style>

<i18n src="LocalizedAssets/i18n/footer"></i18n>


// WEBPACK FOOTER //
// src/components/SPCPageSimple.vue
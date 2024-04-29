// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'
import VueClipboard from 'vue-clipboard2'
import VueCookie from 'vue-cookie'
import Meta from 'vue-meta'
import linkify from 'vue-linkify'
import VueGtm from 'vue-gtm'
import VueMask from 'v-mask'
import VueLazyload from 'vue-lazyload'

import * as firebase from '@/vendor/firebase/firebase-init'

import '@/import'

import { defaultLanguage } from '@/models'

import { initMixpanel, initLeanplum, ACTIONS } from '@/service/analytics-service'

import {
  syncLanguage,
  syncLocation,
  syncPostal,
  syncPreferences
} from '@/service/sync'

import '@/vendor/bugsnag'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueCarousel from 'vue-carousel'
import interceptor from './interceptor'

Vue.directive('linkified', linkify)
Vue.prototype.$window = window

const isProd = process.env.NODE_ENV === 'production'

const GTM_ID = process.env.GTM_ID

const GTM_PIXEL_ID = process.env.GTM_GOOGLE_PIXEL_ID

Vue.use(VueGtm, {
  id: [GTM_ID, GTM_PIXEL_ID],
  enabled: true,
  debug: !isProd,
  vueRouter: router
})
Vue.use(VueMask)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN
initMixpanel(MIXPANEL_TOKEN, !isProd)

initLeanplum()

ACTIONS.APP_OPEN()

firebase.init()

Vue.config.productionTip = false
Vue.config.devtools = !isProd
Vue.config.performance = !isProd

sync(store, router)
Vue.use(VueI18n)
Vue.use(VueClipboard)
Vue.use(VueCookie)
Vue.use(Meta)
Vue.use(VueCarousel)

const i18n = new VueI18n({
  locale: store.getters.language,
  fallbackLocale: defaultLanguage,
  silentFallbackWarn: isProd,
  messages: {
    en: {},
    fr: {}
  }
})

/*
 * Get cookies to setup initial state
 */
;(async () => {
  try {
    await Promise.all([
      syncLanguage(i18n),
      syncLocation(),
      syncPostal(),
      syncPreferences()
    ])
  } catch (error) {
    console.error(error)
  } finally {
    init()
  }
})()
/* Initialize interceptors */
interceptor()

function init () {
  /* eslint-disable no-new */
  new Vue({
    created () {
      AOS.init()
    },
    el: '#app',
    store,
    router,
    i18n,
    template: '<App/>',
    components: { App }
  })
}
new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this
  }
})



// WEBPACK FOOTER //
// ./src/main.js
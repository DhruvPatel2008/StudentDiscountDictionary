<template>
  <header class="header-outer">
    <div class="header-inner" :class="{'all-deals-header': this.$route.name === pageNames.DEALS, 'french': language === french}">
      <div class="header-left">
        <div class="logo-lang-wrapper">
          <img
            v-if="showLogo && showSPCPlusLogo"
            class="header-logo spc-plus-logo cursor-pointer"
            @click="redirectHome"
            tag="img"
            :src="require('@/assets/images/logos/cibc.png')"
            alt="SPC"
            tabindex="0"
          />
          <router-link
            v-else-if="showLogo"
            class="header-logo cursor-pointer"
            :to="'/'"
            tag="img"
            :src="require('@/assets/images/logos/SPC_LOGO_BLACK.svg')"
            alt="SPC"
            tabindex="0"
          >
          </router-link>
          <div v-if="validateDeviceWidth('Desktop', screenWidth)" class="header-font header-lang">
            <p @click="changeLanguage(english)" :class="{'header-font-normal': language !== english}">EN</p>
            <p>|</p>
            <p @click="changeLanguage(french)" :class="{'header-font-normal': language !== french}">FR</p>
          </div>
        </div>
      </div>
      <nav class='header-right'>
        <div class="search-section">
          <Search class="search" @search="handleSearch" />
        </div>
        <div class="membership-section mob-show" v-if="loggedInStatus && validMemberWithCard && validateDeviceWidth('Mobile', screenWidth)" @click="membership">
          <img class="membership-logo" id="membership" :src="require('@/assets/images/membership.png')"/>
          <label for="membership" class="membership-label">{{ $t('membership') }}</label>
        </div>
        <ul class="link-list link-list-header list-reset-horizontal">
          <li v-for="menu in menuHeader['header_static']['left']" :key="menu.en">
            <a v-if="menu.force_link" :href="menu['link']" @click="handleCTA(menu[language])">{{ menu[language] }}</a>
            <router-link v-else active-class="active-cibc-url" @click.native="handleConstantCTA(menu['route'])" style="text-transform: none;" :to="menu['route']">{{ menu[language] }}</router-link>
          </li>
          <li><span class="divider"></span></li>
          <li v-if="loggedInStatus && !hasValidCard"><router-link @click.native="handleCTA($t('activate_cta_text'))" :to="{ path: linkData['activate'] }">{{ $t('activate') }}</router-link></li>
          <li v-if="!loggedInStatus"><router-link active-class="active-router" @click.native="handleCTA($t('menu.login'))" :to="linkData['login']">{{ $t('menu.login') }}</router-link></li>
          <li v-else-if="!registered"><router-link @click.native="handleCTA($t('menu.logout'))" :to="linkData['logout']">{{ $t('menu.logout') }}</router-link></li>
          <li v-else class="dropdown-container" :id="menuInputID">
            <a @click="toggleMenu" :class="{'active-router': isRouteInDropdown($route.name)}">
              {{ firstName || this.$t('greeting_anonymous') }}
              <img class="icon-left" :src="require('@/assets/images/icons/general/dropdown-arrow-default.svg')"/>
            </a>
            <ul class="list-reset dropdown" v-show="menuVisible" :id="menuID" @click="handleModalMenuClick">
              <li v-if="registered"><router-link active-class="active-router" @click.native="handleCTA($t('menu.favourites'))" :to="linkData['favourites']">{{ $t('menu.saved') }}</router-link></li>
              <li v-if="registered"><router-link @click.native="handleCTA($t('menu.profile'))" :to="linkData['profile']">{{ $t('menu.profile') }}</router-link></li>
              <li v-if="registered && !isFreeTrial && hasValidCard && spcCards && spcCards.length > 0">
                <router-link @click.native="handleCTA($t('menu.billing'))" :to="linkData['billing']">{{ $t('menu.billing') }}</router-link>
              </li>
              <li><router-link @click.native="handleCTA($t('menu.logout'))" :to="linkData['logout']">{{ $t('menu.logout') }}</router-link></li>
            </ul>
          </li>
          <li v-if="!loggedInStatus"><router-link @click.native="handleCTA($t('activate_cta_text'))" :to="{ path: linkData['activate'] }">{{ $t('activate') }}</router-link></li>
          <li v-if="!loggedInStatus || !hasValidCard" class="join-spc">
            <router-link class="spc-button-v2 purple mr-join-now hover-item" @click.native="handleCTA($t('actions.join_now'))" :to="linkData['purchase']" tag="button">
              {{ $t('actions.join_now') }}
            </router-link>
          </li>
        </ul>
        <a class="spc-clickable menu-icon" @click="openModalMenu">
          <img :src="require('@/assets/images/icons/general/list-icon-inactive.svg')"/>
        </a>
      </nav>
      <Modal
        :show="modalMenuVisible"
        @close="modalMenuVisible = false"
        :fullscreenSettings="true"
        @click="handleModalMenuClick"
        :contained="true"
        >

        <div class="modal-menu-container">
          <div class="header-font header-lang">
            <p @click="changeLanguage(english)" :class="{'header-font-normal': language !== english}">EN</p>
            <p>|</p>
            <p @click="changeLanguage(french)" :class="{'header-font-normal': language !== french}">FR</p>
          </div>
          <ul class="link-list vertical link-list-header list-reset" @click="handleMenuLinkClick">
            <li v-for="menu in menuHeader['header_static']['left']" :key="menu.en">
              <a v-if="menu.route.includes('/blog')" :href="menu['route']" @click="handleCTA(menu[language])">{{ menu[language] }}</a>
              <router-link v-else active-class="active-cibc-url" @click.native="handleConstantCTA(menu['route'])" style="text-transform: none;" :to="menu['route']">{{ menu[language] }}</router-link>
            </li>
            <li v-if="registered"><router-link @click.native="handleCTA($t('menu.favourites'))" :to="linkData['favourites']">{{ $t('menu.saved') }}</router-link></li>
            <li v-if="!registered && !loggedIn"><router-link @click.native="handleCTA($t('menu.login'))" :to="linkData['login']">{{ $t('menu.login') }}</router-link></li>
            <li v-if="registered"><router-link @click.native="handleCTA($t('menu.profile'))" :to="linkData['profile']">{{ $t('menu.profile') }}</router-link></li>
            <li v-if="!loggedIn || !hasValidCard"><router-link @click.native="handleCTA($t('activate_cta_text'))" :to="{ path: linkData['activate'] }">{{ $t('activate') }}</router-link></li>
            <li v-if="registered && !isFreeTrial && hasValidCard && spcCards && spcCards.length > 0">
              <router-link @click.native="handleCTA($t('menu.billing'))" :to="linkData['billing']">{{ $t('menu.billing') }}</router-link>
            </li>
          </ul>
          <div v-if="loggedIn" class="spc-center menu-button-container">
            <router-link @click.native="handleCTA($t('menu.logout'))" tag="button" class="spc-button-v2 secondary width-constrained" :to="linkData['logout']">{{ $t('menu.logout') }}</router-link>
          </div>
          <div class="spc-center menu-button-container">
            <router-link v-if="!hasValidCard" class="spc-button-v2 purple width-constrained" :to="linkData['purchase']" tag="button">
              {{ $t('actions.join_now') }}
            </router-link>
          </div>
        </div>
      </Modal>
    </div>
    <CategoryList v-if="this.$route.name !== pageNames.DEALS" class="category-list"></CategoryList>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { isDescendant, validateDeviceWidth } from '@/utils'
import Modal from '@/components/Modals/Modal'
import LanguageToggle from '@/components/LanguageToggle'
import CategoryList from '@/components/CategoryList'
import linkData from 'Assets/data/footer_links'
import { ACTIONS } from '@/service/analytics-service'
import { PAGE_NAMES } from '@/router'
import Search from '@/components/Search'
import { getActiveHolidayEvent } from '@/service/offer-service'
import { getCards } from '@/service/profile-service'
const DESKTOP_MIN_WIDTH = 960

export default {
  components: {
    Modal,
    LanguageToggle,
    CategoryList,
    Search
  },
  props: {
    menuHeader: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      linkData: {
        register: '/register',
        profile: '/profile',
        billing: '/billing',
        favourites: '/favourites',
        SPCxCIBC: '/cibc',
        login: '/login',
        logout: '/logout',
        purchase: '/purchase',
        activate: '/activate',
        howitworks: '/howitworks'
      },
      footerLinkData: linkData,
      menuVisible: false,
      modalMenuVisible: false,
      menuID: 'menu-input',
      menuInputID: 'menu-input',
      viewportWidth: 0,
      viewportHeight: 0,
      DESKTOP_MIN_WIDTH,
      screenWidth: window.innerWidth,
      pageNames: PAGE_NAMES,
      holidayEvents: [],
      userCardCobrand: null,
      showLogo: false
    }
  },
  computed: {
    loggedInStatus () {
      return this.loggedIn && !this.mockLoginStatus
    },
    ...mapGetters('accountCreation', [
      'mockLoginStatus'
    ]),
    ...mapGetters([
      'loggedIn',
      'registered',
      'firstName',
      'spcCards',
      'isFreeTrial',
      'hasValidCard',
      'hasCard',
      'language',
      'french',
      'english',
      'validMemberWithCard'
    ]),
    holidayEventURL () {
      return '/landingpage/' + this.holidayEvents.name
    },
    showSPCPlusLogo () {
      if (this.userCardCobrand) {
        let nonExpiredCard = this.userCardCobrand.filter(card => !card.is_expired)
        return nonExpiredCard.filter(card => card.cobrand.toLowerCase() === 'cibc').length > 0
      }
      return false
    }
  },
  methods: {
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    validateDeviceWidth,
    ...mapActions([
      'loadCards',
      'getFreeTrialStatus',
      'updateLanguage',
      'updateProfileLanguage',
      'loadUserTheme'
    ]),
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    async membership () {
      await ACTIONS.MOBILE_WEB_VIEW_DIGITAL_MEMBERSHIP()
      this.$router.push({ name: PAGE_NAMES.QR_TEMPORARY_MEMBERSHIP })
    },
    openModalMenu () {
      this.modalMenuVisible = true
      document.body.style.overflow = 'hidden'
    },
    closeMenuOnClickOutside (event) {
      let target = event.target
      let menu = document.getElementById(this.menuID)
      let menuInput = document.getElementById(this.menuInputID)
      if (target !== menuInput && !isDescendant(menu, target)) {
        this.menuVisible = false
      }
      event.stopPropagation()
    },
    handleModalMenuClick (event) {
      let target = event.target
      if (['BUTTON', 'INPUT', 'A'].includes(target.type.nodeName)) {
        this.modalMenuVisible = false
      }
    },
    getViewportWidth () {
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    },
    getViewportHeight () {
      return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    },
    handleMenuLinkClick (event) {
      let target = event.target
      if (['LI', 'A'].includes(target.nodeName)) {
        this.modalMenuVisible = false
      }
    },
    resizeHandler () {
      this.viewportWidth = this.getViewportWidth()
      this.viewportHeight = this.getViewportHeight()
    },
    /**
     * Match Constant CTA by route given
     * @param {string} route
     */
    handleConstantCTA (route) {
      if (route === '/cibc') {
        this.handleCTA('SPCxCIBC')
      } else if (route === '/howitworks') {
        this.handleCTA('HOW IT WORKS')
      } else if (route.toLowerCase().includes('/deals/fido/offer/')) {
        this.handleCTA('FIDO EXCLUSIVE OFFER')
      } else {
        this.handleCTA('HOLIDAY EVENT')
      }
    },
    handleCTA (text) {
      ACTIONS.CLICKED_CTA(text, 'Menu')
    },
    /**
     * To Check the current route is present inside the dropdown route lists.
     *
     * @param {String} route Returns the current route name
     * @returns {Boolean} Return true or false based on the given condition.
     */
    isRouteInDropdown (route) {
      return [PAGE_NAMES.PROFILE, PAGE_NAMES.FAVOURITES, PAGE_NAMES.Billing].includes(route)
    },
    changeLanguage (language) {
      this.updateLanguage(language)
      if (this.loggedIn && this.registered) {
        this.updateProfileLanguage(language)
      }
    },
    handleSearch ({ query, tags }) {
      ACTIONS.SEARCH_PERFORMED(query)
      this.$router.push({
        name: PAGE_NAMES.SEARCH,
        params: {
          query
        },
        query: {
          tags
        }
      })
    },
    async loadHolidayEvents () {
      try {
        const events = await getActiveHolidayEvent()
        this.holidayEvents = events.data[0]
      } catch (error) {
        console.error(error)
      }
    },
    redirectHome () {
      this.$router.push({
        name: PAGE_NAMES.HOME,
        params: {
          redirectHome: true
        }})
    }
  },
  async created () {
    this.loadHolidayEvents()
    this.loadUserTheme()
    window.addEventListener('resize', this.updateScreenWidth)
    this.userCardCobrand = await getCards()
    this.showLogo = true
  },
  async mounted () {
    document.addEventListener('click', this.closeMenuOnClickOutside)
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
    await this.loadCards()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeMenuOnClickOutside)
    window.removeEventListener('resize', this.resizeHandler)
  },
  activated () {
    this.modalMenuVisible = false
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus">
@import '~@/assets/components/SPCHeader'
</style>

<i18n src="LocalizedAssets/i18n/header"></i18n>
<i18n src="LocalizedAssets/i18n/footer"></i18n>
<i18n src='Assets/i18n/actions'></i18n>

<i18n>
{
  "en": {
    "activate": "ACTIVATE",
    "activate_cta_text": "Menu Activate",
    "membership": "Card"
  },
  "fr": {
    "activate": "ACTIVEZ",
    "activate_cta_text": "Menu Activer",
    "membership": "Carte"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/SPCHeader.vue
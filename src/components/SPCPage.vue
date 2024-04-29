<template>
  <div class="page">
    <SPCHeader
      class="navbar"
      v-if="showHeader && menu.header"
      :includeFooterLinks="!showFooter"
      :menuHeader="menu.header"/>

    <div class="content-adjust" :class="{'all-deals-page': this.$route.name === pageNames.DEALS}">
      <TopBanner></TopBanner>

      <div v-if="title != null" class="title-header spc-center">
        <div class="spc-content-inner content-padded">
          <h1>{{ title }}</h1>
          <slot name="pill" class="pill"></slot>
        </div>
      </div>

      <div class="page-content">
        <div class="content" :style="`display: ${displayOverride};`">
          <slot></slot>
        </div>
        <SPCFooter v-if="showFooter && menu.footer" :menuFooter="menu.footer"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SPCHeader from '@/components/SPCHeader'
import SPCFooter from '@/components/SPCFooter'
import TopBanner from '@/components/Common/TopBanner'
import { PAGE_NAMES } from '@/router'
import { getMenu } from '@/service/menu-service'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { gettopBannerStatus } from '@/service/payment-service'
import { getMembershipExpiringModalShown, setMembershipExpiringModalShown } from '@/service/cookie-service'
import { ACTIONS } from '@/service/analytics-service'
import { setActivationFlowIncomplete, getActivationFlowIncomplete } from '@/service/storage'

export default {
  components: {
    SPCHeader,
    SPCFooter,
    TopBanner
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    displayOverride: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      pageNames: PAGE_NAMES,
      menu: {}
    }
  },
  methods: {
    ...mapActions('modals', [
      'openModal'
    ]),
    ...mapActions('payment', [
      'updateShowMembershipExpiringModal'
    ]),
    /**
     * Load Menu Response calling API (menu-service)
     */
    async loadMenu () {
      try {
        let res = await getMenu()
        this.menu = res
      } catch (err) {
        console.error('Website Menu not loaded', err)
      }
    },
    async showExpiringModal () {
      if (this.showMembershipExpiringModal === false) return

      if (!this.validMember) return false

      // Check if modal has been shown today
      const modalShown = getMembershipExpiringModalShown()
      if (modalShown) return

      let response = null
      try {
        const beforeUserEmail = this.profile.email_lower
        response = await gettopBannerStatus()
        // stop showing modal if user already logged out
        if (!this.loggedIn) return
        // check if email is same to make sure its same user
        const afterUserEmail = this.profile.email_lower
        if (beforeUserEmail !== afterUserEmail) return
      } catch (error) {}

      const result = response && response.status === 200 && response.data.success === true

      // Do not show modal if it's not about subscription and days before subscription expiration are not 2 or 14
      if (!result || (response.data.type !== 'subscription' && Number(response.data.days) !== 2 && Number(response.data.days) !== 14)) {
        this.updateShowMembershipExpiringModal({value: false, type: null})
        return
      }

      // Set membershipExpiringType
      let membershipExpiringType = response.data.type

      this.updateShowMembershipExpiringModal({value: true, type: membershipExpiringType})

      // call analytic services
      if (membershipExpiringType === 'subscription') {
        ACTIONS.VIEW_MEMBERSHIP_EXPIRED_MODAL()
      } else if (membershipExpiringType === 'payment') {
        ACTIONS.VIEW_PAYMENT_METHOD_EXPIRED_MODAL()
      } else if (membershipExpiringType === 'auto-renew') {
        ACTIONS.VIEW_MEMBERSHIP_EXPIRING_MODAL()
      }

      // Set for 1 year if it's a subscription expired modal
      if (response.data.type === 'subscription') {
        setMembershipExpiringModalShown()
      } else {
        setMembershipExpiringModalShown(true)
      }

      // Show modal
      this.openModal(MODAL_TYPES.MEMBERSHIP_EXPIRING)
    },
    checkActivationIncomplete () {
      if (!this.$route.path.includes('/activate') && getActivationFlowIncomplete() === true) {
        ACTIONS.ACTIVATION_INCOMPLETE()
        setActivationFlowIncomplete(false)
      }
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'profile',
      'validMember'
    ]),
    ...mapGetters('payment', [
      'showMembershipExpiringModal'
    ])
  },
  created () {
    this.checkActivationIncomplete()
    this.loadMenu()
    this.showExpiringModal()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/SPCPage'
</style>



// WEBPACK FOOTER //
// src/components/SPCPage.vue
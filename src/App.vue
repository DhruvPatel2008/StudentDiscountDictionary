<template>
  <div id="app">
    <router-view :key="$route.path" />
    <NotificationManager/>
    <LoginModal
      :show="showModal(MODAL_TYPES.LOGIN_PROMPT)"
      @close="closeModal(MODAL_TYPES.LOGIN_PROMPT)"
      :isFreeTrial="isFreeTrial"
      />
    <RegisterSuccessModal
      :show="showModal(MODAL_TYPES.REGISTER_SUCCESSFUL)"
      @close="closeModal(MODAL_TYPES.REGISTER_SUCCESSFUL)"
      />
    <CIBCModal
      :show="showModal(MODAL_TYPES.CIBC)"
      @close="closeModal(MODAL_TYPES.CIBC)"
    />
    <RedeemModal
      :show="showModal(MODAL_TYPES.REDEEM)"
      @close="closeModal(MODAL_TYPES.REDEEM)"
    />
    <LaterAutoRenewModal
      :show="showModal(MODAL_TYPES.LATER_AUTO_RENEW)"
      @close="closeModal(MODAL_TYPES.LATER_AUTO_RENEW)"
    />
    <FreeTrialRedeemModal
      :show="showModal(MODAL_TYPES.FREE_TRIAL_REDEEM_MODAL)"
      @close="closeModal(MODAL_TYPES.FREE_TRIAL_REDEEM_MODAL)"
    />
    <CreateAccountLoginModal
      :show="showModal(MODAL_TYPES.CREATE_ACCOUNT_MODAL)"
      @close="closeModal(MODAL_TYPES.CREATE_ACCOUNT_MODAL)"
      :isFreeTrial="isFreeTrial"
    />
    <EmailSubscriptionModal
      :show="showModal(MODAL_TYPES.EMAIL_SUBSCRIPTION_MODAL)"
      @close="updateHideEmailOpt()"
      :isFreeTrial="isFreeTrial"
    />
    <AdditionalQuestionsModal
      :show="showModal(MODAL_TYPES.ADDITIONAL_QUESTIONS_MODAL)"
      @close="closeModal(MODAL_TYPES.ADDITIONAL_QUESTIONS_MODAL)"
      :key="profile"
    />
    <QueryModal
      :show="showModal(MODAL_TYPES.QUERY_MODAL)"
      @close="closeModal(MODAL_TYPES.QUERY_MODAL)"
    />
    <ToExtensionModal
      :show="showModal(MODAL_TYPES.BACK_TO_EXTENSION)"
      @close="closeModal(MODAL_TYPES.BACK_TO_EXTENSION)"
    />
    <CreateListModal
      :show="showModal(MODAL_TYPES.SHOW_CREATE_LIST)"
      @close="closeModal(MODAL_TYPES.SHOW_CREATE_LIST)"
    />
    <SavedListModal
      :show="showModal(MODAL_TYPES.SAVED_LIST_MODAL)"
      @close="closeModal(MODAL_TYPES.SAVED_LIST_MODAL)"
    />
    <CIBCActivationModal
      :show="showModal(MODAL_TYPES.CIBC_ACTIVATION)"
      @close="closeModal(MODAL_TYPES.CIBC_ACTIVATION)"
    />
    <OpenAppBanner />
    <CIBCMembershipShowModal
      :show="showModal(MODAL_TYPES.CIBC_MEMBERSHIP)"
      @close="closeModal(MODAL_TYPES.CIBC_MEMBERSHIP)"
    />
    <MembershipExistsModal
      :show="showModal(MODAL_TYPES.MEMBERSHIP_EXISTS)"
      @close="closeModal(MODAL_TYPES.MEMBERSHIP_EXISTS)"
    />
    <SPCPlusUpgradeModal
      :show="showModal(MODAL_TYPES.SPC_PLUS_UPGRADE)"
      @close="closeModal(MODAL_TYPES.SPC_PLUS_UPGRADE)"
      :upgradeType="spcPlusUpgradeType"
    />
    <MembershipExpiringModal
      :show="showModal(MODAL_TYPES.MEMBERSHIP_EXPIRING)"
      @close="closeModal(MODAL_TYPES.MEMBERSHIP_EXPIRING)"
    />
    <RateLimitedModal
      :show="showModal(MODAL_TYPES.RATE_LIMITED_MODAL)"
      @close="closeModal(MODAL_TYPES.RATE_LIMITED_MODAL)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NotificationManager from '@/components/NotificationManager'
import { konami, fire } from '@/utils'
import notifications from '@/data/notifications'
import LoginModal from '@/components/Modals/LoginModal'
import CIBCModal from '@/components/Modals/CIBCModal'
import CIBCActivationModal from '@/components/Modals/CIBCActivationModal'
import RedeemModal from '@/components/Modals/RedeemModal'
import FreeTrialRedeemModal from '@/components/Modals/FreeTrialRedeemModal.vue'
import RegisterSuccessModal from '@/components/Modals/RegisterSuccessModal'
import LaterAutoRenewModal from '@/components/Modals/LaterAutoRenewModal'
import CreateAccountLoginModal from '@/components/Modals/CreateAccountLoginModal'
import EmailSubscriptionModal from '@/components/Modals/EmailSubscriptionModal'
import QueryModal from '@/components/Modals/QueryModal'
import AdditionalQuestionsModal from '@/components/Modals/AdditionalQuestionsModal'
import ToExtensionModal from '@/components/Modals/ToExtensionModal'
import CreateListModal from '@/components/Modals/CreateListModal'
import SavedListModal from '@/components/Modals/SavedListModal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { setUserId } from '@/service/analytics-service'
import OpenAppBanner from '@/components/OpenAppBanner'
import { updateShowEmailOpt, setOrGetRedirectBackUrl } from '@/service/storage'
import CIBCMembershipShowModal from '@/components/Modals/CIBCMembershipShowModal'
import MembershipExistsModal from '@/components/Modals/MembershipExistsModal'
import SPCPlusUpgradeModal from '@/components/Modals/SPCPlusUpgradeModal'
import MembershipExpiringModal from '@/components/Modals/MembershipExpiringModal'
import { loginCustomToken } from '@/vendor/firebase/firebase-actions'
import RateLimitedModal from '@/components/Modals/RateLimitedModal'

export default {
  name: 'app',
  metaInfo () {
    return this.pageTitle
  },
  components: {
    NotificationManager,
    LoginModal,
    CIBCModal,
    RedeemModal,
    RegisterSuccessModal,
    LaterAutoRenewModal,
    FreeTrialRedeemModal,
    CreateAccountLoginModal,
    EmailSubscriptionModal,
    QueryModal,
    AdditionalQuestionsModal,
    ToExtensionModal,
    CreateListModal,
    SavedListModal,
    CIBCActivationModal,
    OpenAppBanner,
    CIBCMembershipShowModal,
    MembershipExistsModal,
    SPCPlusUpgradeModal,
    RateLimitedModal,
    MembershipExpiringModal
  },
  data () {
    return {
      remove: null,
      ready: false,
      policyShown: false,
      enTitleTemplate: '%s | SPC - Discounts and Promo Codes for Canadian Students',
      frTitleTemplate: '%s | SPC - Remises et codes promo pour les étudiants canadiens',
      MODAL_TYPES
    }
  },
  computed: {
    ...mapGetters([
      'error',
      'preference',
      'isFreeTrial',
      'loggedIn',
      'uid',
      'profile',
      'language',
      'spcPlusUpgradeType'
    ]),
    ...mapGetters('modals', [
      'showModal',
      'promptClosed'
    ]),
    ...mapGetters('registration', [
      'card'
    ]),
    pageTitle () {
      let enTitle = {
        title: 'Home',
        titleTemplate: this.enTitleTemplate
      }
      let frTitle = {
        title: 'Accueil',
        titleTemplate: this.frTitleTemplate
      }
      return this.language === 'en' ? enTitle : frTitle
    }
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler (value) {
        // init LP with UID when user logs in
        if (this.uid) {
          setUserId(this.uid)
        }
        const CURRENT_POLICY_COUNT = 1 // Increment this when a new policy comes out
        if (value && !this.policyShown) { // When logged in, and if the policy has not already been pushed
          this.policyShown = true
          const POLICY_ALERT_CATEGORY = 'alerts'
          const POLICY_ALERT_PROPERTY = 'policy'
          if (this.preference(POLICY_ALERT_CATEGORY, POLICY_ALERT_PROPERTY) < CURRENT_POLICY_COUNT) {
            this.pushNotification({
              content: notifications['policy_update'],
              callback: () => {
                this.updatePreference({
                  category: POLICY_ALERT_CATEGORY,
                  property: POLICY_ALERT_PROPERTY,
                  value: CURRENT_POLICY_COUNT
                })
              }
            })
          }
        }
      }
    }
  },
  methods: {
    updateShowEmailOpt,
    updateHideEmailOpt () {
      this.updateShowEmailOpt()
      this.closeModal(MODAL_TYPES.EMAIL_SUBSCRIPTION_MODAL)
    },
    ...mapActions([
      'updatePreference'
    ]),
    ...mapActions('notifications', [
      'pushNotification'
    ]),
    ...mapActions('modals', [
      'closeModal',
      'openModal'
    ]),
    ...mapActions(['getFreeTrialStatus'])
  },
  async created () {
    // removed prod condition since we are not using anyware

    // add auto-login feature entire website
    const url = new URL(window.location.href)
    const customToken = url.searchParams.get('custom_token', null)
    const autoLogin = url.searchParams.get('auto_login') === 'yes'

    // try login only if
    // reduce website load time if data not found
    if (autoLogin && customToken) {
      setOrGetRedirectBackUrl(url.pathname)
      await loginCustomToken(customToken)
      // clear customToken exposed
      this.$router.replace({'query': null})
    }
    const redirectTo = setOrGetRedirectBackUrl()
    if (redirectTo) this.$router.push(redirectTo)
  },
  mounted () {
    const COOKIE_ALERT_CATEGORY = 'alerts'
    const COOKIE_ALERT_PROPERTY = 'cookie'
    console.log('version1.2')
    if (!this.preference(COOKIE_ALERT_CATEGORY, COOKIE_ALERT_PROPERTY)) {
      this.pushNotification({
        content: notifications['cookie_usage'],
        callback: () => {
          this.updatePreference({
            category: COOKIE_ALERT_CATEGORY,
            property: COOKIE_ALERT_PROPERTY,
            value: true
          })
        }
      })
    }

    this.remove = konami(() => {
      fire(document.getElementById('app'))
    })
  },
  beforeDestroy () {
    if (this.remove) this.remove()
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,800')
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@800&display=swap');
@import '~@/assets/stylus/variables'
@import '~@/assets/stylus/components'
@import '~@/assets/stylus/extra'

@font-face {
  font-family: 'Fakt-Blond';
  src: url('~@/assets/fonts/Fakt-Blond.otf'),
    url('~@/assets/fonts/fakt-blond.eot?#iefix') format("embedded-opentype"),
    url('~@/assets/fonts/fakt-blond.woff2') format("woff2"),
    url('~@/assets/fonts/fakt-blond.woff') format("woff"),
    url('~@/assets/fonts/fakt-blond.ttf') format("truetype");;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fakt';
  src: url('~@/assets/fonts/Fakt-Blond.otf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fakt';
  src: url('~@/assets/fonts/Fakt-SemiBold.otf');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fakt';
  src: url('~@/assets/fonts/Fakt-Bold.otf');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fakt';
  src: url('~@/assets/fonts/Fakt-Hair.otf');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fakt';
  src: url('~@/assets/fonts/Fakt-Air.otf');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

html, body, #app
  height 100%

body
  padding 0
  margin 0
  box-sizing border-box
  font-family Poppins, "Helvetica Neue", Helvetica, Ariel, sans-serif

.spc-header-inner, .spc-content-inner, .spc-bottom
  max-width content-breakpoint
  margin auto

.spc-footer-inner
  max-width 1100px
  margin auto

.spc-body-loading, .spc-body-error
  width 100%
  height 100%

._hj_feedback_container div div div div button
  @media (max-width mobile-breakpoint)
    width 25px !important
    padding 5px 5px !important
</style>



// WEBPACK FOOTER //
// src/App.vue
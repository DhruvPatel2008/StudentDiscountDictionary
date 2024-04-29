<template>
  <Modal v-if="Object.keys(emailOptData).length" :show="show" @close="$emit('close')" :inverted="false" optimumWidth='755px' optimumHeight="430px" containerPadding="0" :isHomepagePopup="true" :mobileScreen="isMobileScreen">
    <div class="container">
      <div class="base-inner">
        <img
          v-if="isMobileScreen"
          class="email-image"
          :src="getURL(emailOptData['image_mobile_'+language])"
        />
        <img
          v-else
          class="email-image"
          :src="getURL(emailOptData['image_'+language])"
        />
      </div>
      <div class="base-inner">
        <div class="right-inner">
          <p class="header">{{ translatePropertyWithDefault(emailOptData, 'title') }}</p>
          <p class="title">{{ translatePropertyWithDefault(emailOptData, 'description') }}</p>
          <div class="email-input-block">
            <input v-model="subEmail" :class="{ 'placeholder-success': isProcessingCompleted }" class="email-input" type="text" id="email_modal" name="email_modal" :placeholder="emailSubscriptionInputPlaceholder">
            <button @click="subscribeEmail()" class="email-submit" :class="{ 'not-clickable': !allowSubEmailSubmit }">
              <img v-if="allowSubEmailSubmit" :src="require('@/assets/images/qrlanding/arrow.png')" class="submit-arrow"/>
              <img v-else :src="require('@/assets/images/qrlanding/white-arrow-right.png')" class="submit-arrow"/>
            </button>
          </div>
          <div class="policy">
            <p class="des" v-html="translatePropertyWithDefault(emailOptData, 'text')"></p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modals/Modal'
import LineLoader from '@/components/Utility/LineLoader'
import { subscribeEmail, loadProfile, translatePropertyWithDefault } from '@/service/user-service'
import { isValidEmail, validateDeviceWidth } from '@/utils'
import {
  setHasDeviceSubEmail
} from '@/service/storage'
import { ACTIONS } from '@/service/analytics-service'
import { EmailCaptureBus } from '@/buses/email-capture-bus'
import { getEmailOptModal } from '@/service/emailopt-service'
import { getURL } from '@/service/api-config'
import { getCards, getIsSpcPlusUser } from '@/service/profile-service'

export default {
  components: {
    Modal,
    LineLoader
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isProcessingCompleted: false,
      isProcessingSubscription: false,
      subEmail: '',
      isAgreeSubEmail: false,
      hasAutofilledEmail: false,
      emailOptData: {},
      screenWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'validMemberWithCard',
      'hasSubscriptedEmail',
      'email',
      'loggedIn',
      'language'
    ]),
    ...mapGetters('registration', [
      'card'
    ]),
    emailSubscriptionInputPlaceholder: function () {
      return this.isProcessingCompleted ? this.$t('placeholder_success') : this.$t('placeholder')
    },
    allowSubEmailSubmit: function () {
      return this.subEmail !== '' && isValidEmail(this.subEmail)
    },
    shouldShowEmailSubSection: function () {
      return !this.hasSubscriptedEmail
    },
    isMobileScreen: function () {
      return this.validateDeviceWidth('Mobile', this.screenWidth)
    }
  },
  methods: {
    ...mapActions('modals', [
      'promptClosed',
      'openModal',
      'closeModal'
    ]),
    translatePropertyWithDefault,
    getURL,
    validateDeviceWidth,
    close () {
      this.$emit('close')
    },
    syncEmailSubstatusAnalytics (email) {
      ACTIONS.SUBSCRIBE_EMAIL(email, 'Modal')
    },
    async subscribeEmail () {
      try {
        this.isProcessingSubscription = true
        await subscribeEmail(this.subEmail)
        // refresh user email_opt_in to hide email capture section
        if (this.loggedIn && this.subEmail === this.email) loadProfile()
        this.syncEmailSubstatusAnalytics(this.subEmail)
        this.subEmail = ''
        this.isProcessingCompleted = true
        setHasDeviceSubEmail(true)
        EmailCaptureBus.$emit('hideEmailCaptureBanner')
      } catch (error) {
        this.handleEmailCaptureError(error.response.data.msg)
      } finally {
        this.isProcessingSubscription = false
      }
    },
    handleEmailCaptureError (msg) {
      switch (msg) {
        case 'already subscribed':
          alert(this.$t('email_capture.already_sub'))
          break
        case 'already registered':
          alert(this.$t('email_capture.already_member'))
          break
        default:
          alert(this.$t('email_capture.default'))
          break
      }
    },
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    /**
     * Fetch cards, check if SPC+ user
     * Show SPC+ Modal or else regular Modal
     */
    async pullModalDetails () {
      let cards = null
      cards = await getCards()
      let showSPCPlusModal = await getIsSpcPlusUser(cards)
      try {
        await getEmailOptModal()
        .then(response => {
          let emailOpt = null
          if (showSPCPlusModal) {
            emailOpt = response.filter(modal => modal.is_spc_plus)
          } else {
            emailOpt = response.filter(modal => !modal.is_spc_plus)
          }
          if (emailOpt[0] && emailOpt[0].length > 0) {
            this.emailOptData = emailOpt[0]
          }
        })
      } catch (e) { }
    }
  },
  async created () {
    // call func only after card details are loaded
    await setTimeout(() => this.pullModalDetails(), 1000)
    window.addEventListener('resize', this.updateScreenWidth)
  },
  updated () {
    if (this.show && !this.hasAutofilledEmail) {
      if (this.loggedIn && !this.hasSubscriptedEmail) {
        this.subEmail = this.email
        this.hasAutofilledEmail = true
      }
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/EmailSubscriptionModal'
</style>

<i18n src='Assets/i18n/error'></i18n>
<i18n>
{
  "en": {
    "header": "Get on the list.",
    "title1": "The best deals, contests and more right to your inbox.",
    "subEmailDes_1": "Yes! Send me special deals, updates, giveaways and marketing communications from SPC. I can unsubscribe at anytime. I agree to the SPC",
    "terms": " Terms & Conditions ",
    "policy": " Privacy Policy",
    "and": "and",
    "subEmailDes_2": ".",
    "placeholder": "Enter your email",
    "placeholder_success": "We got it!",
    "sub_success_line1": "Thanks for subscribing.",
    "sub_success_line2": "Stay tuned for emails heading your way!",
    "submit": "Submit"
  },
  "fr": {
    "header": "Inscrivez-vous sur la liste.",
    "title1": "Obtenez les meilleures offres, concours et plus encore dans votre email.",
    "subEmailDes_1": "Oui! Envoyez-moi des offres spéciales, des mises à jour, des cadeaux et des communications marketing de SPC. Je peux me désinscrire à tout moment. J'accept les",
    "terms": " terms et conditions ",
    "policy": " politique de confidentialité ",
    "and": "et",
    "subEmailDes_2": "du site web de SPC.",
    "title_split1": "C'est toujours ",
    "title_split2": "avec vous!",
    "placeholder": "Saisir votre adresse email",
    "placeholder_success": "Reçu!",
    "sub_success_line1": "Merci pour votre abonnement.",
    "sub_success_line2": "Attendez pour les courriels qui vous parviennent!",
    "submit": "Soumettre"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/EmailSubscriptionModal.vue
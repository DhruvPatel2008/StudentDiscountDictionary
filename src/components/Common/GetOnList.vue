<template>
    <!--Get On List Section-->
    <section v-show="shouldShowEmailSubBanner || cibc" class="get-on-list">
    <div class="get-on-list-container">
        <div class="left-content">
        <p class="header">{{ $t('get_on_list.header') }}</p>
        <h4 class="title">{{ $t('get_on_list.title') }}</h4>
        <input :disabled="isProcessingCompleted" v-model="subEmail" :class="{ 'placeholder-success': isProcessingCompleted }" class="email-input-mobile" type="text" id="email1" name="email" :placeholder="emailSubscriptionInputPlaceholder">
        <div class="policy">
            <input :disabled="isProcessingCompleted" class="checkbox" type="checkbox" id="subEmail" value="isAgreeSubEmail" v-model="isAgreeSubEmail"/>
            <label for="subEmail"></label>
            <p class="des">{{ $t('get_on_list.subEmailDescription') }}<a class="des" href="/terms-of-use" target="_blank">{{ $t('get_on_list.terms') }}</a>{{ $t('get_on_list.and') }}<a class="des" href="/privacy-policy" target="_blank">{{ $t('get_on_list.policy') }}</a>{{ $t('get_on_list.subEmailDescription2') }}</p>
        </div>
        </div>
        <div class="right-content">
        <div>
            <input :disabled="isProcessingCompleted" v-model="subEmail" :class="{ 'placeholder-success': isProcessingCompleted }" class="email-input-desktop" type="text" id="email2" name="email" :placeholder="emailSubscriptionInputPlaceholder">
            <button :disabled="!isAgreeSubEmail" v-show="!isProcessingCompleted" @click="subscribeEmail()" :class="{ 'not-clickable': !allowSubEmailSubmit }" class="spc-button-v2 secondary">{{ $t('actions.submit') }}</button>
            <div v-show="isProcessingCompleted" class="sub-success-content">
            <p>{{ $t('get_on_list.sub_success_line1') }}</p>
            <p>{{ $t('get_on_list.sub_success_line2') }}</p>
            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValidEmail } from '@/utils'
import {
  setHasShownEmailSubModal,
  getHasShownEmailSubModal,
  getLeanplumDeviceID,
  getLeanplumUserID,
  getHasDeviceSubEmail,
  setHasDeviceSubEmail
} from '@/service/storage'
import { subscribeEmail } from '@/service/user-service'
import { EmailCaptureBus } from '@/buses/email-capture-bus'
import { ACTIONS } from '@/service/analytics-service'

export default {
  data () {
    return {
      subEmail: '',
      isProcessingCompleted: false,
      isAgreeSubEmail: false,
      hasShowEmailModalBefore: getHasShownEmailSubModal(),
      hasDeviceSubEmailBefore: getHasDeviceSubEmail(),
      lpDeviceId: getLeanplumDeviceID(),
      lpUserId: getLeanplumUserID()
    }
  },
  props: {
    cibc: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'hasSubscriptedEmail',
      'loggedIn',
      'registered',
      'hasValidCard'
    ]),
    emailSubscriptionInputPlaceholder: function () {
      return this.isProcessingCompleted ? this.$t('get_on_list.placeholder_success') : this.$t('get_on_list.placeholder')
    },
    allowSubEmailSubmit: function () {
      return this.isAgreeSubEmail && this.subEmail !== '' && isValidEmail(this.subEmail)
    },
    shouldShowEmailSubBanner: function () {
      return !this.hasSubscriptedEmail && !this.hasDeviceSubEmailBefore && !this.loggedIn && !this.hasEverLoggedIn
    },
    shouldShowEmailSubModal: function () {
      return !this.hasSubscriptedEmail && !this.hasDeviceSubEmailBefore && !this.hasShowEmailModalBefore && !this.loggedIn && !this.hasEverLoggedIn
    },
    hasEverLoggedIn: function () {
      return this.lpDeviceId !== this.lpUserId
    }
  },
  methods: {
    async subscribeEmail () {
      try {
        this.isProcessingSubcription = true
        await subscribeEmail(this.subEmail)
        this.syncEmailSubstatusAnalytics(this.subEmail)
        this.subEmail = ''
        this.isProcessingCompleted = true
        setHasDeviceSubEmail(true)
        this.$emit('hideEmailCaptureBanner')
      } catch (error) {
        this.handleEmailCaptureError(error.response.data.msg)
      } finally {
        this.isProcessingSubcription = false
      }
    },
    syncEmailSubstatusAnalytics (email) {
      ACTIONS.SUBSCRIBE_EMAIL(email, 'Banner')
    },
    hideEmailCaptureBanner (event) {
      this.hasDeviceSubEmailBefore = true
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
    }
  },
  created () {
    try {
      // bus listens on hideEmailCaptureBanner
      EmailCaptureBus.$on('hideEmailCaptureBanner', this.hideEmailCaptureBanner)
      if (this.loggedIn && !this.hasSubscriptedEmail) {
        this.subEmail = this.email
      }
      if (this.shouldShowEmailSubModal) {
        setHasShownEmailSubModal(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/GetOnList'
</style>

<i18n>
{
  "en": {
    "get_on_list": {
      "header": "Get on the list.",
      "title": "The best deals, contests and more right to your inbox.",
      "subEmailDescription": "Yes! Send me special deals, updates, giveaways and marketing communications from SPC. I can unsubscribe at anytime. I agree to the SPC",
      "terms": " Terms & Conditions ",
      "policy": " Privacy Policy",
      "and": "and",
      "subEmailDescription2": ".",
      "title_split1": "It’s always ",
      "title_split2": "with you!",
      "placeholder": "Email Address",
      "placeholder_success": "We got it!",
      "sub_success_line1": "Thanks for subscribing.",
      "sub_success_line2": "Stay tuned for emails heading your way!"
    }
  },
  "fr": {
    "get_on_list": {
      "header": "Inscrivez-vous sur la liste.",
      "title": "Obtenez les meilleures offres, concours et plus encore dans votre email.",
      "subEmailDescription": "Oui! Envoyez-moi des offres spéciales, des mises à jour, des cadeaux et des communications marketing de SPC. Je peux me désinscrire à tout moment. J'accept les",
      "terms": " terms et conditions ",
      "policy": " politique de confidentialité ",
      "and": "et",
      "subEmailDescription2": "du site web de SPC.",
      "title_split1": "C'est toujours ",
      "title_split2": "avec vous!",
      "placeholder": "Courriel",
      "placeholder_success": "Reçu!",
      "sub_success_line1": "Merci pour votre abonnement.",
      "sub_success_line2": "Attendez pour les courriels qui vous parviennent!"
    }
  }
}
</i18n>
<i18n src='Assets/i18n/actions'></i18n>
<i18n src="Assets/i18n/error.json"></i18n>



// WEBPACK FOOTER //
// src/components/Common/GetOnList.vue
<template>
  <Modal
    :show="show"
    @close="clickClose()"
    :inverted="false"
    :newMobileDesign="contestVariant"
    containerPadding="40px 0 0"
    :optimumWidth="contestVariant ? '500px' : '390px'"
    >
    <div class="inner-container">
      <h1 class="title" :class="{contest: contestVariant}">{{ $t(`${variant}.title`) }}</h1>
      <p class="description" :class="{contest: contestVariant}" v-html="$t(`${variant}.description`)"></p>
      <div class="form-button-container" @click="clickClose(verifyWarning)">
        <button v-if="verifyWarning" class="spc-button-v2 purple btn">{{ $t(`${variant}.btn-txt`) }}</button>
        <button
          v-else
          class="spc-button-v2 purple btn"
          :class="{'red-btn': contestVariant}"
        >{{ $t('btn-txt') }}</button>
      </div>
      <div v-if="!verifyWarning && variant !== 'error'" class="form-button-container">
        <a
          @click="reSendVerificationEmail()"
          class="resend-link"
          :class="{ resendDisable: (resendDisabled || isRateLimitExceeds), contestResend: contestVariant }"
        >
          {{ $t('resend-btn-txt')  }}
        </a>
        <div class="resend-after" v-if="isFirebaseError"> {{ $t('error-text-firebase') }} </div>
        <div class="resend-after" v-else-if="resendDisabled && isTimerRunning"> {{ $t('resend-after-txt') + timeRemaining }}s</div>
        <div class="resend-after" v-else-if="isRateLimitExceeds"> {{$t('max-resend-limit')}}</div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/Modal'
import { PAGE_NAMES } from '@/router'
import { resendcountdownTimer } from '@/service/storage'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    variant: {
      type: String,
      required: true
    },
    closeOnRedirect: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      resendDisabled: false,
      timeRemaining: 60,
      intervalId: null,
      isRateLimitExceeds: false,
      isFirebaseError: false,
      isTimerRunning: false
    }
  },
  computed: {
    contestVariant () {
      return this.variant === 'contest'
    },
    verifyWarning () {
      return this.variant === 'verify-warning'
    }
  },
  methods: {
    clickClose (loginRedirect = false) {
      this.$emit('close')
      if (loginRedirect) {
        this.$router.push({
          name: PAGE_NAMES.LOGIN
        })
      } else if (this.closeOnRedirect) {
        this.$router.push({
          name: PAGE_NAMES.HOME
        })
      }
    },
    async reSendVerificationEmail () {
      this.resendDisabled = true
      this.isFirebaseError = false
      this.$emit('resendVerificationEmail')
    },
    startCountdown () {
      this.intervalId = setInterval(() => {
        if (this.timeRemaining > 0 && this.resendDisabled && !this.isRateLimitExceeds) {
          this.isTimerRunning = true
          this.timeRemaining --
        } else {
          this.clearResendInterval()
        }
      }, 1000)
    },
    clearResendInterval () {
      clearInterval(this.intervalId)
      resendcountdownTimer(null, true)
      this.resendDisabled = false
      this.timeRemaining = 60
      this.isTimerRunning = false
    }
  },
  mounted () {
    const timer = Math.floor((Date.now() - parseInt(resendcountdownTimer())) / 1000)
    if (resendcountdownTimer() && (timer > 0 && timer < 60)) {
      this.timeRemaining = this.timeRemaining - timer
      this.resendDisabled = true
      this.startCountdown()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/EmailVerificationModal'
</style>

<i18n>
{
  "en": {
    "contest": {
      "title": "Almost There!",
      "description": "<b>We have sent you a verification email.</b> <br /><br />Please click the link in the email to verify your account and access our 12 days of giveaways!"
    },
    "success": {
      "title": "Almost there!",
      "description": "We sent you a verification email.<br/><br/>Click the link in the email to verify your account."
    },
    "error": {
      "title": "Your Verification Link has Expired.",
      "description": "Please go through the steps again in order to redeem your SPC benefits."
    },
    "warning": {
      "title": "Please Verify your Account",
      "description": "Click on the link we sent to your email to finish your account setup."
    },
    "verify-warning": {
      "title": "You Have Already Verified your Email",
      "description": " ",
      "btn-txt": "LOG IN"
    },
    "btn-txt": "OK",
    "resend-btn-txt": "Resend verification email",
    "resend-after-txt": "Try Resend after ",
    "error-text-firebase": "Too many attempts, please come back and try later.",
    "max-resend-limit": "Maximum retry limit (3) exceeded for the day"
  },
  "fr": {
    "contest": {
      "title": "presque là",
      "description": "<b>Nous vous avons envoyé un courriel de vérification.</b><br /><br />Veuillez cliquer sur le lien dans le courriel pour vérifier votre compte et accéder à nos 12 jours de cadeaux !"
    },
    "success": {
      "title": "Presque là!",
      "description": "Nous vous avons envoyé un courriel de vérification.<br/><br/>Cliquez sur le lien dans le courriel pour vérifier votre compte"
    },
    "error": {
      "title": "Votre lien de vérification a expiré.",
      "description": "Veuillez passer à nouveau l’étape de vérification pour profiter de vos avantages SPC."
    },
    "warning": {
      "title": "Veuillez vérifier votre compte",
      "description": "Cliquez sur le lien que nous vous avons envoyé par e-mail pour terminer la configuration de votre compte."
    },
    "verify-warning": {
      "title": "Vous avez déjà vérifié votre e-mail",
      "description": " ",
      "btn-txt": "CONNEXION"
    },
    "btn-txt": "OK",
    "resend-btn-txt": "Renvoyer le courriel de vérification",
    "resend-after-txt": "Essayez de renvoyer plus tard ",
    "error-text-firebase": "Trop d'essais, veuillez revenir et réessayer plus tard.",
    "max-resend-limit": "Limite maximale de tentatives (3) dépassée pour la journée"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/EmailVerificationModal.vue
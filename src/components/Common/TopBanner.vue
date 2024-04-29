<template>
  <div class="banner-container" v-if="showTopBanner">
    <div v-if="showExpirationBanner">
      <span v-if="expirationBannerType === 'auto-renew'" @click="handleBannerClick">{{ $t('auto_renew') }}</span>
      <span v-if="expirationBannerType === 'payment'" @click="handleBannerClick">
        <span v-if="expirationDays === '7'">{{ $t('payment_expired.7') }}</span>
        <span v-else-if="expirationDays === '0'">{{ $t('payment_expired.0') }}</span>
        <span v-else-if="expirationDays === '60' || expirationDays === '30'">{{ $t('payment_expired.30') }}</span>
        <span v-else-if="expirationDays === '14' || expirationDays === '2'">{{ $t('payment_expired.14') }}</span>
      </span>
      <span v-if="expirationBannerType === 'subscription'" @click="handleBannerClick">{{ $t('subscription_expired') }}</span>
    </div>
    <div v-else-if="showAdditionalQuestionsAlert" @click="navigateProfile"><p>{{ $t('invalid_profile') }}</p></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { validProfile } from '@/models/profile'
import { PAGE_NAMES } from '@/router'
import { gettopBannerStatus } from '@/service/payment-service'
import { ACTIONS } from '@/service/analytics-service'

export default {
  data () {
    return {
      loading: false,
      showExpirationBanner: false,
      expirationBannerType: 'subscription',
      expirationDays: 0,
      PAGE_NAMES
    }
  },
  computed: {
    ...mapGetters([
      'profile',
      'validMember'
    ]),
    ...mapGetters('payment', [
      'expirationBanner'
    ]),
    completeProfileValidator () {
      return validProfile(this.profile)
    },
    showAdditionalQuestionsAlert () {
      const avoidedPages = [
        PAGE_NAMES.PROFILE,
        PAGE_NAMES.SIGNUP_PERSONAL_INFO,
        PAGE_NAMES.SIGNUP_PAYMENT_PURCHASE,
        PAGE_NAMES.SIGNUP_PAYMENT_ACTIVATE,
        PAGE_NAMES.SUMMARY,
        PAGE_NAMES.ACTIVATION_MEMBERSHIP,
        PAGE_NAMES.ACTIVATION_ACCOUNT,
        PAGE_NAMES.ACTIVATION_INFO,
        PAGE_NAMES.ACTIVATION_COMPLETION
      ]
      const isAvoidedPage = avoidedPages.includes(this.$router.currentRoute.name)
      return this.validMember && this.profile && !this.completeProfileValidator.valid && !isAvoidedPage
    },
    showTopBanner () {
      if (this.loading) return false

      const avoidedPages = [
        PAGE_NAMES.EASY_PROMO
      ]
      return !avoidedPages.includes(this.$router.currentRoute.name)
    }
  },
  methods: {
    ...mapActions('payment', [
      'updateExpirationBanner'
    ]),
    navigateProfile () {
      this.$router.push({ name: PAGE_NAMES.EDIT_PROFILE })
    },
    async loadExpirationBanner () {
      // Check if there's expiration banner info already in store
      if (this.expirationBanner) {
        this.showExpirationBanner = this.expirationBanner.success
        this.expirationBannerType = this.expirationBanner.type
        this.expirationDays = this.expirationBanner.days
        return
      }

      // Return if not logged in
      if (!this.validMember) return false

      // Load banner status
      let response = null
      this.loading = true
      try {
        response = await gettopBannerStatus()
      } catch (error) {}

      this.loading = false

      if (!response || response.status !== 200 || response.data.success === false) {
        this.updateExpirationBanner({'success': false})
        return
      }

      // Update variables and save response data to store
      this.showExpirationBanner = true
      this.expirationBannerType = response.data.type
      this.expirationDays = response.data.days
      this.updateExpirationBanner(response.data)
    },
    // Function to track banner view and call events accordingly
    trackBannerEvents () {
      if (this.showExpirationBanner === false) {
        return
      }
      if (this.expirationBannerType === 'payment') {
        if (this.expirationDays === '7') {
          ACTIONS.VIEW_PM_EXPIRING_BANNER()
        } else if (this.expirationDays > '0') {
          ACTIONS.VIEW_PM_EXPIRED_BANNER()
        }
      } else if (this.expirationBannerType === 'subscription') {
        ACTIONS.VIEW_MEMBERSHIP_EXPIRED_BANNER()
      } else if (this.expirationBannerType === 'auto-renew') {
        ACTIONS.VIEW_MEMBERSHIP_EXPIRING_BANNER()
      }
    },
    // Function to handle the banner click and call events accordingly
    handleBannerClick () {
      if (this.expirationBannerType === 'payment') {
        if (this.expirationDays === '7') {
          ACTIONS.CLICK_PM_EXPIRING_BANNER()
        } else if (this.expirationDays > '0') {
          ACTIONS.CLICK_PM_EXPIRED_BANNER()
        }
        this.$router.push({name: PAGE_NAMES.Billing})
      } else if (this.expirationBannerType === 'subscription') {
        ACTIONS.CLICK_MEMBERSHIP_EXPIRED_BANNER()
        this.$router.push({name: PAGE_NAMES.SIGNUP_ACCOUNT_CREATION})
      } else if (this.expirationBannerType === 'auto-renew') {
        ACTIONS.CLICK_MEMBERSHIP_EXPIRING_BANNER()
        this.$router.push({name: PAGE_NAMES.Billing})
      }
    }
  },
  created () {
    this.loadExpirationBanner()
  },
  updated () {
    this.trackBannerEvents()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/TopBanner'
</style>

<i18n>
{
  "en": {
    "invalid_profile": "Provide missing information to finish setting up your account",
    "auto_renew": "Your SPC membership expires soon. Start a subscription today so you don't miss out on any discounts!",
    "payment_expired": {
      "7": "Your payment method is about to expire! Update it now to continue getting SPC discounts!",
      "0": "Your payment method has expired. Update it NOW to continue getting SPC discounts!",
      "30": "Your payment method has expired and your SPC membership is going to expire soon! Update it now to avoid missing out on SPC discounts!",
      "14": "Your payment method has expired so your SPC membership is going to expire too! Update it now to avoid missing out on SPC discounts!"
    },
    "subscription_expired": "Your SPC Membership has expired. Resubscribe to continue using SPC discounts!"
  },
  "fr": {
    "invalid_profile": "Veuillez fournir plus d'informations pour terminer la configuration de votre compte!",
    "auto_renew": "Votre adhésion à la SPC expire bientôt. Activez le renouvellement automatique pour ne pas manquer de réductions !",
    "payment_expired": {
      "7": "Votre méthode de paiement est sur le point d'expirer ! Mettez-le à jour maintenant pour continuer à bénéficier des remises SPC !",
      "0": "Votre méthode de paiement a expiré ! Mettez à jour maintenant pour continuer à utiliser votre adhésion à la SPC !",
      "30": "Votre mode de paiement a expiré et votre adhésion à la SPC va bientôt expirer ! Mettez-la à jour maintenant pour ne pas manquer les réductions de la SPC !",
      "14": "Votre mode de paiement a expiré et votre adhésion à la SPC va bientôt expirer ! Mettez-la à jour maintenant pour ne pas manquer les réductions de la SPC !"
    },
    "subscription_expired": "Votre adhésion à SPC a expiré. Réinscrivez-vous pour continuer à utiliser vos réductions SPC !"
  }
}



// WEBPACK FOOTER //
// src/components/Common/TopBanner.vue
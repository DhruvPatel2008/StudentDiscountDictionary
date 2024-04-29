<template>
  <Modal :show="show" @close="$emit('close')">
    <div class="modal-container">
      <h2>{{ $t('header') }}</h2>
      <p class="modal-desc-main">{{ $t('desc_main') }}</p>
      <p class="modal-desc-details" v-html="$t(`desc_details_${upgradeType}`)"></p>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/Modal'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    upgradeType: {
      type: String,
      default: 'vip'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/SPCPlusUpgradeModal'
</style>

<i18n>
{
  "en": {
    "header": "Welcome to SPC+!",
    "desc_main": "You have successfully registered your new SPC+ membership and now have access to bigger deals and discounts!",
    "desc_details_braintree": "Your previous membership and subscription has been cancelled. You will not longer be charged an annual membership fee.",
    "desc_details_apple_iap": "Your previous membership has been cancelled. However, in order to avoid annual subscription fees you must manually cancel your existing iAP subscription. <strong><a href='https://support.apple.com/en-ca/HT202039' target='_blank'>CLICK HERE</a></strong> and follow the steps to cancel your subscription.",
    "desc_details_vip": "Your previous membership has been deactivated."
  },
  "fr": {
    "header": "Bienvenue à SPC+!",
    "desc_main": "Vous avez inscrit avec succès votre nouvelle adhésion SPC+ et avez accès à de plus grandes offres et remises!",
    "desc_details_braintree": "Votre adhésion précédente a été désactivée. Vous n'aurez pas à payer de cotisation annuelle.",
    "desc_details_apple_iap": "Votre adhésion précédente a été désactivée. Cependant, afin d'éviter les frais d'abonnement annuels, vous devez annuler manuellement votre abonnement iAP existant. <strong><a href='https://support.apple.com/fr-ca/HT202039' target='_blank'>CLIQUEZ ICI</a></strong> et suivez les étapes pour annuler votre abonnement.",
    "desc_details_vip": "Votre adhésion précédente a été désactivée."
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/SPCPlusUpgradeModal.vue
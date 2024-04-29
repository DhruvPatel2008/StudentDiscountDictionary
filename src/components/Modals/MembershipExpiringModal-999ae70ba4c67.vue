<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false" containerPadding="50px 25px 15px">
    <div class="modal-container">
      <div v-if="membershipExpiringModalType === 'auto-renew'">{{ $t('auto-renew') }}</div>
      <div v-else-if="membershipExpiringModalType === 'payment'">{{ $t('payment') }}</div>
      <div v-else>{{ $t('subscription') }}</div>

      <button class="spc-button-v2 purple" @click="handleButtonClick">
        <span v-if="membershipExpiringModalType === 'auto-renew'">{{ $t('turn_on_auto_renew') }}</span>
        <span v-else-if="membershipExpiringModalType === 'payment'">{{ $t('update_pm') }}</span>
        <span v-else>{{ $t('resubscribe') }}</span>
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/Modal'
import { mapGetters } from 'vuex'
import { ACTIONS } from '@/service/analytics-service'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters('payment', [
      'membershipExpiringModalType'
    ])
  },
  methods: {
    handleButtonClick () {
      // Set ModalName to Membership Expired Modal
      if (this.membershipExpiringModalType === 'subscription') {
        ACTIONS.CLICK_RESUBSCRIBE_NOW('Membership Expired Modal')
        this.$emit('close')
        this.$router.push('/signup/account-creation')
      } else {
        if (this.membershipExpiringModalType === 'payment') {
          ACTIONS.CLICK_UPDATE_PAYMENT_METHOD('Payment Method Expired Modal')
        } else if (this.membershipExpiringModalType === 'auto-renew') {
          ACTIONS.CLICK_START_SUBSCRIPTION('Membership Expiring Modal')
        }
        this.$emit('close')
        this.$router.push('/billing')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/MembershipExpiringModal'
</style>

<i18n>
{
  "en": {
    "payment": "Your payment method has expired so your SPC membership is going to expire too! Update it now to avoid missing out on SPC discounts!",
    "auto-renew": "Your SPC membership expires soon. Start a subscription today so you don't miss out on any discounts!",
    "subscription": "Your SPC membership has expired. For only $11.99/year you can continue to use your SPC discounts! Resubscribe now.",
    "resubscribe": "Resubscribe Now",
    "turn_on_auto_renew": "Start Subscription",
    "update_pm": "Update payment method"
  },
  "fr": {
    "payment": "Votre mode de paiement a expiré et votre adhésion à la SPC va bientôt expirer ! Mettez-la à jour maintenant pour ne pas manquer les réductions de la SPC !",
    "auto-renew": "Votre adhésion à la SPC expire bientôt. Activez le renouvellement automatique pour ne pas manquer de réductions !",
    "subscription": "Votre adhésion à la SPC a expiré. Pour seulement 11,99 $/an, vous pouvez continuer à utiliser vos réductions SPC ! Réabonnez-vous maintenant.",
    "resubscribe": "Réabonnez-vous maintenant",
    "turn_on_auto_renew": "Activez le renouvellement automatique",
    "update_pm": "Mettre à jour le mode de paiement maintenant"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/MembershipExpiringModal.vue
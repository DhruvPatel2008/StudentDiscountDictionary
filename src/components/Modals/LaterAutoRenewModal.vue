<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">
    <div class="register-success-container">
      <h1>{{ $t('title') }}</h1>
      <p class="description">{{ $t('message') }}</p>
      <div class="form-button-container">
        <button class="spc-button-v2 secondary"  style="max-width: 300px;" @click="$emit('close')">{{ $t('no') }}</button>
        <button class="spc-button-v2"  style="max-width: 300px;" @click="onYes">{{ $t('yes') }}</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'

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
  methods: {
    ...mapActions('modals', [
      'closeModal'
    ]),
    onYes () {
      this.$router.push('/billing')
      this.closeModal(MODAL_TYPES.LATER_AUTO_RENEW)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/LaterAutoRenewModal'
</style>

<i18n>
{
  "en": {
    "title": "Would you like to Renew?",
    "message": "Add a payment method to automatically renew your SPC membership for upcoming years.",
    "no": "no",
    "yes": "yes"
  },
  "fr": {
    "title": "Souhaitez-vous renouveler?",
    "message": "Ajoutez un mode de paiement pour renouveler automatiquement votre adhésion SPC pour les années à venir.",
    "no": "non",
    "yes": "oui"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/LaterAutoRenewModal.vue
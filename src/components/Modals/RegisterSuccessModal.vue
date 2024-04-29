<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">
    <div class="register-success-container">
      <img :src="require('@/assets/images/checkmark.svg')" alt="check"/>
      <h2>{{ $t('message') }}</h2>
      <div class="form-button-container">
        <button class="spc-button-v2"  style="max-width: 300px;" @click="onStartShopping">{{ $t('start_shopping') }}</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import Badges from '@/components/Badges'
import { getIsFreeTrial } from '@/service/offer-service'

export default {
  components: {
    Modal,
    Badges
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isAutoRenew',
      'hasValidCard'
    ])
  },
  methods: {
    ...mapActions('modals', [
      'closeModal',
      'openModal'
    ]),
    async onStartShopping () {
      this.closeModal(MODAL_TYPES.REGISTER_SUCCESSFUL)
      await getIsFreeTrial()
      if (!this.isAutoRenew && !this.isFreetrial && !this.hasValidCard) {
        this.openModal(MODAL_TYPES.LATER_AUTO_RENEW)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/RegisterSuccessModal'
</style>

<i18n>
{
  "en": {
    "message": "Your SPC membership has been successfully activated!",
    "app_prompt": "Download the SPC app and log in to get access to your digital membership.",
    "start_shopping": "Start shopping"
  },
  "fr": {
    "message": "Votre adhésion SPC a été activée avec succès!",
    "app_prompt": "Veuillez télécharger l’application SPC et faire connexion à votre compte existant afin d’accéder à votre adhésion numérique.",
    "start_shopping": "Magasinez"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/RegisterSuccessModal.vue
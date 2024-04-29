<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">
    <div class="cibc-container">
      <div class="column-one">
        <img class="spc-cibc-logo" v-lazy="require('@/assets/images/cibc/1484/spccibc.png')" >
        <div class="header-text">{{ $t('title') }}</div>
        <div class="description">{{ $t('description') }}</div>
        <div class="horizontal-divider"></div>
        <div class="description">{{ $t('description_2') }}</div>
        <Badges/>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { ACTIONS } from '@/service/analytics-service'
import Modal from '@/components/Modals/Modal'
import Badges from '@/components/Badges'

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
      'loggedIn'
    ])
  },
  methods: {
    handleLearnMore () {
      ACTIONS.LEARN_MORE_ON_MEMBERSHIP_GATE()
      this.$emit('close')
    }
  },
  updated () {
    if (this.show) ACTIONS.VIEW_SPC_PLUS_WELCOME_MODAL()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/CIBCActivationModal'
</style>

<i18n>
{
  "en": {
    "spc": "SPC",
    "title": "Thanks for joining SPC!",
    "description": "Your SPC+ membership was successfully activated!",
    "description_2": "To access your digital membership, download the SPC app and start shopping no matter where you are."
  },
  "fr": {
    "spc": "SPC",
    "title": "Merci d'avoir rejoint la SPC!",
    "description": "Votre adhésion SPC+ est activée avec succès!",
    "description_2": "Pour accéder à votre adhésion numérique, téléchargez l'application SPC et commencez à magasiner où que vous soyez."
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/CIBCActivationModal.vue
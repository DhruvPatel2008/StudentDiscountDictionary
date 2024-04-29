<template>
  <Modal :show="show" @close="$emit('close')" :inverted="true">
    <div class="login-container">
       <div
        class="spc-pill"
        >
        <img class="spc-pill-image" :src="require('@/assets/images/cibc/pill-spc@3x.png')"/>
        <p class="exclusive">{{ $t('exclusive') }}</p>
      </div>
      <h1 class="header">{{ $t('title') }}</h1>
      <p class="description">{{ $t('description') }}</p>

      <router-link
        to="/cibc"
        tag="button"
        class="spc-button-v2 primary purple small"
        :title="$t('register_description')"
        @click.native="handleLearnMore"
        >{{ $t('register') }}</router-link>

    </div>
  </Modal>
</template>

<script>
import { ACTIONS } from '@/service/analytics-service'
import Modal from '@/components/Modals/RedeemSPCBaseModal'

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
    handleLearnMore () {
      ACTIONS.LEARN_MORE_ON_MEMBERSHIP_GATE()
      this.$emit('close')
    }
  },
  updated () {
    if (this.show) ACTIONS.VIEW_PLUS_MEMBERSHIP_GATE()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/RedeemModal'
</style>

<i18n>
{
  "en": {
    "exclusive":"Exclusive",
    "register": "Learn More",
    "title": "This offer is exclusive to SPC+ members only.",
    "description": "Find out how you can save more with SPC+",
    "register_description": "CIBC student clients get SPC+ for free"
  },
  "fr": {
    "exclusive":"Exclusif",
    "register": "Apprendre Encore Plus",
    "title": "Cette offre est réservée aux membres SPC+ uniquement.",
    "description": "Découvrez comment vous pouvez économiser davantage avec SPC+",
    "register_description": "Les clients étudiants de CIBC obtennient SPC+ gratuitement"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/RedeemModal.vue
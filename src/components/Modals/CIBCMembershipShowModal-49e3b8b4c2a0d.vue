<template>
  <Modal :show="show" @close="$emit('close')">
    <div class="login-container">
      <h1 class="header">{{ $t('title') }}</h1>
      <p class="description">{{ $t('description') }}</p>

      <button
        tag="button"
        class="spc-button-v2 primary purple small"
        @click="startShopping()"
        >{{ $t('start_shopping') }}</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/BaseModal'
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
  methods: {
    startShopping () {
      ACTIONS.CLICKED_START_SHOPPING()
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/CIBCMembershipShowModal'
</style>

<i18n>
{
  "en": {
    "start_shopping": "CONTINUE SHOPPING",
    "title": "You already have an existing SPC+ Membership.",
    "description": "No new memberships have been activated."
  },
  "fr": {
    "start_shopping": "RETOUR AUX ACHATS",
    "title": "Vous avez déjà une adhésion SPC+.",
    "description": "Aucune nouvelle adhésion n'a été activée."
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/CIBCMembershipShowModal.vue
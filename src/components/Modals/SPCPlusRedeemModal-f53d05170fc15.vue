<template>
  <Modal :show="show" @close="$emit('close')" :inverted="true">
    <div class="login-container">
      <div class="spc-pill">
        <img class="spc-pill-image" :src="require('@/assets/images/cibc/pill-spc@3x.png')"/>
        <p class="exclusive">{{ $t('exclusive') }}</p>
      </div>

      <h1 class="header">{{ $t('title') }}</h1>
      <p class="description">{{ $t('description') }}</p>

      <router-link
        :to="plusOfferId != null ? plusOfferId : ''"
        tag="button"
        class="spc-button-v2 purple"
        :title="$t('register_description')"
        @click.native="handleViewBetterOffer"
      >{{ $t("view_spc_plus") }}</router-link>

      <button class="spc-button-v2 secondary" v-clipboard="code" v-on:click="handleRedeemAnyway">{{ $t("redeem_anyways") }}</button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { ACTIONS } from '@/service/analytics-service'
import Modal from '@/components/Modals/RedeemSPCBaseModal'

export default {
  components: {
    Modal
  },
  props: {
    plusOfferId: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      required: true
    },
    code: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    handleViewBetterOffer () {
      ACTIONS.CLICKED_VIEW_PLUS_ON_ACCESS_REMINDER()
      this.$emit('close')
    },
    handleRedeemAnyway () {
      ACTIONS.CLICKED_REDEEM_ANYWAY_ON_ACCESS_REMINDER()
      this.$emit('redeemAnyway')
    }
  },
  updated () {
    if (this.show) ACTIONS.VIEW_PLUS_MEMBERSHIP_GATE()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/SPCPlusRedeemModal'
</style>

<i18n>
{
  "en": {
    "exclusive":"Exclusive",
    "title": "SPC+ Members!",
    "description": "You have access to the SPC+ deal",
    "view_spc_plus": "View SPC+ Deal",
    "register_description": "Register your SPC membership - be sure to have your 16 digit SPC # ready!",
    "redeem_anyways": "Redeem Anyways"
  },
  "fr": {
    "exclusive":"Exclusif",
    "title": "Membres SPC +!",
    "description": "Vous avez accès à l'offre SPC +",
    "view_spc_plus": "Voir l'offre SPC+",
    "register_description": "Activez votre abonnement SPC - assurez-vous d'avoir votre numéro SPC à 16 chiffres prêt!",
    "redeem_anyways": "Échangez quand même"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/SPCPlusRedeemModal.vue
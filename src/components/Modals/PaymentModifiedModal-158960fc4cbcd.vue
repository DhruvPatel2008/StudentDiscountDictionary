<template>
  <Modal :show="show" @close="$emit('close')" :inverted="true">
    <div class="modal-container">
      <img class="banner-image purchase-modified-image" :src="require(`@/assets/images/modals/${language}/already-have-membership.jpg`)"/>
      <h1 class="header slider">{{ $t('title_1') }}</h1>
      <p class="description slider">{{ $t('description') }}</p>

      <button
      class="spc-button-v2 secondary small slider"
      @click="$emit('buyspc')"
        >{{ $t('buy_spc') }}</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/RedeemBaseModal'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    language: {
      type: String,
      default: 'en'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/PaymentModifiedModal'
</style>

<i18n>
{
  "en": {
    "title_1": "Oops! You didn't complete your order. Don't want to save?",
    "description": "Don't miss out on over $200 of savings, finish your purchase now!",
    "buy_spc": "BUY SPC"
  },
  "fr": {
    "title_1": "Oups! Vous n'avez pas terminé votre commande. Vous ne voulez pas économiser?",
    "description": "Économisez en moyenne 200$ par année. Complétez votre achat maintenant!",
    "buy_spc": "Achetez SPC"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/PaymentModifiedModal.vue
<template>
  <Modal :show="show" @close="$emit('close')">
    <div class="container">
      <h1>{{ $t('header') }}</h1>
      <p class="details">{{ $t('details') }}</p>
      <button class="spc-button-v2 purple" @click="$emit('close')">OK</button>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/ToExtensionModal'
</style>

<i18n>
{
  "en": {
    "header": "Did you know?",
    "details": "Online discounts are now available with \nthe SPC browser extension!"
  },
  "fr": {
    "header": "Savez-vous?",
    "details": "Des remises en ligne sont désormais \ndisponibles avec l'extension navigateur SPC!"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/ToExtensionModal.vue
<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">
    <div class="container">
      <h1>{{ $t('title') }}</h1>
      <div class="form-button-container">
        <button
          class="spc-button-v2"
          style="max-width: 200px;"
          @click="$emit('close')"
        >{{ $t('button') }}</button>
      </div>
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
@import '~@/assets/components/Modals/RateLimitedModal'
</style>

<i18n>
{
  "en": {
    "title": "Too many requests at the moment. Please try again later",
    "button": "Ok"
  },
  "fr": {
    "title": "Un trop grand nombre de requêtes pour le moment. Veuillez réessayer plus tard.",
    "button": "D'accord"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/RateLimitedModal.vue
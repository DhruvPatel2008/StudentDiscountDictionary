<template>
  <Modal :show="show" @close="$emit('close')" :contained="true">
    <div class="container">
      <p class="details">
        {{ $t('details') }}
      </p>
      <button
        class="spc-button-v2 purple understood"
        @click="closePopup()"
        >{{ $t('understood') }}</button>
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
  },
  methods: {
    closePopup () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/QueryModal'
</style>

<i18n>
{
  "en": {
    "details": "Providing this information allows us to provide you with the discounts, contests, experiences and more that are best suited for you! From discounts near you to campus/school events we don't want you to miss out.",
    "understood": "I UNDERSTAND"
  },
  "fr": {
    "details": "Le fourniture de ces informations nous permet de vous donner accès à des remises, concours, et plus encore que vous aimez! De des remises près de chez vous aux événements sur le campus/l'école que nous ne voulons pas que vous manquiez.",
    "understood": "je comprends"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/QueryModal.vue
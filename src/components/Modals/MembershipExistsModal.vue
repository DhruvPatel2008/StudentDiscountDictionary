<template>
  <Modal :show="show" @close="$emit('close')">
    <div class="modal-container">
      <p class="modal-header">{{ $t('you_have_membership') }}</p>
      <p class="modal-body" v-html="$t('creat_new_acc')"></p>
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
@import '~@/assets/components/Modals/MembershipExistsModal'
</style>

<i18n>
{
  "en": {
    "you_have_membership": "You already have an active membership in your account.",
    "creat_new_acc": "In order to activate a new membership, you will need to create a new SPC account. If you have any questions please contact our customer care team at <strong><a href='mailto:questions@spccard.ca'>questions@spccard.ca</a></strong>."
  },
  "fr": {
    "you_have_membership": "Vous avez déjà une adhésion active dans votre compte.",
    "creat_new_acc": "Afin d'activer une nouvelle adhésion, vous devrez créer un nouveau compte SPC. Si vous avez des questions, veuillez contacter notre équipe de service clientèle à l'adresse <strong><a href='mailto:questions@spccard.ca'>questions@spccard.ca</a></strong>."
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/MembershipExistsModal.vue
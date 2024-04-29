<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">
    <div class="register-success-container">
      <div class="list-title">
        <span class="delete-list">{{ $t('title') }}</span>
      </div>
      <div class="desc-container">
        <p class="description first">{{ $t('description_1') }}</p>
        <p class="description"><b>{{ $t('note') }}</b>{{ $t('description_2') }}</p>
      </div>
      <div class="form-button-container">
        <button class="base-button delete-btn" @click="confirmDelete">{{ $t('delete') }}</button>
        <button class="base-button keep-btn" @click="$emit('close')">{{ $t('cancel') }}</button>
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
    },
    title: {
      type: String
    },
    description: {
      type: String,
      default: 'Alert popup'
    }
  },
  methods: {
    confirmDelete () {
      this.$emit('close')
      this.$emit('confirmDeleteList')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/DeleteListModal'
</style>

<i18n>
{
  "en": {
    "title": "Delete list?",
    "description_1": "Are you sure you want to delete this shopping list?",
    "description_2": "this action cannot be reversed",
    "cancel": "KEEP IT",
    "delete": "DELETE IT",
    "note": "Note: "
  },
  "fr": {
    "title": "Supprimer la liste?",
    "description_1": " Êtes-vous certain de vouloir supprimer cette liste?",
    "description_2": "cette action est irréversible",
    "cancel": "Garder-le",
    "delete": "Supprime-le",
    "note": "Remarque: "
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/DeleteListModal.vue
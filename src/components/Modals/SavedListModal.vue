<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false" :closeButton="false" :containerPadding="'32px 25px'">
    <div class="list-container">
      <div>
        <span :class="`choose-list ${language == 'fr' ? 'choose-list-fr' : ''}`">{{ $t('choose_list') }}</span>
        <span :class="`create-list ${language == 'fr' ? 'create-list-fr' : ''}`" @click="showCreateListModal">{{ $t('create_list') }}</span>
      </div>

      <div class="saved-lists">
        <div v-for="list in savedList" :key="list.id" class="list">
          <div :class="`list-details ${language == 'fr' ? 'list-details-fr' : ''}`">
            <span :title="$t(list.name)" class="list-name" v-if="$t(list.name).length > 45">
              {{ ($t(list.name)).slice(0,40).concat('...') }}
            </span>
            <span class="list-name" v-else>
              {{ $t(list.name) }}
            </span>
            <span class="list-items">{{ list.offer_ids ? list.offer_ids.length : 0}} {{ $t('items') }}</span>
          </div>
          <div @click="updateList(list)" :class="`save ${language == 'fr' ? 'save-fr' : ''}`">
            {{ $t('save') }}
            <img :src="require('@/assets/images/qrlanding/arrow.png')" alt="Arrow">
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import store from '@/store'

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
  data () {
    return {
      savedLists: [],
      additionOfferIds: []
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    ...mapGetters('offers', [
      'savedList',
      'savedListLoading'
    ])
  },
  methods: {
    ...mapActions('modals', [
      'openModal',
      'closeModal'
    ]),
    ...mapActions('offers', [
      'updateSavedList'
    ]),
    /**
      * Method to add new offer to the saved list
      */
    async updateList (savedList) {
      this.additionOfferIds = savedList.offer_ids ? savedList.offer_ids : []
      if (store.getters.offerId) {
        this.additionOfferIds.push(store.getters.offerId)
      }
      this.updateSavedList({ offerIds: this.additionOfferIds, listId: savedList.id, listName: savedList.name })
      .catch(error => {
        console.error(error)
      })
      await store.dispatch('offerId', null)
      this.closeModal(MODAL_TYPES.SAVED_LIST_MODAL)
    },
    close () {
      this.$emit('close')
    },
    showCreateListModal () {
      this.closeModal(MODAL_TYPES.SAVED_LIST_MODAL)
      this.openModal(MODAL_TYPES.SHOW_CREATE_LIST)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/SavedListModal'
</style>

<i18n>
{
  "en": {
    "choose_list": "Choose a list",
    "create_list": "Create a new list",
    "Saved": "Saved",
    "items": "items",
    "save": "Save"
  },
  "fr": {
    "choose_list": "Choisissez une liste",
    "create_list": "Créez une nouvelle liste",
    "Saved": "Enregistré",
    "items": "articles",
    "save": "Enregistrer"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/SavedListModal.vue
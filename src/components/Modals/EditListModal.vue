<template>
  <Modal :show="show" @close="closeModal" :inverted="false" :containerPadding="'32px 25px'">
    <div class="login-container">
      <div class="edit-List-section">
        <span class="create-a-new-List">{{ $t('edit-list') }}</span>
      </div>
      <div class="list-name-section">
        <span class="list-name">{{ $t('list-name') }}</span>
      </div>
      <div class="input-section">
        <input
          type="input"
          class="input-box"
          autocomplete="off"
          :value="listName"
          id="input-list-name"
        />
        <span v-if="isAlreadyExist" class="already-exist">{{listName}} {{ $t('already-exist') }}</span>
        <span v-if="!vaildList" class="already-exist">{{ $t('valid-list') }}</span>
      </div>
      <div>
        <button class="clipboard-btn spc-button-v2 purple"  @click="editListName()">
            <span>{{ $t('save') }}</span>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isAlreadyExist: false,
      listName: this.list.name,
      vaildList: true
    }
  },
  computed: {
    ...mapGetters('offers', [
      'savedList'
    ])
  },
  methods: {
    ...mapActions('modals', [
      'closeModal'
    ]),
    ...mapActions('offers', [
      'updateSavedList'
    ]),
    closeModal () {
      this.isAlreadyExist = false
      this.vaildList = true
      this.listName = this.list.name
      this.$emit('close')
    },
    /**
     * Update the custom list name.
     * @param {String} name
     */
    editListName () {
      this.listName = document.getElementById('input-list-name').value
      this.isAlreadyExist = false
      if (this.listName.length < 1) {
        this.listName = this.list.name
        this.$emit('close')
        return
      }
      this.updateSavedList({ offerIds: this.list.offer_ids, listId: this.list.id, listName: this.listName })
      .then(response => {
        this.vaildList = true
        this.isAlreadyExist = false
        this.$emit('refreshList')
        this.$emit('close')
        console.log(response)
      })
      .catch(error => {
        this.isAlreadyExist = true
        console.error(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/EditListModal'
</style>

<i18n>
{
  "en": {
    "list-name": "List name:",
    "edit-list": "Edit List",
    "save": "Save",
    "already-exist": "list already exists!"
  },
  "fr": {
    "list-name": "Nom de la liste:",
    "edit-list": "Modifier Liste",
    "save": "Enregistrer"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/EditListModal.vue
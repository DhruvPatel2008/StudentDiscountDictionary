<template>
  <Modal :show="show" @close="close" :inverted="false" :containerPadding="'32px 25px'">
    <div class="login-container">
      <div>
        <span class="create-a-new-List">{{ $t('create-new-list') }}</span>
      </div>
      <div class="lists-are-the-best-w break-text">
        {{ $t('sub-title') }}
      </div>
      <div class="list-name-section">
        <span class="list-name">{{ $t('list-name') }}</span>
      </div>
      <div class="create-input-section">
        <input
          type="input"
          class="input-box"
          autocomplete="off"
          :value="listName"
          :placeholder="$t('list-name-example')"
          id="input-list"
        />
        <span v-if="isAlreadyExist" class="already-exist">{{listName}} {{ $t('already-exist') }}</span>
        <span v-else-if="!vaildList" class="already-exist">{{ $t('valid-list') }}</span>
      </div>
      <div>
        <button class="clipboard-btn spc-button-v2 purple" @click="createNewList()">
            <span>{{ $t('create-list') }}</span>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { createSavedList } from '@/service/profile-service'
import { PAGE_NAMES } from '@/router'
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
  data () {
    return {
      isAlreadyExist: false,
      listName: '',
      vaildList: true
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'validMemberWithCard'
    ]),
    ...mapGetters('registration', [
      'card'
    ]),
    ...mapGetters('offers', [
      'savedList'
    ])
  },

  methods: {
    ...mapActions([
      'loadRegistration',
      'loadCards'
    ]),
    ...mapActions('modals', [
      'promptClosed',
      'openModal',
      'closeModal'
    ]),
    ...mapActions('offers', [
      'loadSavedList'
    ]),
    close () {
      this.listName = ''
      this.isAlreadyExist = false
      this.vaildList = true
      this.$emit('close')
      if (this.$route.name === 'Category') {
        this.openModal(MODAL_TYPES.SAVED_LIST_MODAL)
      }
    },
    /**
      * Method to add new list
      */
    createNewList () {
      this.listName = document.getElementById('input-list').value
      this.isAlreadyExist = false
      if (this.listName.length < 1) {
        this.vaildList = false
        return
      }
      // trim off white space
      this.listName = this.listName.trim()
      createSavedList(this.listName)
      .then(res => {
        ACTIONS.CREATE_SAVED_LIST()
        this.listName = ''
        this.vaildList = true
        this.isAlreadyExist = false
        this.savedList.push(res)
        this.$emit('close')
        if (this.$route.name === PAGE_NAMES.CATEGORY || this.$route.name === PAGE_NAMES.DEAL || this.$route.name === PAGE_NAMES.DEALS) {
          this.openModal(MODAL_TYPES.SAVED_LIST_MODAL)
        }
      })
      .catch(error => {
        this.isAlreadyExist = true
        console.error(error)
      })
    }
  },
  async created () {
    await this.loadSavedList(this.loggedIn)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/CreateListModal'
</style>

<i18n>
{
  "en": {
    "create-new-list": "Create a new list",
    "sub-title": "Lists are the best way to keep your favourite offers neatly organized. All you have to do is choose a name and you’re good to go!",
    "list-name": "List name:",
    "list-name-example": "e.g \"Best lunch spots\", \"Mall spots\"",
    "create-list": "Create list",
    "already-exist": "list already exists!",
    "valid-list": "Enter valid list name"
  },
  "fr": {
    "create-new-list": "Créez une nouvelle liste",
    "sub-title": "Listes sont la mailleure façon de garder vos offres préférées vien organisées. Tout ce que vous avez à faire est de choisir un nom et vous avez terminé!",
    "list-name": "Nom de la liste:",
    "list-name-example": "e.g \"Favoris du déjeuner\", \"Incontournables de la mode\"",
    "create-list": "Créez la liste",
    "already-exist": "liste existe déjà!",
    "valid-list": "Enter valid list name"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/CreateListModal.vue
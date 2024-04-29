<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">
    <div class="login-container">
      <h1>{{ $t('title') }}</h1>
      <p>{{ $t('description') }}</p>

      <router-link
        v-if="loggedIn && !validMemberWithCard"
        to="/purchase"
        tag="button"
        class="spc-button-v2"
        @click.native="$emit('close')"
        >{{ $t('purchase') }}</router-link>
        <router-link
        v-if="loggedIn && !validMemberWithCard"
        to="/register"
        tag="a"
        :title="$t('register_description')"
        @click.native="$emit('close')"
      >{{ $t('register_link') }}</router-link>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    isFreeTrial: {
      type: Boolean,
      required: true,
      default: true
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
    showFreeTrial () {
      return this.isFreeTrial
    },
    registerOrBuyCard () {
      return !this.card.card_number && this.loggedIn
    }
  },
  methods: {
    ...mapActions('modals', [
      'promptClosed',
      'openModal',
      'closeModal'
    ]),
    ...mapActions([
      'loadRegistration'
    ]),
    close () {
      this.$emit('close')
    },
    showCongratsModal () {
      if (!this.loggedIn) {
        this.closeModal(MODAL_TYPES.CREATE_ACCOUNT_MODAL)
        this.$router.push('/Signup')
      } else {
        this.closeModal(MODAL_TYPES.LOGIN_PROMPT)
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/CreateAccountLoginModal'
</style>

<i18n>
{
  "en": {
    "login": "Log In",
    "purchase": "Buy SPC",
    "register": "Activate SPC",
    "free_trial": "JOIN NOW",
    "title": "The membership made just for students.",
    "description": "SPC members get access to 450+ deals all year long!",
    "login_description": "Log-In to get access to all the deals!",
    "register_description": "Register your SPC membership - be sure to have your 16 digit SPC # ready!",
    "register_link": "Have your membership number? Activate now"
  },
  "fr": {
    "login": "Connexion",
    "purchase": "Achetez SPC",
    "register": "Activez SPC",
    "free_trial": "REJOIGNEZ MAINTENANT",
    "title": "Le programme conçu uniquement pour les étudiants.",
    "description": "Les membres SPC accèdent plus de 450 rabais toute l’année!",
    "login_description": "Log-In to get access to all the deals!",
    "register_description": "Register your SPC membership - be sure to have your 16 digit SPC # ready!",
    "register_link": "Avez-vous votre numéro de membre? Activer maintenant"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/CreateAccountLoginModal.vue
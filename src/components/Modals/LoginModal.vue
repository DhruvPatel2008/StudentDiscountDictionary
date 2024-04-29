<template>
  <Modal :show="show" @close="closeLoginModal()" :inverted="false" :closeButton="loggedIn || showCloseBtn">
    <div class="login-container">
      <div>
        <h1>{{ $t('title') }}</h1>
      </div>

      <div class="join-or-login-btn">
        <router-link
          v-if="!loggedIn"
          to="/signup"
          tag="button"
          class="spc-button-v2 purple"
          @click.native="$emit('close')"
        >{{ $t('create_account') }}</router-link>
        <router-link
          v-if="!loggedIn"
          to="/login"
          tag="button"
          class="spc-button-v2 secondary"
          :title="$t('login_description')"
          @click.native="$emit('close')"
        >{{ $t('login') }}</router-link>

      <!-- although it is called login modal. but it actually has a lot of options that are available only after login .. -->
        <button
          v-if="loggedIn && showFreeTrial && !validMemberWithCard"
          class="spc-button-v2"
          :title="$t('login_description')"
          @click="startFreeTrial()"
          :disabled="activating"
        >{{ $t('free_trial')}}</button>
        <LineLoader v-if="activating" :inverted="true"/>
        <router-link
          v-if="loggedIn && !validMemberWithCard && !showFreeTrial"
          to="/purchase"
          tag="button"
          class="spc-button-v2 purple"
          @click.native="$emit('close')"
        >{{ $t('purchase') }}</router-link>
        <p v-if="loggedIn && !validMemberWithCard">{{ $t('already_member')}}</p>
        <router-link
          class="register-link"
          v-if="loggedIn && !validMemberWithCard"
          to="/register"
          tag="a"
          :title="$t('register_description')"
          @click.native="$emit('close')"
          :disabled="activating"
        >{{ $t('registerLink') }}</router-link>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { ACTIONS } from '@/service/analytics-service'
import { getFreeTrialCard } from '@/service/payment-service'
import { refreshStore } from '@/service/user-service'
import LineLoader from '@/components/Utility/LineLoader'

export default {
  components: {
    Modal,
    LineLoader
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    isFreeTrial: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      activating: false
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'validMemberWithCard'
    ]),
    ...mapGetters('modals', [
      'showCloseBtn'
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
    closeLoginModal () {
      if (this.loggedIn || this.showCloseBtn) {
        this.$emit('close')
      }
      this.hideCloseBtn()
    },
    ...mapActions([
      'loadRegistration',
      'loadCards'
    ]),
    ...mapActions('modals', [
      'promptClosed',
      'openModal',
      'hideCloseBtn',
      'closeModal'
    ]),
    close () {
      this.$emit('close')
    },
    async startFreeTrial () {
      this.activating = true
      try {
        const freeCard = await getFreeTrialCard()
        const cardType = 'SPC'
        const isFreeTrialRegistration = true
        const card = {
          card_number: freeCard.data.card.number,
          csv: freeCard.data.card.csv
        }
        const retailer = freeCard.data.card.retailer
        this.closeModal(MODAL_TYPES.LOGIN_PROMPT)

        await this.loadRegistration()
        await this.loadCards()
        refreshStore()

        this.openModal(MODAL_TYPES.REGISTER_SUCCESSFUL)

        ACTIONS.COMPLETE_FREE_TRIAL_REGISTRATION()
        ACTIONS.COMPLETE_REGISTRATION(card.card_number, cardType, isFreeTrialRegistration, retailer)
      } catch (error) {
        console.log('startFreeTrial error is', error)
      } finally {
        this.activating = false
      }
    }
  },
  watch: {
    isFreeTrial (newVal) {
      this.isFreeTrial = newVal
    }
  },
  updated () {
    this.isFreeTrial && this.show ? ACTIONS.VIEW_FREE_TRIAL_MEMBERSHIP_GATE() : null // eslint-disable-line
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/LoginModal'
</style>

<i18n>
{
  "en": {
    "login": "Log In",
    "purchase": "BECOME A MEMBER",
    "register": "ACTIVATE SPC",
    "free_trial": "START FREE TRIAL",
    "title": "This content is accessible to SPC Members only",
    "description": "Become a SPC member to redeem this offer + MORE!",
    "title_loggedin_user": "The membership made just for students.",
    "description_loggedin_user": "SPC members get access to 450+ deals all year long!",
    "login_description": "Log-In to get access to all the deals!",
    "register_description": "Register your SPC membership - be sure to have your 16 digit SPC # ready!",
    "create_account": "JOIN SPC",
    "registerLink": "ACTIVATE NOW",
    "already_member": "Already have a membership?"
  },
  "fr": {
    "login": "CONNECTEZ-VOUS",
    "purchase": "DEVENEZ MEMBRE",
    "register": "Activez SPC",
    "free_trial": "COMMENCEZ L'ESSAI GRATUIT",
    "title": "Seuls les membres SPC peuvent voir ce contenu.",
    "description": "Devenez membre SPC pour profiter de cette offre + PLUS!",
    "title_loggedin_user": "Le programme conçu uniquement pour les étudiants.",
    "description_loggedin_user": "Les membres SPC accèdent plus de 450 rabais toute l’année!",
    "login_description": "Connectez-vous pour accéder à toutes les offres!",
    "register_description": "Enregistrez votre adhésion SPC - assurez-vous d'avoir votre numéro SPC à 16 chiffres prêt!",
    "create_account": "REJOIGNEZ SPC",
    "registerLink": "ACTIVEZ MAINTENANT",
    "already_member": "Avez-vous déjà acheté SPC?"

  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/LoginModal.vue
<template>
  <Modal :show="show" @close="$emit('close')" :inverted="true">
    <div class="login-container">
      <img class="banner-image free-trial-image" v-lazy="require('@/assets/images/modals/welcome-back-image.png')"/>

      <h1 class="header slider">{{ $t('title') }}</h1>
      <p class="description slider">{{ $t('description') }}</p>

      <button
        to="/deals"
        tag="button"
        class="spc-button-v2 small slider"
        @click="startFreeTrial()"
        :disabled="activating"
        >{{ $t('learn_more') }}</button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modals/RedeemBaseModal'
import { getFreeTrialCard } from '@/service/payment-service'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { ACTIONS } from '@/service/analytics-service'
import { refreshStore } from '@/service/user-service'

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
      activating: false
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn'
    ]),
    ...mapGetters('registration', [
      'card'
    ])
  },
  methods: {
    ...mapActions([
      'loadRegistration',
      'loadCards'
    ]),
    ...mapActions('registration', [
      'updateCard'
    ]),
    ...mapActions('modals', [
      'closeModal',
      'openModal'
    ]),
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
        await this.loadRegistration()
        await this.loadCards()
        refreshStore()
        this.openModal(MODAL_TYPES.REGISTER_SUCCESSFUL)

        ACTIONS.COMPLETE_FREE_TRIAL_REGISTRATION()
        ACTIONS.COMPLETE_REGISTRATION(card.card_number, cardType, isFreeTrialRegistration, retailer)
        this.openModal(MODAL_TYPES.REGISTER_SUCCESSFUL)
      } catch (error) {
        console.log('startFreeTrial error is', error)
      } finally {
        this.activating = false
      }
    }
  },
  updated () {
    this.show ? ACTIONS.BEGIN_FREE_TRIAL_REGISTRATION() : null // eslint-disable-line
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/FreeTrialRedeemModal'
</style>

<i18n>
{
  "en": {
    "learn_more": "Activate Your Membership",
    "title": "Congratulations !",
    "description": "You're almost there to set up your FREE SPC membership."
  },
  "fr": {
    "learn_more": "View SPC+ Deal",
    "title": "Activez votre adhésion",
    "description": "Vous êtes sur le point de configurer votre adhésion gratuite SPC."
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/FreeTrialRedeemModal.vue
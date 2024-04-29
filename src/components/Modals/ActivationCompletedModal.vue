<template>
  <Modal
    :show="show"
    @close="onClose"
    :inverted="false"
    :closeButton="closeButton"
    optimumWidth="650px"
    :newMobileDesign="newMobileDesign"
    :restrictToCloseBtn="restrictToCloseBtn"
  >
    <div class="modal-container">
      <div v-if="schoolPortalFlow || toggle" class="all-set">{{ $t('all_set') }}</div>
      <div v-else class="all-set">{{ $t('one_time_offer') }}</div>

      <div v-if="schoolPortalFlow || toggle">
        <span v-if="language==='en'" id="benefits-available-en">{{ $t('benefits_available') }}</span>
        <span v-else id="benefits-available-fr">{{ $t('benefits_available') }}</span>
      </div>
      <div v-else>
        <span id="benefits-available-fr" class="want-discount">{{ $t('want-discount', {offer: incentive.promo_code_name}) }}</span>
      </div>

      <div v-if="schoolPortalFlow || toggle" class="note-container" :class="{toggleNote: toggle}">
        <div class="note">{{ $t('note') }}</div>
        <div v-if="schoolPortalFlow" class="renew-school-portal">{{ $t('renew_school_portal') }} <span>{{ expiryDate }}</span></div>
        <div v-else-if="toggle">
          <div class="renew-school-portal">{{ $t('auto_renew_subscription') }} <span>{{ expiryDate }}</span></div>
          <div class="renew-school-portal visit-profile"><a href="/billing" >{{ $t('visit_profile') }} </a></div>
          <div class="renew-school-portal toggle-download-app" :class="{frToggleDownloadApp: language === 'fr'}">{{ $t('toggle_download_app') }}</div>
        </div>
      </div>
      <div v-else class="modal-body">
        <p class="turn-on-subscription">{{ $t('turn_on_subscription', {discountAmount}) }}</p>
      </div>

      <div>
        <button v-if="!schoolPortalFlow && !toggle" class="spc-button-v2 purple" @click="handleSubscribe" :class="{ 'mobile-subscribe': validateDeviceWidth('Mobile', screenWidth) }">{{ $t('subscribe_now') }}</button>

        <div v-if="!schoolPortalFlow && !toggle" class="click-below-start-saving">
          <p>{{$t('click_here_start_saving')}}</p>
          <span class="start-saving">
            {{ $t('no_thanks') }}
            <a @click="onClose(userCloseModal=false)">{{ $t('spc_discount') }}</a>
          </span>
        </div>

        <button v-if="schoolPortalFlow || toggle" class="spc-button-v2 purple" @click="onClose(userCloseModal=false)">{{ $t('start_saving') }}</button>
      </div>

      <div  v-if="schoolPortalFlow || toggle" class="download-app-container">
        <div v-if="!toggle" class="download-copy">{{ $t('download_app') }}</div>
        <div class="badges-container" :class="{makeCenter: toggle}">
          <Badges />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modals/Modal'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import Badges from '@/components/Badges'
import { PAGE_NAMES } from '@/router'
import { isEasyPromoFlow } from '@/service/storage'
import { validateDeviceWidth } from '@/utils'
import { isSchoolPortalFlow } from '@/service/school-service'
import { ACTIONS } from '@/service/analytics-service'
import { postActivationPayment } from '@/service/payment-service'
import { price } from '@/assets/data/spc_membership_price.json'

export default {
  components: {
    Modal,
    Badges
  },
  data () {
    return {
      MODAL_TYPES,
      closeButton: !this.isEasyPromoFlow() && (isSchoolPortalFlow() || this.toggle),
      screenWidth: window.innerWidth,
      newMobileDesign: true,
      schoolPortalFlow: isSchoolPortalFlow(),
      triggerTrackerEvent: true,
      price
    }
  },
  computed: {
    ...mapGetters([
      'cards',
      'language'
    ]),
    discountAmount () {
      const amount = this.price - this.incentive.discount
      return amount.toFixed(2)
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    incentive: {
      type: Object,
      default: () => ({})
    },
    toggle: {
      type: Boolean,
      default: false
    },
    restrictToCloseBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isEasyPromoFlow,
    validateDeviceWidth,
    ...mapActions('modals', [
      'closeModal',
      'openModal'
    ]),
    onClose (userCloseModal = true) {
      if (!this.toggle) {
        ACTIONS.INCENTIVE_DENIED()
        let isActivationFlow = {}
        isActivationFlow.send_subscription = true
        isActivationFlow.send_welcome = true
        isActivationFlow.dont_proceed_checkout = true
        postActivationPayment(null, null, isActivationFlow)
      }
      if (userCloseModal === false) {
        if (this.schoolPortalFlow) {
          ACTIONS.SCHOOL_PORTAL_CLICK_START_SAVING()
        } else {
          ACTIONS.CLICK_START_SAVING()
        }
      }
      if (this.isEasyPromoFlow()) {
        this.$router.push({
          name: PAGE_NAMES.EASY_PROMO
        })
      } else {
        this.$router.push({
          name: PAGE_NAMES.DEALS
        })
      }
      this.closeModal(MODAL_TYPES.ACTIVATION_COMPLETED)
    },
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    handleSubscribe () {
      this.closeModal(MODAL_TYPES.ACTIVATION_COMPLETED)
      this.openModal(MODAL_TYPES.INCENTIVE_PAYMENT_MODAL)
    }
  },
  watch: {
    show: {
      handler (value) {
        // call tracker func only for first time, showing not creating component and
        //  only when incentive offer is shown
        if (value && !this.toggle && this.triggerTrackerEvent && Object.keys(this.incentive).length) {
          ACTIONS.INCENTIVE_SHOWN(this.incentive.promo_code_name)
          this.triggerTrackerEvent = false
        }
      }
    }
  },
  created () {
    window.addEventListener('resize', this.updateScreenWidth)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/ActivationCompletedModal'
</style>

<i18n>
{
  "en": {
    "all_set": "You're All Set!",
    "one_time_offer": "ONE TIME ONLY OFFER!",
    "benefits_available": "Your SPC membership benefits are now available!",
    "note": "Note",
    "renew": "Membership valid until ",
    "renew_school_portal": "Your membership does not renew automatically and it will expire on:",
    "turn_on_subscription": "Pre-pay ${discountAmount} now & your membership will be valid for 24 months, instead of 12!",
    "click_below_subscribe": "Click below to turn on a subscription and pay for your next full year of SPC at this discounted rate now!",
    "subscribe_now": "TURN ON",
    "click_here_start_saving": "Don't want to do this now, you will need to pay $11.99 next year.",
    "no_thanks": "No thanks, take me to ",
    "spc_discount": "SPC DISCOUNTS",
    "start_saving": "start saving",
    "download_app": "To get the most out of your SPC experience, please download the SPC app! Happy saving",
    "auto_renew_subscription": "Your membership will automatically renew on: ",
    "visit_profile": "View or edit subscription",
    "toggle_download_app": "Download the SPC app to redeem in-store offers and never miss a deal!",
    "want-discount": "Get {offer} Off"
  },
  "fr": {
    "all_set": "Vous le faites!",
    "one_time_offer": "OFFRE UNIQUE!",
    "benefits_available": "Vos avantages d’adhésion sont disponibles maintenant!",
    "note": "Note",
    "renew": "Adhésion valide jusqu’au ",
    "renew_school_portal": "Votre adhésion n'est pas renouvelée automatiquement et expirera le:",
    "turn_on_subscription": "Prépayez-${discountAmount} maintenant et votre abonnement sera valide pour 24 mois, au lieu de 12!",
    "click_below_subscribe": "Cliquez ci-dessous pour activer votre abonnement et payer votre prochaine année complète avec SPC à tarif réduit dès maintenant !",
    "subscribe_now": "ACTIVER",
    "click_here_start_saving": "Si vous ne souhaitez pas le faire maintenant, vous devrez payer 11,99 $ l'année prochaine.",
    "no_thanks": "Non merci, emmenez-moi aux ",
    "spc_discount": "RABAIS SPC",
    "start_saving": "commencer à économiser",
    "download_app": "Afin de profitez au maximum de votre expérience SPC, veuillez télécharger l'application SPC! Bonne économies",
    "auto_renew_subscription": "Votre adhésion sera renouvelée automatiquement le: ",
    "visit_profile": "Afficher ou modifier l'abonnement",
    "toggle_download_app": "Téléchargez l'application SPC pour échanger les offres en magasin et ne jamais manquer une aubaine!",
    "want-discount": "Obtenez {offer} de rabais"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/ActivationCompletedModal.vue
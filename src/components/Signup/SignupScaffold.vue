<template>
  <SPCPage :displayOverride="'flex'">
    <SPCPageCardInsert class="container-color" :isCIBC="isCIBCRegistrationFlow" :mobileView="isMobile">
      <div slot="pre">
        <Banner v-if="!isCIBCRegistrationFlow" name="create_account" :clickable="true"></Banner>
        <img
          v-if="steps.createAccount && LPDiscount && !isCIBCRegistrationFlow && language === english"
          :src="require(`@/assets/images/signup/en-${isMobile ? 'mobile' : 'desktop'}-discount-banner-${LPDiscount}.png`)"
          alt="Join now discount banner"
          class="join-now-discount-banner">
        <RotatingLogoCarousel :isLogoClickable="false" v-if="shouldShowRoratingLogos" :logoList="logoList"></RotatingLogoCarousel>
      </div>
      <div slot="before" class="spc-center form-container extended-form-container-width">
        <div v-if="isCIBCRegistrationFlow" class="cibc-title">
          <div class="logos">
            <img class="cibc-logo" v-lazy="require('@/assets/images/cibc/1484/spccibc.png')" >
          </div>
          <div class="title-text"><span>{{ $t('spc_cibc.title_1') }}</span><span :class="{ highlighted: language === english }">{{ $t('spc_cibc.title_2') }}</span><span :class="{ highlighted: language === french }">{{ $t('spc_cibc.title_3') }}</span></div>
          <div class="sub-title">{{ $t('spc_cibc.sub_title') }}</div>
        </div>
        <div v-else>
          <div v-if="!validateDeviceWidth('Mobile', screenWidth)">
            <h2 class="title">{{ $t(`in_store_flow.${signupTracker}.title`) }}</h2>
            <p class="description">{{ $t(`in_store_flow.${signupTracker}.description`, {price: membershipPrice}) }}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="container" :class="{ 'cibc-steps': isCIBCRegistrationFlow }">
          <div v-if="inStoreFlow && !isCIBCRegistrationFlow">
            <SignupSteps class="instoreStyle" :step="signupTracker"/>
            <div v-if="validateDeviceWidth('Mobile', screenWidth)" class="mobile-view">
              <h2 class="title">{{ $t(`in_store_flow.${signupTracker}.title`) }}</h2>
              <p class="description">{{ $t(`in_store_flow.${signupTracker}.description`, {price: membershipPrice}) }}</p>
            </div>
          </div>
          <!-- Used to see our current step in account creation -->
          <div class="steps-view" v-else>
            <!-- first step -->
            <div class="create-account">
              <button class="spc-plus-step-1" :class="{'spc-plus-step-1-active': steps.createAccount}" v-if="isCIBCRegistrationFlow">
                <span v-if="steps.personalInfo || steps.additional">1</span>
                <span v-else class="spc-plus-step-1-text">1</span>
              </button>
              <button v-else>1</button>
              <p :class="{'steps-view-fr': language === french}">{{ $t('create_account.step1') }}</p>
            </div>

            <div v-if="isCIBCRegistrationFlow" class="bridge" :class="{'spc-plus-bridge-1-active': steps.personalInfo || steps.additional}"></div>
            <div v-else class="bridge" :class="{'bridge-1-active': steps.personalInfo || steps.payment}"></div>

            <!-- second step -->
            <div class="personal-info">
              <button v-if="isCIBCRegistrationFlow" :class="{'spc-plus-personal-info-btn-active': steps.personalInfo || steps.additional}">2</button>
              <button v-else :class="{'personal-info-btn-active': steps.personalInfo || steps.payment}">2</button>
              <p :class="{'steps-view-fr': language === french}">{{ $t('create_account.step2') }}</p>
            </div>

            <div v-if="isCIBCRegistrationFlow" class="bridge" :class="{'spc-plus-bridge-2-active': steps.additional}"></div>
            <div v-else class="bridge" :class="{'bridge-2-active': steps.payment}"></div>

            <!-- third step -->
            <div v-if="isCIBCRegistrationFlow" class="additional">
              <button :class="{'spc-plus-additional-btn-active': steps.additional}">3</button>
              <p :class="{'steps-view-fr': language === french}">{{ $t('create_account.spc-plus-step3') }}</p>
            </div>
            <div v-else class="payment">
              <button :class="{'payment-btn-active': steps.payment}">3</button>
              <p :class="{'steps-view-fr': language === french}">{{ $t('create_account.step3') }}</p>
            </div>
          </div>
        </div>

        <div class="content">
          <slot></slot>
        </div>
      </div>
    </SPCPageCardInsert>
  </SPCPage>
</template>

<script>
import SPCPage from '@/components/SPCPage'
import SignupSteps from '@/components/Common/SignupSteps'
import { mapGetters } from 'vuex'
import SPCPageCardInsert from '@/components/SPCPageCardInsert'
import Banner from '@/components/Common/Banner'
import { isCIBCRegistration } from '@/service/seabiscuit-service'
import { PAGE_NAMES } from '@/router'
import RotatingLogoCarousel from '@/components/Common/RotatingLogoCarousel'
import { logoList } from '@/models/partner'
import { getLPVariables, getLPVariable } from '@/service/analytics-service'
import { validateDeviceWidth } from '@/utils'
import membership from 'Assets/data/spc_membership_price'

export default {
  metaInfo () {
    return {
      title: this.language === 'en' ? 'Join SPC' : 'Rejoignez SPC'
    }
  },
  props: {
    inStoreFlow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SPCPage,
    SPCPageCardInsert,
    Banner,
    RotatingLogoCarousel,
    SignupSteps
  },
  data () {
    return {
      steps: {
        createAccount: true,
        personalInfo: false,
        payment: false,
        additional: false
      },
      logoList,
      screenWidth: window.innerWidth,
      membershipPrice: membership.price,
      LPDiscount: null
    }
  },
  computed: {
    isMobile () {
      return this.validateDeviceWidth('Mobile', this.screenWidth)
    },
    ...mapGetters([
      'language',
      'french',
      'english'
    ]),
    shouldShowRoratingLogos () {
      return getLPVariables('ShowOnboardingLogos')
    },
    isCIBCRegistrationFlow () {
      return this.isCIBCRegistration()
    },
    signupTracker () {
      if (this.$route.name === PAGE_NAMES.SIGNUP_ACCOUNT_CREATION) {
        return 1
      } else {
        return this.$route.name === PAGE_NAMES.SIGNUP_PERSONAL_INFO ? 2 : 3
      }
    }
  },
  methods: {
    validateDeviceWidth,
    isCIBCRegistration,
    getLPVariables,
    createAccount () {
      this.steps.createAccount = true
      this.steps.personalInfo = false
      this.steps.payment = false
      this.steps.additional = false
    },
    personalInfo () {
      this.steps.createAccount = false
      this.steps.personalInfo = true
      this.steps.payment = false
      this.steps.additional = false
    },
    payment () {
      this.steps.createAccount = false
      this.steps.personalInfo = false
      this.steps.payment = true
      this.steps.additional = false
    },
    additional () {
      this.steps.createAccount = false
      this.steps.personalInfo = false
      this.steps.payment = false
      this.steps.additional = true
    },
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    }
  },
  async created () {
    const LPVariable = await getLPVariable('JoinNowDiscount')
    const validDiscounts = ['10', '15', '20']
    this.LPDiscount = validDiscounts.includes(LPVariable) ? LPVariable : null

    window.addEventListener('resize', this.updateScreenWidth)
    switch (this.$route.name) {
      case PAGE_NAMES.SIGNUP_ACCOUNT_CREATION: this.createAccount(); break
      case PAGE_NAMES.SIGNUP_PERSONAL_INFO: this.personalInfo(); break
      case PAGE_NAMES.SIGNUP_PAYMENT_PURCHASE: this.payment(); break
      case PAGE_NAMES.SIGNUP_PAYMENT_ACTIVATE: this.payment(); break
      case PAGE_NAMES.SIGNUP_ADDITIONAL_QUESTIONS: this.additional(); break
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Signup/SignupScaffold'
</style>

<i18n>
{
  "en": {
    "in_store_flow": {
      "1": {
        "title": "Create your SPC account",
        "description": "To start redeeming membership benefits, please create an SPC account!"
      },
      "2": {
        "title": "Personal Info",
        "description": "Help us personalize your experience!"
      },
      "3": {
        "title": "Payment",
        "description": "Year long savings are only ${price} away!"
      }
    },
    "create_account": {
      "title": "JOIN SPC",
      "step1": "Create Account",
      "step2": "Personal Info",
      "step3": "Payment/Activation",
      "spc-plus-step3": "Additional Questions"
    },
    "spc_cibc": {
      "title_1": "Activate your ",
      "title_2": "SPC+ ",
      "title_3": "membership!",
      "sub_title": "Your free digital membership is just a few clicks away!"
    }
  },
  "fr": {
    "in_store_flow": {
      "1": {
        "title": "Créez Votre Compte SPC",
        "description": "Afin de commencer à bénéficier des avantages de l'adhésion, veuillez créer un compte SPC!"
      },
      "2": {
        "title": "Informations Personnelles",
        "description": "Aidez-nous à personnaliser votre expérience!"
      },
      "3": {
        "title": "Paiement",
        "description": "{price} $ pour une année d'économies!"
      }
    },
    "create_account": {
      "title": "REJOIGNEZ SPC",
      "step1": "Créer un compte",
      "step2": "Informations personnelles",
      "step3": "Paiement/Activation",
      "spc-plus-step3": "Questions supplémentaires"
    },
    "spc_cibc": {
      "title_1": "Activez votre ",
      "title_2": "adhésion ",
      "title_3": "SPC+!",
      "sub_title": "Votre adhésion numérique gratuite n'est qu'à quelques clics !"
    }
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Signup/SignupScaffold.vue
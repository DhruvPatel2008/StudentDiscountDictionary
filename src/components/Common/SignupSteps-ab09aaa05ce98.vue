<template>
  <div class="signup-steps">
    <div>
      <div class="step-number-container">
        <img v-if="step === 1" :src="require(`@/assets/images/icons/general/signup-step-1-black.png`)" alt="Step 1 active" class="step-number-1">
        <img v-else :src="require(`@/assets/images/icons/general/category-check-default.svg`)" alt="Completed step 1" class="completed-step">
      </div>
      <div class="step-text">
        <span v-if="activation">{{ $t('activate') }}</span>
        <span v-else>{{ $t('create_account') }}</span>
      </div>
    </div>

    <img :src="require(`@/assets/images/why-spc/arrow-top.svg`)" alt="Arrow right" class="step-arrow arrow-1">

    <div>
      <div class="step-number-container">
        <img v-if="step === 2" :src="require(`@/assets/images/icons/general/signup-step-2-black.png`)" alt="Step 2 active" class="step-number-2">
        <img v-else-if="step > 2" :src="require(`@/assets/images/icons/general/category-check-default.svg`)" alt="Completed step 2" class="completed-step">
        <img v-else :src="require(`@/assets/images/icons/general/signup-step-2-grey.png`)" alt="Step 2 inactive" class="step-number-2">
      </div>
      <div class="step-text" :class="{grey: step < 2}">
        <span v-if="activation">{{ $t('create_account') }}</span>
        <span v-else>{{ $t('personal_info') }}</span>
      </div>
    </div>

    <img :src="require(`@/assets/images/why-spc/arrow-bottom.svg`)" alt="Arrow right" class="step-arrow arrow-2">

    <div>
      <div class="step-number-container">
        <img v-if="step === 3" :src="require(`@/assets/images/icons/general/signup-step-3-black.png`)" alt="Step 3" class="step-number-3">
        <img v-else-if="step > 3" :src="require(`@/assets/images/icons/general/category-check-default.svg`)" alt="Completed step 2" class="completed-step">
        <img v-else :src="require(`@/assets/images/icons/general/signup-step-3-grey.png`)" alt="Step 3" class="step-number-3">
      </div>
      <div class="step-text" :class="{grey: step < 3}">
        <span v-if="activation">{{ $t('personal_info') }}</span>
        <span v-else>{{ $t('payment') }}</span>
      </div>
    </div>

    <img v-if="activation && !schoolPortalFlow" :src="require(`@/assets/images/why-spc/arrow-top.svg`)" alt="Arrow right" class="step-arrow arrow-1">

    <div v-if="activation && !schoolPortalFlow">
      <div class="step-number-container">
        <img v-if="step === 4" :src="require(`@/assets/images/icons/general/signup-step-4-black.png`)" alt="Step 4" class="step-number-4">
        <img v-else-if="step > 4" :src="require(`@/assets/images/icons/general/category-check-default.svg`)" alt="Completed step 2" class="completed-step">
        <img v-else :src="require(`@/assets/images/icons/general/signup-step-4-grey.png`)" alt="Step 4" class="step-number-4">
      </div>
      <div class="step-text" :class="{grey: step < 4 }">
        <span v-if="activation">{{ $t('subscription') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isSchoolPortalFlow
} from '@/service/school-service'

export default {
  props: {
    activation: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      schoolPortalFlow: isSchoolPortalFlow()
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/components/Common/SignupSteps'
</style>

<i18n>
{
  "en": {
    "create_account": "Create Account",
    "personal_info": "Personal Info",
    "payment": "Payment",
    "activate": "Activate",
    "subscription": "Auto Renew"
  },
  "fr": {
    "create_account": "Créer un compte",
    "personal_info": "Info personnelles",
    "payment": "Paiement",
    "activate": "Activer",
    "subscription": "Renouveler automatiquement"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Common/SignupSteps.vue
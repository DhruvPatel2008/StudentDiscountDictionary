<template>
  <div class="spc-form-field-v2-edge lowercase" :class="{ error: dirty && !isEmailValid}">
    <label for="email" :class="{ emailLabel: inStoreFlow && !isCIBCRegistration() }">{{ $t('email') }}</label>
    <input
      type="email"
      name="email"
      v-model.trim="emailValue"
      autocomplete="email"
      @blur="updateEmailValue()"
      :disabled = "isSchoolPortalFlow()"
      :class="{ emailInput: inStoreFlow }"
      />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { isCIBCRegistration } from '@/service/seabiscuit-service'
import {
  isSchoolPortalFlow,
  getSchoolPortalDetails
} from '@/service/school-service'

export default {
  props: {
    dirty: {
      isValid: Boolean,
      default: false
    },
    inStoreFlow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      emailValue: null
    }
  },
  computed: {
    ...mapGetters('accountCreation', [
      'emailField',
      'isEmailValid'
    ])
  },
  methods: {
    ...mapActions('accountCreation', [
      'updateEmail'
    ]),
    updateEmailValue () {
      this.updateEmail(this.emailValue)
    },
    isCIBCRegistration,
    isSchoolPortalFlow
  },
  mounted () {
    if (isSchoolPortalFlow()) {
      this.emailValue = getSchoolPortalDetails()['school_email']
      this.updateEmail(this.emailValue)
    } else {
      this.emailValue = this.emailField
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Signup/ReusableComponents/EmailField'
</style>

<i18n>
{
  "en": {
    "email": "Email Address"
  },
  "fr": {
    "email": "Email"
  }
}
</i18n>




// WEBPACK FOOTER //
// src/components/Signup/ReusableComponents/EmailField.vue
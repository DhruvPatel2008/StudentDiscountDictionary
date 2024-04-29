<template>
  <div id = "dob" class="spc-form-field-v2-edge"  :class="{ error: dirty && !aboveAgeLimit}">
    <div class="label-section">
      <label for="birthday" :class="{ birthdayLabel: inStoreFlow && !isCIBCRegistration()}">{{ $t('birthday') }}</label>
      <QuestionMark v-if="questionMark" />
      <span v-else class="age-restriction" :class="{ 'error-label': dirty && !aboveAgeLimit }">{{ $t('age_restriction') }}</span>
    </div>
    <input v-if="isMobileView" class="mobile-date-picker" type="date" placeholder="YYYY-MM-DD" v-model="birthdateValue" />
    <birthday-select
      v-else
      v-model.number="birthdateValue"
      :startDate="startBirthdate"
      :class="{ dateInput: inStoreFlow }"
      />
    <div v-if="dirty && !aboveAgeLimit && !inStoreFlow" class="error-label">{{ $t('errors.age_limit') }}</div>
  </div>
</template>
<script>
import BirthdaySelect from '@/components/Utility/BirthdaySelect'
import QuestionMark from '@/components/Signup/ReusableComponents/QuestionMark'
import { AGE_RESTRICTION_MIN } from '@/models/profile'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { isCIBCRegistration } from '@/service/seabiscuit-service'
import { validateDeviceWidth, dateToUnixLocale } from '@/utils'

export default {
  props: {
    dirty: {
      isValid: Boolean,
      default: false
    },
    questionMark: {
      type: Boolean,
      default: true
    },
    inStoreFlow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BirthdaySelect,
    QuestionMark
  },
  data () {
    return {
      birthdateValue: null,
      startBirthdate: moment().subtract(AGE_RESTRICTION_MIN + 3, 'years').toDate(),
      AGE_RESTRICTION_MIN,
      screenWidth: window.innerWidth
    }
  },
  watch: {
    birthdateValue: {
      handler (value) {
        if (this.isMobileView) {
          value = dateToUnixLocale(new Date(value))
        }
        this.updateBirthday(value)
      }
    }
  },
  computed: {
    ...mapGetters('accountCreation', [
      'birthdate',
      'aboveAgeLimit'
    ]),
    isMobileView () {
      return this.validateDeviceWidth('Mobile', this.screenWidth)
    }
  },
  methods: {
    ...mapActions('accountCreation', [
      'updateBirthday'
    ]),
    isCIBCRegistration,
    validateDeviceWidth,
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    }
  },
  mounted () {
    this.birthdateValue = this.birthdate
    window.addEventListener('resize', this.updateScreenWidth)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Signup/ReusableComponents/BirthdateField'
</style>

<i18n src='Assets/i18n/profile'></i18n>
<i18n src='Assets/i18n/actions'></i18n>

<i18n>
{
  "en": {
    "birthday": "Date of Birth",
    "age_restriction": "(must be at least 13 years old)",
    "errors": {
      "age_limit": "You need to be at least 13 years old to join SPC."
    }
  },
  "fr": {
    "birthday": "Date de naissance",
    "age_restriction": "(Devez être âgé de 13 ans)",
    "errors": {
      "age_limit": "Vous devez avoir au moins 13 ans afin de créer un compte SPC."
    }
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Signup/ReusableComponents/BirthdateField.vue
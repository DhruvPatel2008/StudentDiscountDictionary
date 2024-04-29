<template>
  <Modal :show="show" @close="$emit('close')" :contained="true">
    <div class="container">
      <h2 class="details">
        {{ $t('title') }}
      </h2>
      <div v-if="profileValues">
        <div class="form-container">

          <div v-if="showPostalCode" class="spc-form-field-v2-edge" :class="{ error: postalFail}">
            <label class="label-bold" for="postal">{{ $t('labels.postalCode') }}</label>
            <span class="label-normal">{{ $t ('if_incorrect')}}</span>
            <cleave
                v-model.trim="profileValues.postal"
                type="text"
                name="postal"
                :placeholder="postalPlaceholder"
                :maxlength="POSTAL_CODE_MAX_LENGTH"
                :options="postalCleaveOptions"
                autocomplete='postal-code'
                @blur.native="checkIfPostalValid"
              />
          </div>

          <div class="spc-form-field-v2" :class="{ error: dirty && !validator.fields.school_type }">
            <label class="label-bold" for="schoolType">{{ $t('labels.schoolType') }}</label>
            <select v-model="profileValues.school_type" name="schoolType">
              <option :value="null" :disabled="true"></option>
              <option
                v-for="(option, index) in profileOptions.school_types"
                :key="index"
                :value="option"
                >{{ $t(`school_types.${option}`) }}</option>
            </select>
          </div>

          <div class="spc-form-field-v2 international-student">
            <label class="label-bold">{{ $t('labels.international') }}</label>
            <label class="switch">
              <input type="checkbox" v-model="profileValues.international">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="why-we-asking">
            <QuestionMark></QuestionMark>
            <a href="#" class="activate-link" @click="openPopup()">{{ $t('why') }}</a>
          </div>

          <div class="center-align">
            <div class="understood">
              <button
                class="spc-button-v2 purple"
                @click="closePopup()"
                >{{ $t('understood') }}</button>
              <LineLoader v-if="loading" :inverted="true"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import profileOptions from 'LocalizedAssets/data/profile'
import { validProfile } from '@/models/profile'
import { POSTAL_CODE_MAX_LENGTH } from '@/utils'
import { checkPostalValid } from '@/service/register-service'
import { mapGetters, mapActions } from 'vuex'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import QuestionMark from '@/components/Signup/ReusableComponents/QuestionMark'
import LineLoader from '@/components/Utility/LineLoader'
import Modal from '@/components/Modals/Modal'
import Cleave from 'vue-cleave'
import { ACTIONS } from '@/service/analytics-service'

export default {
  components: {
    Cleave,
    QuestionMark,
    LineLoader,
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
      POSTAL_CODE_MAX_LENGTH,
      profileOptions,
      profileValues: {
        gender: null,
        postal: null,
        school_types: null
      },
      dirty: false,
      postalFail: false,
      showPostalCode: null,
      loading: false,
      MODAL_TYPES
    }
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler (value) {
        if (!value) {
          this.closeModal(MODAL_TYPES.ADDITIONAL_QUESTIONS_MODAL)
        }
      }
    },
    show: {
      handler () {
        this.setProfile()
      }
    }
  },
  methods: {
    ...mapActions([
      'updateProfile'
    ]),
    ...mapActions('modals', [
      'openModal',
      'closeModal'
    ]),
    async closePopup () {
      this.dirty = true
      if (this.validator.valid) {
        this.loading = true
        try {
          await this.updateProfile(this.profileValues)
          this.loading = false
          this.closeModal(MODAL_TYPES.ADDITIONAL_QUESTIONS_MODAL)
          ACTIONS.COMPLETE_ADDITIONAL_QUESTIONS()
        } catch (e) {
          console.log(e)
          this.loading = false
        }
      }
    },
    openPopup () {
      this.openModal(MODAL_TYPES.QUERY_MODAL)
    },
    async checkIfPostalValid () {
      const postalCode = this.profileValues.postal
      if (postalCode === null || postalCode === '') {
        this.postalFail = true
        return false
      }
      try {
        const response = await checkPostalValid(this.profileValues.postal)
        const isValid = response.data.is_valid
        if (!isValid) {
          this.postalFail = true
          return false
        }
        this.postalFail = false
        return isValid
      } catch (error) {
        console.log(error)
        return false
      }
    },
    setProfile () {
      // Copy profile object
      this.profileValues = JSON.parse(JSON.stringify(this.profile))
      this.showPostalCode = this.profile ? !this.profile.postal : null
    }
  },
  computed: {
    ...mapGetters([
      'profile',
      'postalPlaceholder',
      'postalCleaveOptions',
      'pageReNavigation'
    ]),
    validator () {
      return validProfile(this.profileValues)
    }
  },
  mounted () {
    this.setProfile()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/AdditionalQuestionsModal'
</style>

<i18n src='Assets/i18n/profile'></i18n>
<i18n src='LocalizedAssets/i18n/profile'></i18n>
<i18n>
{
  "en": {
    "title": "Finish setting up your account!",
    "understood": "CONTINUE",
    "if_incorrect": "(update if incorrect)",
    "why": "Why are we asking this?"
  },
  "fr": {
    "title": "Terminer la configuration de votre compte!",
    "understood": "Continuez",
    "if_incorrect": "(update if incorrect)",
    "why": "Pourquoi demandons-nous ceci?"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/AdditionalQuestionsModal.vue
<template>
  <flat-pickr
    ref="datePickerWrap"
    :value="dateFormatted"
    @input="updateDate"
    :config="config"
    :disabled="disabled"
    :placeholder="placeholder"
    @on-open="$emit('focus', $event)"
    @on-close="$emit('blur', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { unixToDateLocale, dateToUnixLocale } from '@/utils'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/airbnb.css'
import { english as English } from 'flatpickr/dist/l10n/default'
import { French } from 'flatpickr/dist/l10n/fr'

export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      defualt: ''
    },
    minAge: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date,
      default: null
    }
  },
  components: {
    flatPickr
  },
  data () {
    return {
      config: {
        dateFormat: 'Y-m-d H:i',
        altFormat: 'Y-m-d',
        altInput: true,
        defaultHour: 0,
        defaultMinute: 0,
        locale: English,
        maxDate: moment().subtract(this.minAge, 'years').toDate(),
        disableMobile: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    date () {
      return unixToDateLocale(this.value)
    },
    dateFormatted () {
      return this.date ? moment(this.date).format('YYYY-MM-DD HH:mm') : null
    }
  },
  watch: {
    language: {
      immediate: true,
      handler (value) {
        if (value === 'fr') {
          this.config.locale = French
        } else {
          this.config.locale = English
        }
      }
    }
  },
  methods: {
    updateDate (event) {
      const date = moment(event).toDate()
      this.update(date)
    },
    update (date) {
      this.$emit('input', dateToUnixLocale(date))
    },
    clear () {
      this.$emit('input', null)
    }
  },
  mounted () {
    const flatPickrInstance = this.$refs.datePickerWrap.fp
    if (this.startDate != null) flatPickrInstance.jumpToDate(this.startDate)
  }
}
</script>

<style lang="stylus">
@import '~@/assets/components/Utility/BirthdaySelect'
</style>



// WEBPACK FOOTER //
// src/components/Utility/BirthdaySelect.vue
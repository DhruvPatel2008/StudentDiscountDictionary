<template>
  <div>
    <h3 v-bind:class="[{ header_pass : validationObj.valid, header_fail : !validationObj.valid }]">{{ $t(validationObj.header) }}</h3>
    <ul class="li_container">
    <li v-for="(item, index) in validationObj.msgs" :key="item.text+index" v-bind:class="[{ li_symbol_valid : item.status, li_symbol_invalid : !item.status, li_text_invalid : !item.status }, 'li_text']">
      {{ $t(item.text) }}
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    validationObj: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/PasswordValidationRow'
</style>

<i18n src='Assets/i18n/validation'></i18n>




// WEBPACK FOOTER //
// src/components/PasswordValidationRow.vue
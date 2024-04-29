<template>
  <div class="center-content">
    <p class="line"><span class="text-inside"> {{value}} </span></p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: 'or'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Signup/ReusableComponents/HorizontalORLine'
</style>



// WEBPACK FOOTER //
// src/components/Signup/ReusableComponents/HorizontalORLine.vue
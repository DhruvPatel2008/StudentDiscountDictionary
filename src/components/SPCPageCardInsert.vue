<template>
  <div class="card-container">
    <slot name="pre"></slot>
    <div class="card-before-text">
      <slot name="before"></slot>
    </div>
    <div v-if="$slots.default" class="spc-card" :class="{ 'header-black': headerBlack, 'cibc-registration': isCIBC, 'mob': mobileView }" :style="{ borderRadius }">
      <slot></slot>
      <div v-if="shouldShowOverlay" class="overlay" :style="{ borderRadius }"/>
    </div>
    <div class="card-after-text">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerBlack: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: String,
      default: '16px'
    },
    shouldShowOverlay: {
      type: Boolean,
      default: false
    },
    isCIBC: {
      type: Boolean,
      default: false
    },
    mobileView: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/SPCPageCardInsert'
</style>



// WEBPACK FOOTER //
// src/components/SPCPageCardInsert.vue
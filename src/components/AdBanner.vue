<template>
  <div class="background-image" @click="$emit('selected')">
    <img :src="imagePath" :alt="altTag">
    <div class="action-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagePath: {
      type: String,
      required: true
    },
    altTag: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/AdBanner'
</style>



// WEBPACK FOOTER //
// src/components/AdBanner.vue
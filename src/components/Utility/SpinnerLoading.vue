<template>
  <div class="marginated centered">
    <LoadingSpinner/>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Utility/LoadingSpinner'

export default {
  components: {
    LoadingSpinner
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Utility/SpinnerLoading'
</style>



// WEBPACK FOOTER //
// src/components/Utility/SpinnerLoading.vue
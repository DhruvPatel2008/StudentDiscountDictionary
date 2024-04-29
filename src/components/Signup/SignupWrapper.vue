<template>
  <div>
    <SPCPageSimple v-if="fromQRLanding">
      <div class="page-simple-container"><slot></slot></div>
    </SPCPageSimple>

    <SPCPage v-else-if="summary" class="card-container" :displayOverride="'flex'"><slot></slot></SPCPage>
    <SignupScaffold v-else :inStoreFlow="inStoreFlow"><slot></slot></SignupScaffold>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignupScaffold from './SignupScaffold'
import SPCPageSimple from '@/components/SPCPageSimple'
import SPCPage from '@/components/SPCPage'

export default {
  components: {
    SignupScaffold,
    SPCPageSimple,
    SPCPage
  },
  props: {
    summary: {
      type: Boolean,
      required: false
    },
    inStoreFlow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'fromQRLanding'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Signup/SignupWrapper'
</style>



// WEBPACK FOOTER //
// src/components/Signup/SignupWrapper.vue
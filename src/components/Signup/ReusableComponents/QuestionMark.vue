<template>
  <div>
    <img class="question-img" @click="openPopup()" :src="require('@/assets/images/icons/general/question-circle.svg')" alt="why this question">
  </div>
</template>
<script>
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('modals', [
      'openModal'
    ]),
    openPopup () {
      this.openModal(MODAL_TYPES.QUERY_MODAL)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Signup/ReusableComponents/QuestionMark'
</style>



// WEBPACK FOOTER //
// src/components/Signup/ReusableComponents/QuestionMark.vue
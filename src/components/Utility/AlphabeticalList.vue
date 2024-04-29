<template>
  <div class="container"
    :class="{
      'disp-fixed': scrollPosition > topWithMostRedemeed,
      'no-most-redeemed': !isMostRedeemedAvailable && scrollPosition < topWithoutMostRedemeed,
      'no-most-redeemed-fixed': !isMostRedeemedAvailable && scrollPosition > topWithoutMostRedemeed
    }">
    <div>
      <div
        v-for="letter of alphabet"
        @click="selectLetter(letter)"
        @mouseover="selectLetter(letter)"
        :key="letter">
        <div>
          <div v-if="selectedLetter === letter && displaySelectedLetter" class="selected-letter">
            {{selectedLetter}}
          </div>
          <div class="letter-block">
            {{letter}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alphabet: [...'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
      selectedLetter: '',
      displaySelectedLetter: false,
      scrollPosition: 0,
      topWithoutMostRedemeed: 80,
      topWithMostRedemeed: 425,
      isMounted: false
    }
  },
  props: {
    isMostRedeemedAvailable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Selected letter in the alphabet list.
     * @param {String} letter
     */
    selectLetter (letter) {
      this.selectedLetter = letter
      this.displaySelectedLetter = true
      setTimeout(() => {
        this.displaySelectedLetter = false
      }, 1000)
      this.$emit('selectedLetter', letter)
    },
    /**
     * Updated the scrollPosition with the Y co-ordinates.
     */
    updateScroll () {
      this.scrollPosition = window.scrollY
    },
    /**
     * To check the element with the given ID inside the view.
     * @param {String} id
     * @returns {Boolean}
     */
    isElementInViewport (id) {
      let el = document.getElementById(id)
      let top = el.offsetTop
      let left = el.offsetLeft
      let width = el.offsetWidth
      let height = el.offsetHeight

      while (el.offsetParent) {
        el = el.offsetParent
        top += el.offsetTop
        left += el.offsetLeft
      }
      return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight + height) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
      )
    }
  },
  mounted () {
    this.isMounted = true
    window.addEventListener('scroll', this.updateScroll)
  },
  destroy () {
    window.removeEventListener('scroll', this.updateScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Utility/AlphabeticalList'
</style>



// WEBPACK FOOTER //
// src/components/Utility/AlphabeticalList.vue
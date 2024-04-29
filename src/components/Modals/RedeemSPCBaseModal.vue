<template>
  <transition name="modal">
    <div class="modal-mask" @click="close" v-show="show" @keyup.esc="close">
        <div class="modal-container-cibc-outer">
            <div ref="modal" class="modal-container-cibc" :class="{ inverted, fullscreen, contained, purple, noSPCBorder}" @click.stop :style="`width: ${optimumWidth};${backgroundStyle}`">
            <div class="modal-container-inner" :class="{inverted}" :style="`padding: ${containerPadding}`">

                <slot></slot>

            </div>
            <div class="modal-close-special" @click="close">
                <img ref="close"
                    class="modal-close-icon-special"
                    :src="require('@/assets/images/icons/general/close-icon-black.svg')"
                    :alt="$t('close')"
                    tabindex="0">
            </div>

            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    optimumWidth: {
      type: String,
      default: ''
    },
    inverted: {
      type: Boolean,
      default: false
    },
    backgroundStyle: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    contained: {
      type: Boolean,
      default: false
    },
    purple: {
      type: Boolean,
      default: false
    },
    noSPCBorder: {
      type: Boolean,
      default: false
    },
    containerPadding: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      lastFocusedElement: null
    }
  },
  watch: {
    show: {
      immediate: true,
      async handler (value) {
        if (value) {
          this.lastFocusedElement = document.activeElement
          await this.$nextTick()
        } else {
          if (this.lastFocusedElement) {
            this.lastFocusedElement.focus()
          }
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/RedeemSPCBaseModal'
</style>

<i18n>
{
  "en": {
    "close": "close"
  },
  "fr": {
    "close": "fermer"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/RedeemSPCBaseModal.vue
<template>
  <transition name="modal">
    <div class="modal-mask" @click="checkCloseModal" v-show="show" @keyup.esc="checkCloseModal" :class="{ fullscreenSettings}">
        <div ref="modal" class="modal-container" :class="{ inverted, fullscreen, contained, fullscreenSettings, 'activateCompletedMobile': newMobileDesign }" @click.stop :style="`width: ${optimumWidth};${backgroundStyle}, height: ${optimumHeight}`">
          <div class="modal-container-inner" :style="`padding: ${containerPadding}`">
            <slot></slot>
            <div v-if="closeButton" class="modal-close" @click="close">
              <img v-if="isHomepagePopup && mobileScreen"
                ref="close"
                class="modal-close-icon homepage-close"
                :src="require('@/assets/images/icons/general/exit-icon-popup.png')"
                :alt="$t('close')"
                tabindex="0">
              <img v-else
                ref="close"
                class="modal-close-icon"
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
import { mapActions } from 'vuex'
import MODAL_TYPES from '@/store/modules/modals/modal-types'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    optimumWidth: {
      type: String,
      default: ''
    },
    optimumHeight: {
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
    containerPadding: {
      type: String,
      default: '50px 0 0'
    },
    isHomepagePopup: {
      type: Boolean,
      default: false
    },
    mobileScreen: {
      type: Boolean,
      default: false
    },
    fullscreenSettings: {
      type: Boolean,
      default: false
    },
    newMobileDesign: {
      type: Boolean,
      default: false
    },
    restrictToCloseBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lastFocusedElement: null
    }
  },
  computed: {
    ...mapActions('modals', [
      ''
    ])
  },
  watch: {
    show: {
      immediate: true,
      async handler (value) {
        if (value) {
          this.lastFocusedElement = document.activeElement
          await this.$nextTick()
          this.$refs.close.focus()
        } else {
          if (this.lastFocusedElement) {
            this.lastFocusedElement.focus()
          }
          document.body.style.overflow = 'auto'
        }
      }
    }
  },
  methods: {
    ...mapActions('modals', [
      'promptClosed'
    ]),
    checkCloseModal () {
      if (!this.restrictToCloseBtn) {
        this.close()
      }
    },
    close () {
      this.promptClosed(MODAL_TYPES.PROMPT_CLOSED)
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/Modal'
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
// src/components/Modals/Modal.vue
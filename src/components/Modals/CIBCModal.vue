<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false">

    <div class="cibc-container">
      <div class="column-one">
        <router-link
          to="/spc-plus"
          tag="button"
          class="spc-button-v2 secondary border-white small"
          @click.native="$emit('close')"
          >
            <img class="image" :src="require('@/assets/images/cibc/spc-logo-black.png')"/>
          </router-link>
        <h1 class="header-text">{{ $t('title') }}</h1>
        <p class="description">{{ $t('description') }}</p>
        <router-link
          to="/spc-plus"
          tag="button"
          class="spc-button-v2 secondary border-white medium bottom desktop-img"
          @click.native="handleLearnMore"
          >{{ $t('start_shopping') }}</router-link>
      </div>
      <div class="column-two">
        <div class="image-container">
          <img v-lazy="require('@/assets/images/cibc/cibc-group.png')" class="desktop-img"/>
          <img v-lazy="require('@/assets/images/cibc/cibc-group-mobile.png')" class="mobile-img"/>
           <router-link
             to="/spc-plus"
             tag="button"
             class="spc-button-v2 secondary border-white medium bottom mobile-img"
             @click.native="$emit('close')"
           >{{ $t('start_shopping') }}</router-link>
        </div>
        <div class=image-two-container>
          <img :src="require('@/assets/images/cibc/spc-cibc-icon.png')"/>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { ACTIONS } from '@/service/analytics-service'
import Modal from '@/components/Modals/BaseModal'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  },
  methods: {
    handleLearnMore () {
      ACTIONS.LEARN_MORE_ON_MEMBERSHIP_GATE()
      this.$emit('close')
    }
  },
  updated () {
    if (this.show) ACTIONS.VIEW_SPC_PLUS_WELCOME_MODAL()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/CIBCModal'
</style>

<i18n>
{
  "en": {
    "spc": "SPC",
    "title": "Welcome to SPC+",
    "description": "You now have access to bigger discounts, one-of-a-kind contests, exclusive cash prizes and experiences, and so much more!",
    "start_shopping" : "Start Shopping"
  },
  "fr": {
    "spc": "SPC",
    "title": "Bienvenue à SPC+",
    "description": "Vous avez accès à des meilleures remises, des concours uniques, des prix en espèces exclusifs et des expériences, et plus encore!",
    "start_shopping": "Magasiner"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/CIBCModal.vue
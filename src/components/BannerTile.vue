<template>
  <div v-if="isBts && isStarted" class="offer-tile-container" @click="$emit('select')">
    <!-- Hence the image is added as background we can add title instead of alt -->
    <div
      class="background-image"
      :style="`background-image: url(${previewImagePath});`"
      :title="preview"
    >
      <div class="overlay">
      </div>
      <p>{{ $t('coming_soon') }}</p>
    </div>
    <div class="banner-info">
      <div class="title">{{ previewTitle }}</div>
      <div class="preview-description" v-html="marked(previewDescription)"></div>
    </div>
  </div>
  <div v-else class="offer-tile-container" @click="$emit('select')">
    <!-- Hence the image is added as background we can add title instead of alt -->
    <div
      class="background-image"
      :style="`background-image: url(${imagePath});`"
      :title="alt"
    >
      <div class="bubble-container">
        <div class="bubble">
          {{ timeLeft }}
        </div>
      </div>
      <div class="pill-container">
        <div class="pill">
          <img
            v-if="isSPCPlus"
            class="spc-pill-image"
            :alt="alt"
            :src="require('@/assets/images/cibc/pill-spc-copy.png')"
          />
        </div>
      </div>
    </div>
    <div class="banner-info">
      <div class="title">{{ title }}</div>
      <div class="description" v-html="description"></div>
    </div>
  </div>
</template>

<script>
import { offerTimeLeft } from '@/service/offer-service'
import marked from 'marked'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    expiry: {
      type: Number,
      default: null
    },
    isSPCPlus: {
      type: Boolean,
      required: true
    },
    imagePath: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    isBts: {
      type: Boolean,
      default: false
    },
    previewTitle: {
      type: String,
      default: null
    },
    previewDescription: {
      type: String,
      default: null
    },
    previewImagePath: {
      type: String,
      default: null
    },
    preview: {
      type: String,
      default: null
    },
    isStarted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    timeLeft () {
      const { days, hours } = offerTimeLeft(this.expiry)
      if (days > 99) return `>99 ${this.$tc('time.days', 99)}`
      if (days >= 1) return `${days} ${this.$tc('time.days', days)}`
      else if (hours >= 1) return `${hours} ${this.$tc('time.hours', hours)}`
      else return `<1 ${this.$tc('time.hours', 0)}`
    }
  },
  methods: {
    marked
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/BannerTile'
</style>

<i18n src="Assets/i18n/time"></i18n>
<i18n src="Assets/i18n/offer"></i18n>



// WEBPACK FOOTER //
// src/components/BannerTile.vue
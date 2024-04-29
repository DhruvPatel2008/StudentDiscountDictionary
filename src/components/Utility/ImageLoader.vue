<template>
  <div>
    <div v-if="loadingImage">
      <vue-content-loading :width="100" :height="100">
        <rect x="0" y="0" width="100" height="100" />
      </vue-content-loading>
    </div>
    <img class="alt-adjust" v-show="!loadingImage" ref="image"
      :src="fallback"
      :alt="imgAlt" width="100%" height="100%">
  </div>
</template>

<script>
import VueContentLoading from 'vue-content-loading'

export default {
  components: {
    VueContentLoading
  },
  props: {
    imgURL: {
      type: String,
      required: true
    },
    imgAlt: {
      type: String,
      default: ''
    },
    fallback: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loadingImage: true
    }
  },
  watch: {
    imgURL () {
      this.loadingImage = true
      this.loadImage()
    }
  },
  methods: {
    loadImage () {
      let image = new Image()
      const vi = this
      image.onload = function () {
        vi.loadingImage = false
        if (vi.$refs.image) {
          vi.$refs.image.src = this.src
        }
        image = null
      }
      image.onerror = function () {
        vi.loadingImage = false
        if (vi.$refs.image) {
          vi.$refs.image.src = vi.fallback
        }
        image = null
      }
      image.alt = this.imgAlt
      image.src = this.imgURL
    }
  },
  mounted () {
    this.loadImage()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Utility/ImageLoader'
</style>



// WEBPACK FOOTER //
// src/components/Utility/ImageLoader.vue
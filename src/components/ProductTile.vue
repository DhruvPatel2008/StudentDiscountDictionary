<template>
    <div class="product-container">
      <div class="product-image-container" ref="productImageLink">
      </div>
      <div class="product-details-container">
        <div class="circle text-center">
            <img :src="getURL('H%26M.png')" class="partner-logo" alt="">
        </div>
        <div class="price-details">
          <table>
            <tr class="regular-price">
              <td>Product Price</td>
              <td class="align-left">${{product['Product Price']}}</td>
            </tr>
            <tr class="you-save">
              <td>SPC Price</td>
              <td class="align-left">${{product['SPC Price']}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import ImageLoader from '@/components/Utility/ImageLoader'
import VSwipeout from 'v-swipeout'
import { getURL } from '@/service/api-config'
import LineLoader from '@/components/Utility/LineLoader'

export default {
  data () {
    return {
    }
  },
  components: {
    ImageLoader,
    LineLoader,
    VSwipeout
  },
  props: {
    enableScrollDelete: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    renderedHtml () {
      const productImageDiv = document.createElement('div')
      productImageDiv.innerHTML = this.product['Link Code']
      const imgTag = productImageDiv.querySelector('a > img')
      if (imgTag) {
        imgTag.setAttribute('height', '100%')
        imgTag.style.display = 'block'
        imgTag.style.margin = 'auto'
      }
      return productImageDiv.innerHTML
    }
  },
  methods: {
    getURL,
    applyStyles () {
      const container = this.$refs.productImageLink
      container.innerHTML = this.renderedHtml
    }
  },
  watch: {
    'product["Link code"]': 'applyStyles'
  },
  mounted () {
    this.applyStyles()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/ProductTile'
</style>



// WEBPACK FOOTER //
// src/components/ProductTile.vue
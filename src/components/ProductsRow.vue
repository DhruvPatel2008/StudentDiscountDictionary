<template>
    <div class="slider-container">
        <div v-if="showArrows" @click="scrollLeft()" class="nav arrow-nav" :class="{ hidden: !showLeftArrow }">
            <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowLeft_Black.svg')"/>
        </div>
        <div class="overflow-container fade-container">
            <ul class="list-reset-horizontal padded-list hide-scrollbar" ref="scroll-container">
            <li v-for="product in partnerProducts" :key="product['Priorirty']">
                <ProductTile :product="product" />
            </li>
            </ul>
        </div>
        <div v-if="showArrows" @click="scrollRight()" class="nav arrow-nav" :class="{ hidden: !showRightArrow }">
            <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowRight_Black.svg')"/>
        </div>
    </div>
</template>

<script>
import ProductTile from '@/components/ProductTile'
export default {
  data () {
    return {
      itemWidth: 220 + 20,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0,
      screenWidth: window.innerWidth
    }
  },
  components: {
    ProductTile
  },
  props: {
    partnerProducts: {
      type: Array,
      required: true
    }
  },
  computed: {
    showArrows () {
      return this.partnerProducts.length > 4
    },
    showLeftArrow () {
      return this.scrollPosLeft > 0
    },
    showRightArrow () {
      if (this.scrollContainerWidth === 0) {
        return true
      }
      return this.scrollPosLeft < this.scrollWidth - this.scrollContainerWidth
    }
  },
  methods: {
    scrollLeft () {
      const listElem = this.$refs['scroll-container']
      if (listElem) {
        const currentPos = listElem.scrollLeft
        const deltaToNext = currentPos % this.itemWidth
        const nextPos = deltaToNext === 0 ? currentPos - this.itemWidth : currentPos - deltaToNext
        listElem.scrollTo({ left: nextPos, behaviour: 'smooth' })
      }
    },
    scrollRight () {
      const listElem = this.$refs['scroll-container']
      if (listElem) {
        const currentPos = listElem.scrollLeft
        const deltaToNext = currentPos % this.itemWidth
        const nextPos = deltaToNext === 0 ? currentPos + this.itemWidth : currentPos - deltaToNext + this.itemWidth
        listElem.scrollTo({ left: nextPos, behaviour: 'smooth' })
      }
    },
    handleScroll () {
      const scrollElem = this.$refs['scroll-container']
      if (scrollElem) {
        this.scrollPosLeft = scrollElem.scrollLeft
        this.scrollWidth = scrollElem.scrollWidth
        this.scrollContainerWidth = scrollElem.clientWidth
      }
    },
    handleResize () {
      this.screenWidth = window.innerWidth
      this.handleScroll()
    }
  },
  mounted () {
    const scrollElem = this.$refs['scroll-container']
    scrollElem.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    const scrollElem = this.$refs['scroll-container']
    scrollElem.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus">
@import '~@/assets/components/ProductsRow'
</style>



// WEBPACK FOOTER //
// src/components/ProductsRow.vue
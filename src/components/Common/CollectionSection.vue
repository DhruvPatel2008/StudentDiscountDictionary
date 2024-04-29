<template>
  <div>
    <div v-if="title" class="title-container">
      <h1>{{ title }}</h1>
    </div>
    <div class="slider-container">
      <div v-if="showArrows" @click="scrollLeft()" class="nav arrow-nav" :class="{ hidden: !showLeftArrow }">
        <img :src="require('@/assets/images/icons/general/icon-solid-angle-left.svg')"/>
      </div>
      <div class="overflow-container fade-container">
        <ul class="list-reset-horizontal padded-list hide-scrollbar" ref="scroll-container" @scroll="handleScroll()">
          <li
            v-for="collection of collections"
            :key="collection.id"
            >
            <div class="offer-tile-container" @click="handleCollection(collection)">
              <div class="prop-section">
                <div class="overlay"></div>
                <img v-lazy="getURL(collection['image_large_'+ language])" class="background-image" alt="">
                <div v-if="collection['alt_'+ language].length <= 125" class="description">{{ collection['alt_'+ language] }}</div>
                <div v-else class="description">{{ collection['alt_'+ language].substr(0,125).concat('...') }}</div>
                <img class="arrow-img rotate180" :src="require(`@/assets/images/icons/general/arrow-icon-white.svg`)" alt="arrow">
              </div>
                <div class="banner-info">
                <div class="title">{{ collection['title_'+ language] }}</div>
                <div v-if="validateDeviceWidth('TabletIpad',screenWidth) || !validateDeviceWidth('Desktop', screenWidth)" class="under-description">{{ collection['alt_'+ language] }}</div>
              </div>
             </div>
          </li>
        </ul>
        </div>
      <div v-if="showArrows" @click="scrollRight()" class="nav arrow-nav" :class="{ hidden: !showRightArrow }">
        <img :src="require('@/assets/images/icons/general/icon-solid-angle-right.svg')"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getURL } from '@/service/api-config'
import { PAGE_NAMES } from '@/router'
import { validateDeviceWidth } from '@/utils'

export default {
  props: {
    collections: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      itemWidth: 220 + 20,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0,
      screenWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    showArrows () {
      return this.collections.length > 2
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
    getURL,
    validateDeviceWidth,
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
      this.scrollPosLeft = scrollElem.scrollLeft
      this.scrollWidth = scrollElem.scrollWidth
      this.scrollContainerWidth = scrollElem.clientWidth
    },
    handleCollection (collection) {
      this.$router.push({
        name: PAGE_NAMES.COLLECTION,
        params: {
          id: collection.id
        }
      })
    },
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    }
  },
  created () {
    window.addEventListener('resize', this.updateScreenWidth)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Common/CollectionSection'
</style>



// WEBPACK FOOTER //
// src/components/Common/CollectionSection.vue
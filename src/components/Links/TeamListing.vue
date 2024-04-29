<template>
  <div class="member-list-container">
    <ul class="member-list hide-scrollbar" ref="memberList">
      <li v-for="(member, index) in teamItems" :key="member.id" class="member-item" :style="''/*`max-width: ${itemWidth}px;`*/">
        <span class="member-profile">
          <div class="image-container" tabindex="0">
            <div class="picture" :style="`background-image: url(${getURL(member.image_en)})`"></div>
            <div class="overlay" :class="{ [randColourRange[index]]: true }">
              <div class="text" v-html="member.description_en ? marked(member.description_en) : ''"></div>
            </div>
          </div>
          <h2 class="name single-line-description">{{ member.text_en }}</h2>
          <p class="role multi-line-description">{{ member.subtext_en }}</p>
        </span>
      </li>
    </ul>
  </div>
</template>


<script>
import { getURL } from '@/service/api-config'
import marked from 'marked'
import { shuffleArray } from '@/utils'

export default {
  props: {
    teamMembers: {
      type: Array,
      required: true
    },
    maxItems: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      overlayColours: [
        'spc_razzmatazz',
        'spc_lincoln_green',
        'spc_ateneo_blue',
        'spc_cyber_grape',
        'spc_copper_red',
        'spc_gold'
      ]
    }
  },
  computed: {
    teamItems () {
      const items = [...this.teamMembers]
      shuffleArray(items)
      return items.slice(0, this.maxItems)
    },
    randColourIndices () {
      const range = []
      this.teamItems.forEach((x, i) => {
        let randInt = Math.floor(Math.random() * 4)
        if (i === 0) {
          range.push(randInt)
        } else {
          while (randInt === range[i - 1]) {
            randInt = Math.floor(Math.random() * 4)
          }
          range.push(randInt)
        }
      })
      return range
    },
    randColourRange () {
      return this.randColourIndices.map(index => this.overlayColours[index])
    }
  },
  methods: {
    getURL,
    marked
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Links/TeamListing'
</style>




// WEBPACK FOOTER //
// src/components/Links/TeamListing.vue
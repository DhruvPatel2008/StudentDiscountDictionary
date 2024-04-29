<template>
  <div>
    <div v-if="title" class="title-container">
      <h1>{{ title }}</h1>
    </div>
    <div class="slider-container">
      <div v-if="showArrows" @click="scrollLeft()" class="nav arrow-nav" :class="{ hidden: !showLeftArrow }">
        <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowLeft_Grey.svg')"/>
      </div>
      <div class="overflow-container fade-container">
        <ul class="list-reset-horizontal padded-list hide-scrollbar" ref="scroll-container">
          <li
            v-for="row in rowData"
            :key="row.id"
            >
            <BannerTile
              v-if="isBts"
              :title="row.title"
              :description="row.description"
              :previewTitle="row.preview_title"
              :previewDescription="row.preview_description"
              :expiry="row.expiry"
              :isSPCPlus="row.isSPCPlus"
              :isBts="isBts"
              :imagePath="row.imagePath"
              :isStarted="row.isStarted"
              :previewImagePath="row.preview_imagePath"
              :alt="(row.data[row.type] && row.data[row.type][`alt_${language}`])? row.data[row.type][`alt_${language}`] : row.data[row.type][`title_${language}`]"
              :preview="(row.data[row.type] && row.data[row.type][`preview_alt_${language}`])? row.data[row.type][`preview_alt_${language}`] : row.data[row.type][`preview_title_${language}`]"
              :offerPartner="row.data['partner']"
              @select="handleSelect(row.id, row.isStarted)"
              />
            <BannerTile
              v-else
              :title="row.title"
              :description="row.description"
              :expiry="row.expiry"
              :isSPCPlus="row.isSPCPlus"
              :imagePath="row.imagePath"
              :alt="(row.data[row.type] && row.data[row.type]['alt_'+language])? row.data[row.type]['alt_'+language] : row.data[row.type]['title_'+language]"
              :offerPartner="row.data['partner']"
              @select="handleSelect(row.id)"
              />
          </li>
        </ul>
        </div>
      <div v-if="showArrows" @click="scrollRight()" class="nav arrow-nav" :class="{ hidden: !showRightArrow }">
        <img :src="require('@/assets/images/icons/general/SPC_UI_ArrowRight_Grey.svg')"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BannerTile from '@/components/BannerTile'
import { translatePropertyWithDefault } from '@/service/user-service'
import { getURL } from '@/service/api-config'
import { PAGE_NAMES } from '@/router'

const TYPES = {
  OFFER: 'offer',
  CONTEST: 'contest'
}

export default {
  components: {
    BannerTile
  },
  props: {
    title: {
      type: String,
      required: true
    },
    offers: {
      type: Array,
      required: true
    },
    partners: {
      type: Object,
      required: true
    },
    contests: {
      type: Array,
      default: () => ([])
    },
    source: {
      type: String,
      default: null
    },
    isBts: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      itemWidth: 220 + 20,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    rowData () {
      const preparedContestData = []
      const preparedOfferData = []
      this.offers.forEach(offer => {
        offer.title_fr = (offer.title_fr) ? offer.title_fr : offer.title_en
        if (
          offer['partner_id'] &&
          this.partners[offer['partner_id']] &&
          this.partners[offer['partner_id']]['partner_name']
        ) {
          preparedOfferData.push({
            id: TYPES.OFFER + '_' + offer.offer_id,
            type: TYPES.OFFER,
            title: this.partners[offer['partner_id']]['partner_name'],
            description: translatePropertyWithDefault(offer, 'title'),
            imagePath: getURL(translatePropertyWithDefault(offer, 'image_small')),
            expiry: offer.end_date,
            isSPCPlus: offer.is_spc_plus,
            data: {
              offer,
              partner: this.partners[offer['partner_id']]
            }
          })
        }
      })
      if (!this.isBts) {
        preparedOfferData.sort((a, b) => {
          if (a.expiry < b.expiry) return -1
          if (a.expiry > b.expiry) return 1
          return 0
        })
      }
      this.contests.forEach(contest => {
        contest.title_fr = (contest.title_fr) ? contest.title_fr : contest.title_en
        contest.description_fr = (contest.description_fr) ? contest.description_fr : contest.description_en
        preparedContestData.push({
          id: TYPES.CONTEST + '_' + contest.id,
          type: TYPES.CONTEST,
          title: translatePropertyWithDefault(contest, 'title'),
          description: translatePropertyWithDefault(contest, 'description'),
          imagePath: getURL(contest['image_large_' + this.language]),
          expiry: contest.end_date,
          isSPCPlus: contest.is_spc_plus,
          isBts: contest.is_bts,
          preview_title: translatePropertyWithDefault(contest, 'preview_title'),
          preview_description: translatePropertyWithDefault(contest, 'preview_description'),
          preview_imagePath: getURL(contest[`preview_image_small_${this.language}`]),
          isStarted: contest.start_date >= Math.round(new Date()),
          data: {
            contest
          }
        })
      })
      if (!this.isBts) {
        preparedContestData.sort((a, b) => {
          if (a.expiry < b.expiry) return -1
          if (a.expiry > b.expiry) return 1
          return 0
        })
      }
      return [...preparedContestData, ...preparedOfferData]
    },
    rowDataMap () {
      const map = {}
      this.rowData.forEach(row => {
        map[row.id] = row
      })
      return map
    },
    showArrows () {
      return this.rowData.length > 1
    },
    showLeftArrow () {
      return true
    },
    showRightArrow () {
      return true
    }
  },
  watch: {
    rowData: {
      async handler (value) {
        if (value) {
          await this.$nextTick()
          this.handleScroll()
        }
      }
    }
  },
  methods: {
    translatePropertyWithDefault,
    getURL,
    handleSelect (id, isFutureContest = false) {
      if (isFutureContest) {
        return
      }
      const item = this.rowDataMap[id]
      if (!item) { return }
      if (item.type === TYPES.OFFER) {
        const offer = item.data.offer
        const offerID = offer.offer_id

        let partnerName = 'partner'
        try {
          partnerName = this.partners[offer.partner_id].url_name
        } catch (error) {}

        this.$router.push({
          name: PAGE_NAMES.DEAL,
          params: {
            id: offerID,
            partnerName
          },
          query: {
            source: this.source
          }
        })
      } else if (item.type === TYPES.CONTEST) {
        const contest = item.data.contest
        const contestID = contest.id
        this.$router.push({
          name: PAGE_NAMES.CONTEST,
          params: {
            id: contestID
          },
          query: {
            source: this.source
          }
        })
      }
    },
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
    }
  },
  mounted () {
    const scrollElem = this.$refs['scroll-container']
    scrollElem.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
  },
  beforeDestroy () {
    const scrollElem = this.$refs['scroll-container']
    scrollElem.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/BannerRow'
</style>



// WEBPACK FOOTER //
// src/components/BannerRow.vue
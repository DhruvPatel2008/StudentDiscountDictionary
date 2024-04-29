<template>
  <SPCPage>
    <div class="careers-content">
      <div class="banner-container">
        <img class="desktop" v-lazy="require('@/assets/images/careers/careers-banner.png')" alt="">
        <img class="mobile" v-lazy="require('@/assets/images/careers/careers-banner-mobile.png')" alt="">
        <div class="overlay-container">
          <div class="overlay">
            <h1>{{ $t('banner.title') }}</h1>
            <p>{{ $t('banner.description') }}</p>
            <div class="button-container">
              <button class="spc-button-v2" @click="handleViewCTA($t('banner.action'))">{{ $t('banner.action') }}</button>
            </div>
          </div>
        </div>
      </div>

      <div id="about" class="content-inner">
        <div class="content-section story-split" style="margin-bottom: 40px">
          <div class="logo">
            <div class="logo-inner">
              <img v-lazy="require('@/assets/images/logos/SPC_LOGO_BLACK.svg')" alt="SPC"/>
            </div>
          </div>
          <div class="text">
            <h1 class="section-title">{{ $t('who-we-are.title') }}</h1>
            <p>{{ $t('who-we-are.description',{year:currentYear}) }}</p>
          </div>
        </div>
      </div>

      <div class="content-section" style="text-align: center; max-width: 100%;">
        <div class="content-inner">
          <h1 class="section-title center">{{ $t('the-team.title') }}</h1>
          <p class="spc-center">{{ $t('the-team.description') }}</p>
        </div>

        <SpinnerLoading v-if="teamItemsLoading"/>
        <TeamListing v-else style="width: 100%; display: inline-block;" :teamMembers="teamItems"/>
      </div>

      <div class="content-inner">
        <div class="content-section">
          <div v-if="!sectionToggle">
            <h1 class="section-title center">{{ $t('benefits-and-perks.title') }}</h1>
            <div class="button-constrainer">
              <button class="spc-button-v2 secondary" @click="sectionToggle = !sectionToggle">{{ $t('values-and-principles.title') }}</button>
            </div>
          </div>
          <div v-else>
            <h1 class="section-title center">{{ $t('values-and-principles.title') }}</h1>
            <div class="button-constrainer">
              <button class="spc-button-v2 secondary" @click="sectionToggle = !sectionToggle">{{ $t('benefits-and-perks.title') }}</button>
            </div>
          </div>

          <div v-if="!sectionToggle">
            <SpinnerLoading v-if="perkItemsLoading"/>
            <div v-else class="centered-container content-section">
              <div class="responsive-grid-small">
                <div v-for="perk in perkItems" :key="perk.id" class="grid-item">
                  <img
                    v-lazy="getURL(perk.image_en)"
                    :alt="perk.text_en"
                    class="career-perks-icon"/>
                  <h3>{{ perk.text_en }}</h3>
                  <p>{{ perk.description_en }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="margin-top: 50px;">
            <h3 class="spc-center" style="text-transform: uppercase;">{{ $t('values-and-principles.values') }}</h3>
            <SpinnerLoading v-if="valueItemsLoading"/>
            <div v-else class="centered-container content-section" style="margin-bottom: 50px;">
              <div class="responsive-grid">
                <div v-for="value in valueItems" :key="value.id" class="grid-item">
                  <img
                    v-lazy="getURL(value.image_en)"
                    :alt="value.text_en"
                    class="career-perks-icon"/>
                  <h3>{{ value.text_en }}</h3>
                  <p>{{ value.description_en }}</p>
                </div>
              </div>
            </div>
            <h3 class="spc-center" style="text-transform: uppercase;">{{ $t('values-and-principles.principles') }}</h3>
            <SpinnerLoading v-if="perkItemsLoading"/>
            <div v-else class="centered-container content-section">
              <div class="responsive-grid-small">
                <div v-for="principle in principleItems" :key="principle.id" class="grid-item">
                  <img
                    v-lazy="getURL(principle.image_en)"
                    :alt="principle.text_en"
                    class="career-perks-icon"/>
                  <h3>{{ principle.text_en }}</h3>
                  <p>{{ principle.description_en }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="careers" class="content-section">
          <h1 class="section-title center">{{ $t('current-openings.title') }}</h1>
          <div class="spc-center openings-contained">
            <JobListing />
            <i18n path="current-openings.other" tag="p">
              <a :href="`mailto:${resumeEmail}`" @click="handleEmailClick(resumeEmail)">{{ resumeEmail }}</a>
            </i18n>
          </div>
        </div>
      </div>
    </div>
  </SPCPage>
</template>

<script>
import { mapGetters } from 'vuex'
import SPCPage from '@/components/SPCPage'
import { getURL } from '@/service/api-config'
import * as careerService from '@/service/career-service'
import JobListing from './JobListing'
import TeamListing from './TeamListing'
import SpinnerLoading from '@/components/Utility/SpinnerLoading'
import { translatePropertyWithDefault } from '@/service/user-service'
import { ACTIONS } from '@/service/analytics-service'
import { setMetaDescription } from '@/utils'
import meta from 'Assets/data/meta'

export default {
  metaInfo () {
    return {
      title: meta[this.language].title['careers'],
      titleTemplate: meta[this.language].titleTemplate['careers']
    }
  },
  components: {
    SPCPage,
    JobListing,
    TeamListing,
    SpinnerLoading
  },
  data () {
    return {
      careers: [],
      teamItemsLoading: true,
      teamItems: [],
      perkItemsLoading: true,
      perkItems: [],
      valueItemsLoading: true,
      valueItems: [],
      principleItemsLoading: true,
      principleItems: [],
      windowHeight: window.innerHeight,
      glanceData: [
        'founded',
        'team',
        'students',
        'brands'
      ],
      index: 0,
      hasLoaded: false,
      sectionToggle: false,
      resumeEmail: 'hr@spccard.ca',
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    section () {
      return this.$route.query.section
    },
    loading () {
      return [
        this.teamItemsLoading,
        this.perkItemsLoading,
        this.valueItemsLoading,
        this.principleItemsLoading
      ].reduce((a, b) => a || b, false)
    }
  },
  watch: {
    loading: {
      handler (value) {
        if (!this.hasLoaded && !value) {
          this.openBySection(this.section)
          this.hasLoaded = true
        }
      }
    },
    section: {
      handler (value) {
        if (value && !this.loading) {
          this.openBySection(value)
        }
      }
    }
  },
  methods: {
    translatePropertyWithDefault,
    getURL,
    handleCTA (text) {
      ACTIONS.CLICKED_CTA(text)
    },
    handleViewCTA (text) {
      this.handleCTA(text)
      this.openBySection('careers')
    },
    handleEmailClick (email) {
      this.handleCTA(email)
    },
    resizeHandler (event) {
      window.requestAnimationFrame(() => {
        this.windowHeight = window.innerHeight
      })
    },
    async openBySection (section) {
      if (section) {
        this.$router.replace({
          name: this.$route.name
        })
        const elem = document.getElementById(section)
        if (!elem) { return }
        this.currentIndex = null
        await this.$nextTick()
        setTimeout(() => {
          let offset = elem.getBoundingClientRect().top
          window.scrollBy({
            top: offset,
            left: 0,
            behavior: 'smooth'
          })
        }, 500)
      }
    },
    async loadTeamItems () {
      try {
        const items = await careerService.getTeamCarouselItems()
        this.teamItems = items
      } catch (error) {
        console.error(error)
      } finally {
        this.teamItemsLoading = false
      }
    },
    async loadPerkItems () {
      try {
        const items = await careerService.getPerkCarouselItems()
        this.perkItems = items
      } catch (error) {
        console.error(error)
      } finally {
        this.perkItemsLoading = false
      }
    },
    async loadValueItems () {
      try {
        const items = await careerService.getValueCarouselItems()
        this.valueItems = items
      } catch (error) {
        console.error(error)
      } finally {
        this.valueItemsLoading = false
      }
    },
    async loadPrincipleItems () {
      try {
        const items = await careerService.getPrincipleCarouselItems()
        this.principleItems = items
      } catch (error) {
        console.error(error)
      } finally {
        this.principleItemsLoading = false
      }
    }
  },
  created () {
    setMetaDescription(meta[this.language].description['careers'])
    this.loadTeamItems()
    this.loadPerkItems()
    this.loadValueItems()
    this.loadPrincipleItems()
  },
  mounted () {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
    if (this.section) {
      this.openBySection(this.section)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Links/Careers'
</style>

<i18n>
{
  "en": {
    "banner": {
      "title": "Help us, help students.",
      "description": "Everything we do is for the kids. From the savings to the content, our ultimate goal is making student life better. Your help is needed to reach that goal!",
      "action": "View Opportunities"
    },
    "who-we-are": {
      "title": "Our Story",
      "description": "In 1992, our founder, Dean Mazzariol, a new graduate from Ryerson University knew there had to be a way to make student life better – even if it was as simple as saving a few bucks. Thus, SPC was developed to fulfill that “need”. Fast-forward to {year}, SPC has been able to provide over 450 unique deals & gain the title of the #1 Coalition Loyalty Program by Bond Brand Loyalty Survey & Report. The story is still unfolding, and this could be your chance to help write the next chapter."
    },
    "the-team": {
      "title": "The Squad",
      "description": "Get to know the team – or at least the spark notes version!"
    },
    "benefits-and-perks": {
      "title": "Benefits & Perks"
    },
    "values-and-principles": {
      "title": "Values & Principles",
      "values": "Values",
      "principles": "Principles"
    },
    "current-openings": {
      "title": "Join Our Squad",
      "other": "Don’t see a position you’re looking for? Send over your resume to {0} and we’ll keep it on file!",
      "none": "No openings available currently. Please check back later."
    }
  },
  "fr": {
    "banner": {
      "title": "Help us, help students.",
      "description": "Everything we do is for the kids. From the savings to the content, our ultimate goal is making student life better. Your help is needed to reach that goal!",
      "action": "View Opportunities"
    },
    "who-we-are": {
      "title": "Our Story",
      "description": "In 1992, our founder, Dean Mazzariol, a new graduate from Ryerson University knew there had to be a way to make student life better – even if it was as simple as saving a few bucks. Thus, SPC was developed to fulfill that “need”. Fast-forward to {year}, SPC has been able to provide over 450 unique deals & gain the title of the #1 Coalition Loyalty Program by Bond Brand Loyalty Survey & Report. The story is still unfolding, and this could be your chance to help write the next chapter."
    },
    "the-team": {
      "title": "The Squad",
      "description": "Get to know the team – or at least the spark notes version!"
    },
    "benefits-and-perks": {
      "title": "Benefits & Perks"
    },
    "values-and-principles": {
      "title": "Values & Principles",
      "values": "Values",
      "principles": "Principles"
    },
    "current-openings": {
      "title": "Join Our Squad",
      "other": "Don’t see a position you’re looking for? Send over your resume to {0} and we’ll keep it on file!",
      "none": "No openings available currently. Please check back later."
    }
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Links/Careers.vue
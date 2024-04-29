<template>
  <footer id="footer">
		<div class="page-container">
			<div class="footer-top-wrap">
					<div class="footer-top-left">
						<div class="footer-menu-list-outer-wrap">
								<ul class="footer-menu-list-wrap upper-case-li">
                  <li v-for="menu in menuFooter['first_column']" @click="handleCTA(menu[language], menuCTA)">
                    <a v-if="menu.force_link" :href="menu.link" target="_blank">{{ menu[language] }}</a>
                    <router-link v-else-if="menu.route.length > 0" :class="{'bold-text': menu['route']==='/cibc'}" style="text-transform: none;" :to="menu['route']">{{ menu[language] }}</router-link>
                    <a v-else :href="menu.link" target="_blank">{{ menu[language] }}</a>
                  </li>
								</ul>
								<ul class="footer-menu-list-wrap upper-case-li">
									<li v-for="menu in menuFooter['second_column']" @click="handleCTA(menu[language], menuCTA)">
                    <a v-if="menu.force_link" :href="menu.link" target="_blank">{{ menu[language] }}</a>
                    <router-link v-else-if="menu.route.length > 0" style="text-transform: none;" :to="menu['route']">{{ menu[language] }}</router-link>
                    <a v-else :href="menu.link" target="_blank">{{ menu[language] }}</a>
                  </li>
								</ul>
								<ul class="footer-menu-list-wrap upper-case-li">
									<li v-for="menu in menuFooter['third_column']" @click="handleCTA(menu[language], menuCTA)">
                    <a v-if="menu.force_link" :href="menu.link" target="_blank">{{ menu[language] }}</a>
                    <router-link v-else-if="menu.route.length > 0" style="text-transform: none;" :to="menu['route']">{{ menu[language] }}</router-link>
                    <a v-else :href="menu.link" target="_blank">{{ menu[language] }}</a>
                  </li>
								</ul>
						</div>
				</div>
				<div class="footer-top-right">
					<div class="app-link-wrap">
						<h4>{{ $t('get_app')}}</h4>
						<Badges/>
					</div>
					<div class="social-media-list-wrap">
						<ul class="social-media-list-item">
							<li v-for="social in socialOrder" :key="social" @click="handleCTA(social, socialCTA)">
                <a
                  :href="socialData[social].link"
                  :title="socialData[social].name"
                  target="_blank" rel="noopener noreferrer">
                  <img
                    :src="require(`@/assets/images/icons/general/${socialData[social].icon}`)"
                    :alt="socialData[social].name"/>
                </a>
              </li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer-bottom-wrap">
					<div class="footer-bottom-left">
						<div class="copy-right-wrap">
							{{ $t('copyright', { year: currentYear })}}
						</div>
					</div>
					<div class="footer-bottom-right">
						<div class="trade-mark-desc">
							{{ $t('app_store') }}
						</div>
					</div>
			</div>
		</div>
  </footer>
</template>

<script>
import linkData from 'Assets/data/footer_links'
import socialData from 'LocalizedAssets/data/social'
import LanguageToggle from '@/components/LanguageToggle'
import Search from '@/components/Search'
import Badges from '@/components/Badges'
import { ACTIONS } from '@/service/analytics-service'
import { mapGetters } from 'vuex'

export default {
  components: {
    LanguageToggle,
    Badges,
    Search
  },
  props: {
    menuFooter: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      linkData,
      socialData,
      currentYear: (new Date()).getFullYear(),
      socialOrder: [
        'facebook',
        'twitter',
        'instagram',
        'snapchat',
        'tiktok',
        'linkedin'
      ],
      menuCTA: 'Menu',
      socialCTA: 'Social Media'
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ])
  },
  methods: {
    handleCTA (text, section) {
      section === 'Menu' ? ACTIONS.CLICKED_CTA(text, 'Menu') : ACTIONS.CLICK_SOCIAL(text, 'Social Media')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/SPCFooter'
</style>

<i18n src="LocalizedAssets/i18n/footer"></i18n>



// WEBPACK FOOTER //
// src/components/SPCFooter.vue
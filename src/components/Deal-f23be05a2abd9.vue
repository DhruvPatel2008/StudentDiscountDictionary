<template>
  <SPCPage class="background-container">
    <div>
      <SPCPlusRedeemModal
        v-if="offer"
        :plusOfferId="offer.plus_offer_id"
        :show="showSpcPlusRedeemModal"
        @redeemAnyway="redeemAnyway"
        @close="handleSpcPlusRedeemModalClose"
        :code="code"
      />

      <ShareModal
        :show="showShareModal"
        @close="handleShareModalClose"
        :offer="offer"
        :partner="partner"
      />

      <!--BANNER SECTION START-->
      <section class="banner-bg">
        <div class="site-container">
          <div class="row">
            <div class="col-100">
              <div class="banner-wrap text-center position-relative">
              <div class="banner-content text-center">
                <div class="back-link">
                  <a class="back-nav" @click="goBack">
                    <img class="icon" :src="require('@/assets/images/icons/general/arrow-icon-white.svg')" :alt="$t('back')">
                    {{ $t('back') }}
                  </a>
                </div>
                <div class="save" @click="toggleSave" :class="{ disabled: !registered }">
                  <a>
                    <img v-if="isFavourited" :src="require(`@/assets/images/icons/general/bookmark-after.png`)" alt="book-mark" class="bookmark bookmark-ar">
                    <img v-else  :src="require(`@/assets/images/icons/general/bookmark-before.png`)" alt="book-mark" class="bookmark bookmark-ar">
                  </a>
                </div>
                <div v-if="webShareApiSupported && !isDesktop" class="share" @click="shareViaWebShare">
                    <img :src="require(`@/assets/images/icons/general/share-square.png`)" alt="book-mark" class="share-icon bookmark-ar">
                </div>
                <div v-else class="share" @click="shareOffer">
                    <img :src="require(`@/assets/images/icons/general/share-square.png`)" alt="book-mark" class="share-icon bookmark-ar">
                </div>
                <div class="logo-container text-center">
                    <template v-if="offer.has_image">
                      <img v-if="validateDeviceWidth('Mobile', screenWidth)" :src="getURL(language === 'en' ? offer['optional_image_small_en'] : offer['optional_image_small_fr'])" class="offer-image" alt="offer-image">
                      <img v-else :src="getURL(language === 'en' ? offer['optional_image_large_en'] : offer['optional_image_large_fr'])"
                      class="offer-image" alt="offer-image">
                    </template>
                    <template v-else>
                      <img v-if="validateDeviceWidth('Mobile', screenWidth)" :src="getURL(language === 'en' ? partner['logo_mobile'] : partner['logo_mobile_fr'])"  class="partner-logo" alt="partner-logo">
                      <img v-else :src="getURL(language === 'en' ? partner['logo_web'] : partner['logo_web_fr'])"  class="partner-logo" alt="partner-logo">
                    </template>
                </div>
                <div class="badge">
                  <span v-if="offer.online" class="Online-Rectangle">
                    <label class="online ">{{ $t('offer.types.online') }}</label>
                  </span>
                  <span v-if="offer.in_store" class="Online-Rectangle">
                    <label class="instore ">{{ $t('offer.types.instore') }}</label>
                  </span>
                  <span v-if="isSPCPlus" class="Spc-Rectangle">
                    <img :src="require('@/assets/images/cibc/pill-spc-copy.png')" class="spc-label" alt="">
                  </span>
                  <div class="pill-container-2 text-center">
                    <div v-if="offer.is_new_offer" class="pill green-pill">{{ $t('offer.types.new_offer') }}</div>
                    <div v-if="offer.is_new_partner" class="pill green-pill">{{ $t('offer.types.new_partner') }}</div>
                    <div v-if="offer.lto_end_date && !offer.hide_timer" class="pill-container">
                      <div class="pill red">
                        <img class="clock-image" :src="require(`@/assets/images/icons/general/clock.png`)"/>
                        {{ timeLeft(offer.lto_end_date) }}
                      </div>
                    </div>
                  </div>
                </div>
                <!--BADGE-LABEL-->
                <h1 v-if="partner != null" class="partner-name">{{ partner.partner_name }}</h1>
                <p id="translated-content" class="offer-title custom-offer-title" v-html="translatePropertyWithDefault(offer, 'title')"></p>
                <p
                  v-if="showSubTitle"
                  class="offer-title offer-subtitle custom-offer-title"
                  v-html="translatePropertyWithDefault(offer, 'sub_title')"
                >
                </p>
                <div class="t&c tearm-title">
                  <p class="terms-and-condition" @click="showTerms = !showTerms">{{ (showTerms ? '-' : '+') + ' ' + $t('terms_conditions') }}</p>
                  <div v-show="showTerms" class="terms-text">
                    <p v-html="restrictions"></p>
                    <p v-html="genericLegal"></p>
                  </div>
                </div>

                <div class="copy-code-container">
                  <div v-if="showCodeCopiedPopup">
                    <div>{{ $t('code_copied') }}</div>
                    <progress class="progress-bar" max="300" :value="progressValue"></progress>
                  </div>
                  <button v-if="offer.online && verifyOpenOfferCTA()" v-clipboard:copy="code" class="clipboard-btn spc-button-v2 purple" @click="handleSiteNavigation(translatePropertyWithDefault(offer, 'cta_url'), translatePropertyWithDefault(offer, 'cta_title'))">
                    <span>{{ translatePropertyWithDefault(offer, 'cta_title') }}</span>
                  </button>
                  <!-- Make CTA override non-public offers with no code-->
                  <button v-else-if="offer.online && verifyOfferCTA()" v-clipboard:copy="code" class="clipboard-btn spc-button-v2 purple" @click="handleSiteNavigation(translatePropertyWithDefault(offer, 'cta_url'), translatePropertyWithDefault(offer, 'cta_title'))">
                    <span v-if="validMemberWithCard">
                      <span v-if="isSPCPlus && !this.isSpcPlusUser">{{ $t('join_spc_plus') }}</span>
                      <span v-else-if="verifyOfferCTA()">{{ translatePropertyWithDefault(offer, 'cta_title') }}</span>
                    </span>
                    <span v-else-if="loggedIn && offer.account_only">
                      <span v-if="hasCode">
                        <span v-if="isRedeemOnlineClicked">{{ $t('copy_code_again') }}</span>
                        <span v-else>
                          <span v-if="isSPCPlus && !this.isSpcPlusUser">{{ $t('join_spc_plus') }}</span>
                          <span v-else>{{ $t('redeem_online') }}</span>
                        </span>
                      </span>
                      <span v-else>{{ $t('no_code_required') }}</span>
                    </span>
                    <span v-else>
                      <span v-if="isSPCPlus">{{ $t('join_spc_plus') }}</span>
                      <span v-else>{{ $t('join_spc') }}</span>
                    </span>
                  </button>
                  <!--  Need to record click event in Mixpanel if offer is no-code and has a static url -->
                  <button v-else-if="offer.online && !hasCode && !hasGeneratedURL && !hasUploadedURL" class="clipboard-btn spc-button-v2 purple" @click="handleSiteNavigation(offer.url)">
                    <span v-if="validMemberWithCard || offer.is_open">
                      <span v-if="isSPCPlus && !this.isSpcPlusUser"> {{ $t('join_spc_plus') }}</span>
                      <span v-else>{{ $t('no_code_required') }}</span>
                    </span>
                    <span v-else-if="loggedIn && offer.account_only">
                      <span v-if="isSPCPlus && !this.isSpcPlusUser"> {{ $t('join_spc_plus') }}</span>
                      <span v-else>{{ $t('no_code_required') }}</span> 
                    </span>
                    <span v-else>
                      <span v-if="isSPCPlus">{{ $t('join_spc_plus') }}</span>
                      <span v-else>{{ $t('join_spc') }}</span>
                    </span>
                  </button>
                  <button v-else-if="offer.online" v-clipboard:copy="code" class="clipboard-btn spc-button-v2 purple" @click="handleCopyCode()">
                    <span v-if="validMemberWithCard || offer.is_open">
                      <span v-if="hasCode">
                        <span v-if="isRedeemOnlineClicked">{{ $t('copy_code_again') }}</span>
                        <span v-else>
                          <span v-if="isSPCPlus && !this.isSpcPlusUser">{{ $t('join_spc_plus') }}</span>
                          <span v-else>{{ $t('redeem_online') }}</span>
                        </span>
                      </span>
                      <span v-else>
                        <span v-if="isSPCPlus && !this.isSpcPlusUser">{{ $t('join_spc_plus') }}</span>
                        <span v-else>{{ $t('no_code_required') }}</span>
                      </span>
                    </span>
                    <span v-else-if="loggedIn && offer.account_only">
                      <span v-if="hasCode">
                        <span v-if="isRedeemOnlineClicked">{{ $t('copy_code_again') }}</span>
                        <span v-else>
                          <span v-if="isSPCPlus && !this.isSpcPlusUser">{{ $t('join_spc_plus') }}</span>
                          <span v-else>{{ $t('redeem_online') }}</span>
                        </span>
                      </span>
                      <span v-else>{{ $t('no_code_required') }}</span>
                    </span>
                    <span v-else>
                      <span v-if="isSPCPlus">{{ $t('join_spc_plus') }}</span>
                      <span v-else>{{ $t('join_spc') }}</span>
                    </span>
                  </button>
                </div>

                <span v-if="offer.online && offer.in_store" class="download-app">
                  {{ $t('download_app_online') }}
                </span>
                <span v-if="offer.in_store && !offer.online" class="download-app">
                  {{ $t('download_app_instore') }}
                </span>
                <div v-if="offer.in_store" class="download">
                  <div class="app-link-wrap">
                    <Badges/>
                  </div>
                </div>
              </div>
              </div>
              <!--bannerContent-->

            </div>
            <!--COL-100-->
          </div>
          <!--ROW-->
        </div>
        <!--site-container-->
      </section>

      <!--BANNER SECTION END-->

      <!--ABOUT SECTION START-->
      <section class="about">
        <div class="site-container">
          <div class="row">
            <div class="col-100">
              <div v-if="partner != null" class="aboutSection">
                <h2 class="About">{{ $t('about') + ' ' + partner.partner_name }}</h2>
                <p class="partner-description" v-html="translatePropertyWithDefault(partner, 'description')">
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--ABOUT SECTION END-->

      <!-- MOST POPULAR PRODUCTS SECTION START -->
      <section class="block1" v-if="partner.partner_name === 'H&M' && H_M_PRODUCTS.length> 0">
        <div class="site-container offers-container-inner">
          <div class="row">
            <div class="moreSection">
              <h3 class="more-from-title">{{ $t('most_popular')}}</h3>
            </div>
            <!--COL-100-->
            <ProductsRow :partnerProducts="H_M_PRODUCTS" />
          </div>
        </div>
      </section>

      <!-- MOST POPULAR PRODUCTS SECTION END -->

      <!--FIRST BLOCK SECTION START-->
      <section class="block1" v-if="partnerOffers.length > 0">
        <div class="site-container offers-container-inner">
          <div class="row">
            <div v-if="partner != null" class="moreSection">
              <h3 class="more-from-title">{{ $t('more_from') + ' ' + partner.partner_name }}</h3>
            </div>
            <!--COL-100-->
            <CategoryRow
              :category="null"
              :hasViewAll="false"
              :offers="partnerOffers"
              :partners="partnerByID"
              :enableMobileAppView="true"
              :hasHeading="false"
              />
          </div>
        </div>
      </section>

      <!--FIRST BLOCK SECTION END-->

      <!--SECOND BLOCK SECTION START-->

      <section class="block2" v-if="relatedOffers.length > 0 && partner.partner_name !== 'CIBC'">
        <div class="site-container">
          <div class="row">
            <div class="moreSection">
              <h3 class="more-from-title"> {{ $t('you_might_like') }}</h3>
            </div>
            <!--COL-100-->
            <CategoryRow
              :category="null"
              :hasViewAll="false"
              :offers="relatedOffers"
              :partners="partners"
              :enableMobileAppView="true"
              :hasHeading="false"
              />
          </div>
        </div>
      </section>

      <!--SECOND BLOCK SECTION END-->

      <!--THIRD BLOCK SECTION START-->
      <section class="third-block">
        <div class="site-container">
          <div class="row">
            <div class="col-2 keep-membership">
              <div class="Keep-your-membership">
                <div class="para01">{{ $t('keep_membership') }}</div>
                <div class="Make-sure-you-downlo">{{ $t('keep_membership') }}</div>
                <div class="app-link-wrap align-badge">
                  <Badges/>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="frame-wrap">
                <img :src="require('@/assets/images/offer/frame.png')" alt="frame" class="Group-11">
              </div>
            </div>
          </div>
          <GetOnList :cibc="true"  class="get-on-list-section"/>
        </div>
      </section>
      <!--THIRD BLOCK SECTION END-->

    </div>
  </SPCPage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SPCPage from '@/components/SPCPage'
import CategoryRow from '@/components/CategoryRow'
import { getOffer,
  getOfferCode,
  getOfferURL,
  determineOfferType,
  getPartnerOffers,
  getRelatedOffers,
  usedPromoCode,
  offerTimeLeft,
  getVerifyHbcUser
} from '@/service/offer-service'
import { insertDeal } from '@/service/recently-viewed-offer.js'
import { translatePropertyWithDefault, translate } from '@/service/user-service'
import { getCards, getIsSpcPlusUser, getUserCampus } from '@/service/profile-service'
import { getURL } from '@/service/api-config'
import { safeOpen, updateReNavigation, validateDeviceWidth, setMetaDescription, checkReturnMetaInfo } from '@/utils'
import { ACTIONS } from '@/service/analytics-service'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { URL_TYPE, PROMO_CODE_TYPE } from '@/models/offer'
import GetOnList from '@/components/Common/GetOnList'
import Badges from '@/components/Badges'
import SPCPlusRedeemModal from '@/components/Modals/SPCPlusRedeemModal'
import { setExtensionOfferDomain, setExtensionOfferId } from '@/service/cookie-service'
import store from '@/store'
import ShareModal from '@/components/Modals/ShareModal'
import H_M_PRODUCTS from 'LocalizedAssets/data/h&m_products'
import { PAGE_NAMES } from '@/router'
import ProductsRow from '@/components/ProductsRow'

export default {
  metaInfo () {
    return {
      title: this.metaTitle || this.partner_name
    }
  },
  components: {
    SPCPage,
    CategoryRow,
    GetOnList,
    Badges,
    SPCPlusRedeemModal,
    ProductsRow,
    ShareModal
  },
  props: {
    id: {
      type: String,
      required: true
    },
    partnerName: {
      type: String,
      default: null
    },
    sourceSection: {
      type: String,
      default: null
    },
    partner_name: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      H_M_PRODUCTS,
      loading: true,
      error: null,
      partner: null,
      offer: null,
      legal: null,
      showTerms: false,
      showSpcPlusRedeemModal: false,
      showShareModal: false,
      loadingCode: false,
      code: null,
      loadingURL: false,
      nonStaticURL: null,
      partnerOffers: [],
      relatedOffers: [],
      partners: [],
      partnerByID: {},
      isRedeemOnlineClicked: false,
      isSaved: false,
      showCodeCopiedPopup: false,
      progressValue: 0,
      isValidSPCPlusOffer: false,
      screenWidth: window.innerWidth,
      redeemCodeLoading: false,
      codeId: null,
      showSubTitle: false,
      metaTitle: null
    }
  },
  computed: {
    ...mapGetters([
      'validMemberWithCard',
      'hasValidCard',
      'language',
      'registered',
      'loggedIn'
    ]),
    ...mapGetters('profile', [
      'cards'
    ]),
    ...mapGetters('offers', [
      'categories',
      'favouriteOffers',
      'savedList'
    ]),
    offerType () {
      determineOfferType(this.offer)
    },
    isFavourited () {
      var flag = false
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(this.id)) {
          flag = true
        }
      })
      return flag
    },
    hasCode () {
      if (!this.offer) return null
      return this.offer.online && ![PROMO_CODE_TYPE.NO_CODE].includes(this.offer.promo_code_online)
    },
    hasGeneratedURL () {
      return this.offer ? this.offer.url_type === URL_TYPE.GENERATED : false
    },
    hasUploadedURL () {
      return this.offer ? [
        URL_TYPE.UPLOAD_UNIQUE,
        URL_TYPE.UPLOAD_RANDOM
      ].includes(this.offer.url_type) : false
    },
    isSPCPlus () {
      return this.offer.is_spc_plus
    },
    restrictions () {
      return this.translatePropertyWithDefault(this.offer, 'restrictions')
    },
    genericLegal () {
      return this.translate(this.legal)
    },
    loadingDynamicData () {
      return this.loadingCode || this.loadingURL
    },
    offerURL () {
      if (!this.offer) return null
      if (this.hasGeneratedURL || this.hasUploadedURL) {
        return this.nonStaticURL
      }
      return this.offer.url
    },
    category () {
      if (this.categories.length > 0) {
        for (const category of this.categories) {
          if (category.id === this.offer.category_id) {
            return category
          }
        }
      }

      return null
    },
    webShareApiSupported () {
      return navigator.share
    },
    isDesktop () {
      const isTouchDevice = () => 'ontouchstart' in window || 'onmsgesturechange' in window
      return window.screenX !== 0 && !isTouchDevice()
    }
  },
  methods: {
    translatePropertyWithDefault,
    addLinkListeners () {
      const container = this.$el.querySelector('#translated-content')
      if (!container) return
      const currentLinks = container.querySelectorAll('a')
      currentLinks.forEach(link => {
        link.removeEventListener('click', this.trackLinkClick)
      })
      const links = container.querySelectorAll('a')
      links.forEach(link => {
        link.addEventListener('click', this.trackLinkClick)
      })
    },
    trackLinkClick () {
      ACTIONS.OFFER_SUBTITLE_CLICK({
        offerID: this.offer.offer_id,
        offerName: this.offer.title_en,
        offerType: this.offerType,
        category: this.offer.category,
        partnerName: this.partner.partner_name,
        partnerID: null
      })
    },
    translate,
    validateDeviceWidth,
    getURL,
    async checkShowSubTitle () {
      if ([`this.offer.sub_title_${this.language}`].length > 0) {
        if (!this.loggedIn || !this.validMemberWithCard) {
          this.showSubTitle = true
        } else if (this.partner && this.partner.hasOwnProperty('hbc_offer')) {
          try {
            await getVerifyHbcUser()
          } catch (error) {
            // this means not valid user
            this.showSubTitle = true
          }
        }
      }
    },
    goBack () {
      const history = window.history.length
      history > 2 ? this.$router.go(-1) : this.$router.push({ name: PAGE_NAMES.HOME })
    },
    ...mapActions('location', [
      'refreshLocation'
    ]),
    ...mapActions('modals', [
      'openModal'
    ]),
    ...mapActions('offers', [
      'loadSummary',
      'loadCategories',
      'updateFavourites',
      'loadSavedList',
      'updateSavedList'
    ]),
    timeLeft (ltoOfferExpiry) {
      const { years, months, weeks, days, hours } = offerTimeLeft(ltoOfferExpiry, true)
      if (years > 0) return `${years} ${this.$tc('time.years', years)}`
      if (months > 0) return `${months} ${this.$tc('time.months', months)}`
      if (weeks > 0) return `${weeks} ${this.$tc('time.weeks', weeks)}`
      if (days >= 1) return `${days} ${this.$tc('time.days', days)}`
      if (hours >= 1) return `${hours} ${this.$tc('time.hours', hours)}`
      else return `<1 ${this.$tc('time.hours', 0)}`
    },
    callRedeemOnlineOffer () {
      ACTIONS.REDEEM_ONLINE_OFFER({
        offerID: this.offer.offer_id,
        offerName: this.offer.title_en,
        category: this.offer.category,
        partnerName: this.partner.partner_name,
        partnerID: null,
        offerType: this.offerType,
        featured: this.offer.is_limited_time,
        plusOffer: this.isSPCPlus
      })
    },
    handleSiteNavigation (link) {
      if (this.offer.online) {
        this.callRedeemOnlineOffer()
      }
      safeOpen(link)
    },
    async toggleSave () {
      if (!this.registered) {
        this.openModal(MODAL_TYPES.LOGIN_PROMPT)
        return
      }
      await store.dispatch('updateOfferId', this.id)
      var savedList = this.getSavedListId()
      if (savedList.id) {
        ACTIONS.FAVOURITE_REMOVED({
          offerID: this.offer.offer_id,
          offerName: this.offer.title_en,
          offerType: determineOfferType(this.offer),
          featured: this.offer.is_limited_time,
          category: this.offer.category,
          partnerName: this.partner.partner_name,
          partnerID: this.partner.partner_id,
          sourceSection: this.section,
          plusOffer: this.offer.is_spc_plus
        })
        var newList = this.savedList.filter(itm => itm.id === savedList.id)[0].offer_ids.filter(id => id !== this.id)
        this.updateSavedList({ offerIds: newList, listId: savedList.id, listName: savedList.name })
        .catch(error => {
          console.error(error)
        })
      } else {
        ACTIONS.FAVOURITE_ADDED({
          offerID: this.offer.offer_id,
          offerName: this.offer.title_en,
          offerType: determineOfferType(this.offer),
          featured: this.offer.is_limited_time,
          category: this.offer.category,
          partnerName: this.partner.partner_name,
          partnerID: this.partner.partner_id,
          sourceSection: this.section,
          plusOffer: this.offer.is_spc_plus
        })
        this.openModal(MODAL_TYPES.SAVED_LIST_MODAL)
      }
    },
    async loadCode () {
      this.loadingCode = true
      this.code = null
      const offerType = 'online'
      try {
        const codeData = await getOfferCode(this.offer, offerType)
        this.loadingCode = false
        this.code = codeData.code
        this.codeId = codeData.shown === true ? codeData.id : ''
      } catch (error) {
        this.loadingCode = false
      }
    },
    async loadURL () {
      this.loadingURL = true
      this.nonStaticURL = null
      try {
        const urlData = await getOfferURL(this.offer)
        const url = urlData.url
        this.nonStaticURL = url
        return url
      } catch (error) {
      } finally {
        this.loadingURL = false
      }
    },
    async copyCode () {
      if (this.redeemCodeLoading) return

      this.isRedeemOnlineClicked = true

      if (this.hasGeneratedURL || this.hasUploadedURL) await this.loadURL()
      if (!this.hasCode) {
        safeOpen(this.offerURL)
        return
      }
      try {
        if (this.codeId) {
          await usedPromoCode(this.codeId)
        }
        this.redeemCodeLoading = true

        ACTIONS.PRESSED_COPY_CODE({
          offerID: this.offer.offer_id,
          offerName: this.offer.title_en,
          category: this.offer.category,
          partnerName: this.partner.partner_name,
          partnerID: null,
          offerType: this.offerType,
          featured: this.offer.is_limited_time,
          plusOffer: this.isSPCPlus
        })

        this.showCodeCopiedPopup = true
        this.runProgressBar()

        setTimeout(() => {
          setExtensionOfferDomain(this.partner.domain)
          setExtensionOfferId(this.offer.id)

          safeOpen(this.offerURL)

          ACTIONS.REDEEM_ONLINE_OFFER({
            offerID: this.offer.offer_id,
            offerName: this.offer.title_en,
            category: this.offer.category,
            partnerName: this.partner.partner_name,
            partnerID: null,
            offerType: this.offerType,
            featured: this.offer.is_limited_time,
            plusOffer: this.isSPCPlus
          })

          this.redeemCodeLoading = false
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    },
    handleMetaUpdateLogic () {
      if (this.offer) {
        const [title, description] = checkReturnMetaInfo(this.offer, this.language)
        if (title && title.length > 0) {
          this.metaTitle = title
        }
        if (description && description.length > 0) {
          setMetaDescription(description)
        }
      }
    },
    async handleCopyCode () {
      if (this.hasGeneratedURL || this.hasUploadedURL) {
        // trigger tracker event
        // for no_code & generatedURL
        this.callRedeemOnlineOffer()
      }
      if (this.offer.is_open || (this.offer.account_only && this.loggedIn)) {
        await this.copyCode()
        return
      }
      let cards
      try {
        cards = await getCards()
      } catch (error) {
        console.error(error)
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
      try {
        await getOffer(this.offer.plus_offer_id)
        .then(res => {
          this.isValidSPCPlusOffer = true
        })
      } catch (error) {
        this.isValidSPCPlusOffer = false
      }
      if (!cards || cards.length === 0 || !cards[0].hasOwnProperty('card_number') || !this.hasValidCard) {
        // open login modal if user has no card
        // yes, this is not meant for login, but more like membership
        updateReNavigation(this.$route.fullPath)
        // SNGW-4263 - Redirect to the About SPC+ Page inside of showing popup.
        this.offer.is_spc_plus ? this.$router.push('/cibc') : this.openModal(MODAL_TYPES.LOGIN_PROMPT)
        return
      }

      // this login may need to change
      const isSpcPlusUser = await getIsSpcPlusUser(cards)

      if (this.isSPCPlus && !isSpcPlusUser) {
        // this is an spc+ offer and user is non-spc+
        // he may not redeem this offer. show RedeemModal
        // SNGW-4263 - Redirect to the About SPC+ Page inside of showing popup.
        this.$router.push('/cibc')
      } else if (this.offer.plus_offer_id && isSpcPlusUser && this.isValidSPCPlusOffer) {
        // there is a SPC+ offer related to current offer.
        // ask if user want to see the better deal
        this.showSpcPlusRedeemModal = true
      } else {
        this.copyCode()
      }
    },
    async initializeOffer () {
      try {
        await this.refreshLocation()
        const data = await getOffer(this.id)
        data.offer.title_fr = (data.offer.title_fr) ? data.offer.title_fr : data.offer.title_en
        data.partner.description_fr = (data.partner.description_fr) ? data.partner.description_fr : data.partner.description_en
        this.partner = data.partner
        this.partnerByID[data.partner.id] = data.partner
        this.offer = data.offer
        this.handleMetaUpdateLogic()
        insertDeal(this.offer)
        this.legal = data.legal
        this.handleSpcPlusRedeemModal()
        const userCampus = await getUserCampus()
        ACTIONS.VIEW_OFFER({
          offerID: this.offer.offer_id,
          offerName: this.offer.title_en,
          category: this.offer.category,
          partnerName: this.partner.partner_name,
          offerType: this.offerType,
          featured: this.offer.is_limited_time,
          sourceSection: this.sourceSection,
          isSPCPlus: this.isSPCPlus,
          userCampus: userCampus
        })
      } catch (error) {
        const response = error.response.data
        if (typeof response === 'object' && response.partner_url_name) {
          this.$router.replace(`/deals/${response.partner_url_name}`)
        } else {
          this.$router.replace('/deals')
        }
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async loadPartnerOffers () {
      try {
        await this.refreshLocation()
        const data = await getPartnerOffers(this.id)
        this.partnerOffers = data.offers
      } catch (error) {
        this.error = error
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async loadRelatedOffers () {
      try {
        await this.refreshLocation()
        const data = await getRelatedOffers(this.id)
        this.relatedOffers = data.offers
        this.partners = data.partners_by_id
      } catch (error) {
        this.error = error
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    runProgressBar () {
      this.progressValue = 0
      const progress = setInterval(() => {
        this.progressValue++
        if (this.progressValue >= 300) {
          clearInterval(progress)
        }
      }, 10)
    },
    redeemAnyway () {
      this.copyCode()
      this.handleSpcPlusRedeemModalClose()
    },
    handleSpcPlusRedeemModalClose () {
      this.showSpcPlusRedeemModal = false
    },
    async handleSpcPlusRedeemModal () {
      let cards, isSpcPlusUser
      try {
        cards = await getCards()
        isSpcPlusUser = await getIsSpcPlusUser(cards)
      } catch (error) {
        console.error(error)
      }
      if (!cards || cards.length === 0 || !cards[0].hasOwnProperty('card_number') || this.hasValidCard) {
        updateReNavigation(this.$route.fullPath)
        if (this.isSPCPlus && !isSpcPlusUser) {
          this.openModal(MODAL_TYPES.REDEEM)
        }
      }
    },
    handleShareModalClose () {
      this.showShareModal = false
    },
    handleCTA (text) {
      ACTIONS.CLICKED_CTA(text)
    },
    shareViaWebShare () {
      let data = {}
      data.text = this.$t('mobile_share_text')
      data.url = window.location.href
      navigator.share(data)
      .then(() => {
        this.handleCTA(this.offer.offer_id + ' offer shared.')
      })
      .catch((err) => {
        console.log(err)
      })
      return false
    },
    getSavedListId () {
      var listId = []
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(this.id)) {
          listId = list
        }
      })
      return listId
    },
    shareOffer () {
      this.handleCTA(this.offer.offer_id + ' offer shared.')
      this.showShareModal = true
    },
    verifyOpenOfferCTA () {
      if (this.offer.is_open && this.offer.cta_title_en && this.offer.cta_title_fr && this.offer.cta_url_en && this.offer.cta_url_fr) {
        return true
      }
      return false
    },
    verifyOfferCTA () {
      if (this.offer.cta_title_en && this.offer.cta_title_fr && this.offer.cta_url_en && this.offer.cta_url_fr) {
        return true
      }
      return false
    },
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    }
  },
  watch: {
    $route () {
      // refer to the router-link above with plus_offer_id
      // because of that, re-fetching is required on route change
      this.initializeOffer()
    },
    // below block is to update meta title
    // and description based on language update
    language: {
      immediate: true,
      handler (value) {
        this.handleMetaUpdateLogic()
      }
    },
    offer: {
      immediate: true,
      handler (value) {
        this.checkShowSubTitle()
        this.$nextTick(() => {
          this.addLinkListeners()
        })
      }
    }
  },
  beforeDestroy () {
    const links = this.$el.querySelectorAll('a')
    links.forEach(link => {
      link.removeEventListener('click', this.trackLinkClick)
    })
  },
  async created () {
    await this.initializeOffer()
    this.loadPartnerOffers()
    this.loadRelatedOffers()
    updateReNavigation('')
    this.loadCategories()
    this.loadSavedList(this.loggedIn)
    this.loadCode()
    window.addEventListener('resize', this.updateScreenWidth)
  },
  async mounted () {
    if (this.hasValidCard) {
      const isSpcPlusUser = await getIsSpcPlusUser()
      this.isSpcPlusUser = isSpcPlusUser
    }
    this.$nextTick(() => {
      this.addLinkListeners()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Deal'
</style>

<i18n>
{
  "en": {
    "about": "About",
    "terms_conditions": "Terms and Conditions",
    "redeem_online": "Redeem online",
    "copy_code_again": "Copy code again",
    "no_code_required": "No code required - continue shopping",
    "join_spc": "JOIN SPC to redeem this offer!",
    "join_spc_plus": "JOIN SPC+ TO REDEEM THIS OFFER!",
    "code_copied": "Promo code copied to clipboard. \nStart shopping & paste at checkout!",
    "errors": {
      "offer_expired": "Offer expired",
      "offer_not_found": "Offer not found",
      "code_load_error": "Failed to load code",
      "code_copy_error": "Failed to copy code",
      "url_load_error": "Failed to load URL"
    },
    "keep_membership": "Keep your membership with you at all times! Download the SPC app to redeem in-store offers and never miss a discount!",
    "more_from": "More From",
    "most_popular": "Most Popular",
    "you_might_like": "You might also like",
    "download_app_online":"Or download the SPC app to redeem this offer in store!",
    "download_app_instore":"Download the SPC app to redeem this offer in store!",
    "back": "Back",
    "back_to_deals": "Back to Deals",
    "mobile_share_text": "I'm saving money with SPC, and you can too! Check it out."
  },
  "fr": {
    "about": "À-Propos",
    "terms_conditions": "Termes & Conditions",
    "redeem_online": "Échangez en ligne",
    "copy_code_again": "Recopiez le code",
    "no_code_required": "Aucun code requis – suivez le lien suivant",
    "join_spc": "Acheter SPC pour bénéficier de cette offre!",
    "join_spc_plus": "REJOIGNEZ SPC+ POUR UTILISER CETTE OFFRE!",
    "code_copied": "Code promo est copié a votre presse-papier. \nCommencez á magasiner & collez-le á la caisse",
    "errors": {
      "offer_expired": "Offre est expirée",
      "offer_not_found": "Offre non trouvée",
      "code_load_error": "Échec du chargement du code",
      "code_copy_error": "Échec de la copie du code",
      "url_load_error": "Échec du chargement de l'URL"
    },
    "keep_membership": "Gardez votre adhésion avec vous à tout moment ! Téléchargez l'application SPC pour profiter des offres en magasin et ne manquez jamais une remise !",
    "more_from": "Plus de",
    "most_popular": "Most Popular",
    "you_might_like": "Vous aimerez peut-être aussi",
    "download_app_online":"Ou téléchargez l'application SPC pour profiter de cette offre en magasin !",
    "download_app_instore":"Téléchargez l'application SPC pour profiter de cette offre en magasin !",
    "back": "Arrière",
    "back_to_deals": "Retour aux offres",
    "mobile_share_text": "J'économise de l'argent avec SPC, et vous pouvez aussi! Découvrez-le."
  }
}
</i18n>
<i18n src='Assets/i18n/offer'></i18n>
<i18n src="Assets/i18n/time"></i18n>



// WEBPACK FOOTER //
// src/components/Deal.vue
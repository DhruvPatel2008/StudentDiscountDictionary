<template>
  <div class="container" :class="{'container-hover': isEnableHoverOffer}" @mouseenter="updateHoverTile(true)" @mouseleave="updateHoverTile()">
    <v-swipeout
      v-if="enableMobileAppView && validateDeviceWidth('Mobile', screenWidth) && enableScrollDelete"
      :autoClose="false"
      :style="{ backgroundColor: 'white' }"
      :right="[
        {
          text: 'Delete',
          style: { backgroundColor: 'red', color: 'transparent', height: '82px' }
        }
      ]"
      :onOpen="removeOffer"
    >
      <div v-bind:class="isSPCPlus ? 'golden-border-outer-hidden' : 'outer-container'"  @click="handleOfferSelect">
        <div class="app-view-container" v-bind:class="isSPCPlus ? 'golden-border-mobile' : ''">
          <div class="icon-container">
            <img :src="iconPath" :alt="title">
          </div>
          <div class="content-container">
            <div class="title">{{title}}</div>
            <div class="description" v-html="description" />
          </div>
          <div class="pill-container pos-relative" >
            <div>
              <div
                v-if="offer.online"
                class="pill online mobile"
                >
                  {{ $t('offer.types.online') }}
              </div>
              <div
                v-if="offer.in_store"
                class="pill instore mobile"
                >
                  {{ $t('offer.types.instore') }}
              </div>
              <img v-if="isSPCPlus" class="spc-pill-image mobile" :src="require('@/assets/images/cibc/pill-spc-copy.png')"/>
            </div>
          </div>
        </div>
      </div>
    </v-swipeout>
    <div v-else-if="enableMobileAppView && validateDeviceWidth('Mobile', screenWidth) && !enableScrollDelete" v-bind:class="isSPCPlus ? 'golden-border-outer-hidden' : 'outer-container'" @click="handleOfferSelect">
      <div class="app-view-container" v-bind:class="isSPCPlus ? 'golden-border-mobile' : ''">
        <div class="icon-container">
          <img :src="iconPath" :alt="title">
        </div>
        <div class="content-container">
          <div class="title">{{title}}</div>
          <div class="description" v-html="description" />
        </div>
        <div class="pill-container pos-relative" >
          <div>
            <div
              v-if="offer.online"
              class="pill online mobile"
              >
                {{ $t('offer.types.online') }}
            </div>
            <div
              v-if="offer.in_store"
              class="pill instore mobile"
              >
                {{ $t('offer.types.instore') }}
            </div>
            <img v-if="isSPCPlus" class="spc-pill-image mobile" :src="require('@/assets/images/cibc/pill-spc-copy.png')"/>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container-wrapper"  @click="handleOfferSelect">
      <div
        class="offer-tile-container"
        :class="{ 'no-details': !showDetails, 'shrink-offer-tile': offerTileShrink, 'offer-tile-container-hover': isEnableHoverOffer}"
        >
        <div class="offer-tile-inner" v-bind:class="isSPCPlus ? 'golden-border' : ''">
          <div class="offer-visuals">
            <div class="pill-container-1">
            </div>
                <div v-if="showFavourites" class="heart-container pd-8" @click.stop="toggleFavourite" :class="{ disabled: !registered }">
                  <img v-if="isFavourited" :src="require(`@/assets/images/icons/general/bookmark-filled.png`)" alt="book-mark-filled">
                  <img v-else :src="require(`@/assets/images/icons/general/bookmark.png`)" alt="book-mark-unfilled">
                </div>
                <div class="circle text-center">
                  <ImageLoader
                    :imgURL="iconPath"
                    :imgAlt="partner['alt_'+language] ? partner['alt_'+language] : title+'-'+description"
                    :fallback="require('@/assets/images/logos/SPC_LOGO_BLACK.svg')"
                    class="icon"
                    :class="{'shrink-icon': offerTileShrink}"
                    :key="language"
                    />
                </div>
            </div>
            <div class="pill-container">
              <div
                v-if="offer.online"
                class="pill online"
                >
                  {{ $t('offer.types.online') }}
              </div>
              <div
                v-if="offer.in_store"
                class="pill instore"
                >
                  {{ $t('offer.types.instore') }}
              </div>
              <img v-if="isSPCPlus" class="spc-pill-image" :src="require('@/assets/images/cibc/pill-spc-copy.png')"/>
            </div>
            <div
              v-if="showDetails"
              class="offer-info"
              :class="{'shrink-offer-info': offerTileShrink}">
              <div class="title">{{ title }}</div>
              <div class="description" :class="{'text-overflow': enableHoverFeature}" v-html="description.length > 60 ? description.slice(0, 60).concat('...') : description" />

              <!-- OFFER TILE HOVER SHOW BUTTON FEATURE -->
              <LineLoader v-if="enableHoverFeature" :loading="loadingCode" :inverted="true" />
              <button
                @click.stop=""
                v-if="enableHoverFeature && offer.online"
                :disabled="loadingCode"
                v-clipboard:copy="code"
                class="clipboard-btn spc-button-v2 purple break-white-space"
                :class="{'reduce-p-tb': (!validMemberWithCard || (offer.is_spc_plus && !this.isSpcPlusUser))}"
              >
                <span v-if="validMemberWithCard">
                  <span v-if="offer.is_spc_plus && !this.isSpcPlusUser" @click="spcPlusRedirect()">{{ $t('join_spc_plus') }}</span>
                  <span v-else-if="!copiedCode" @click="handleCopyCode()">{{ $t('redeem_online') }}</span>
                  <span v-if="copiedCode" @click="CopyCodeAgain()">{{ $t('copy_code_again') }}</span>
                </span>
                <span v-else-if="offer.is_spc_plus" @click="spcPlusRedirect()">{{ $t('join_spc_plus') }}</span>
                <span v-else @click="handleSPCGateModal">{{ $t('join_spc') }}</span>
              </button>
              <!-- END OFFER TILE HOVER SHOW BUTTON FEATURE -->

            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ImageLoader from '@/components/Utility/ImageLoader'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { validateDeviceWidth, safeOpen } from '@/utils'
import store from '@/store'
import { URL_TYPE } from '@/models/offer'
import VSwipeout from 'v-swipeout'
import { getURL } from '@/service/api-config'
import { ACTIONS } from '@/service/analytics-service'
import { determineOfferType, getOfferCode, getOfferURL } from '@/service/offer-service'
import LineLoader from '@/components/Utility/LineLoader'

export default {
  data () {
    return {
      MODAL_TYPES,
      generatedURL: null,
      screenWidth: window.innerWidth,
      showCreateList: false,
      isHovered: false,
      code: null,
      copiedCode: false,
      loadingCode: false,
      isSaved: false
    }
  },
  components: {
    ImageLoader,
    LineLoader,
    VSwipeout
  },
  props: {
    offer: {
      type: Object,
      required: true
    },
    partner: {
      type: Object,
      required: true
    },
    offerID: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    iconPath: {
      type: String,
      required: true
    },
    instore: {
      type: Boolean,
      required: true
    },
    online: {
      type: Boolean,
      required: true
    },
    section: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showFavourites: {
      type: Boolean,
      default: true
    },
    showDetails: {
      type: Boolean,
      default: true
    },
    fromGrid: {
      type: Boolean,
      default: false
    },
    isSpcPlusUser: {
      type: Boolean,
      default: false
    },
    enableMobileAppView: {
      type: Boolean,
      default: false
    },
    shrinkOfferTile: {
      type: Boolean,
      default: false
    },
    enableScrollDelete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'registered',
      'hasValidCard',
      'validMemberWithCard',
      'language'
    ]),
    ...mapGetters('offers', [
      'favouriteOffers',
      'savedList'
    ]),
    hasGeneratedURL () {
      return this.offer ? this.offer.url_type === URL_TYPE.GENERATED : false
    },
    offerURL () {
      if (!this.offer) return null
      return this.hasGeneratedURL ? this.generatedURL : this.offer.url
    },
    isEnableHoverOffer () {
      let enable = this.offer.enable_hover
      if (this.offer.in_store && !this.offer.online) {
        enable = false
      }
      return enable
    },
    enableHoverFeature () {
      return this.isHovered && this.isEnableHoverOffer
    },
    isSPCPlus () {
      return this.offer.is_spc_plus
    },
    instoreOnly () {
      return this.instore && !this.online
    },
    onlineOnly () {
      return this.online && !this.instore
    },
    both () {
      return this.instore && this.online
    },
    /**
     * Will shrink the offer tile only for mobile view.
     * @returns {Boolean}
     */
    offerTileShrink () {
      return this.shrinkOfferTile && validateDeviceWidth('Mobile', this.screenWidth)
    },
    isFavourited () {
      var flag = false
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(this.offerID)) {
          flag = true
        }
      })
      return flag
    }
  },
  methods: {
    ...mapActions('offers', [
      'updateFavourites',
      'updateSavedList'
    ]),
    ...mapActions('modals', [
      'showCloseBtn',
      'openModal',
      'closeModal'
    ]),
    handleSPCGateModal () {
      this.showCloseBtn()
      this.openModal(MODAL_TYPES.LOGIN_PROMPT)
    },
    spcPlusRedirect () {
      this.$router.push('/cibc')
    },
    async loadURL () {
      try {
        const urlData = await getOfferURL(this.offer)
        this.generatedURL = urlData.url
      } catch (error) {
        console.error(error)
      }
    },
    updateHoverTile (comeIn = false) {
      if (comeIn && this.validMemberWithCard && this.isEnableHoverOffer) {
        if (this.offer.is_spc_plus) {
          if (this.isSpcPlusUser) {
            this.loadCode()
          }
        } else {
          this.loadCode()
        }
      }
      this.isHovered = !this.isHovered
    },
    handleCopyCode () {
      this.$bus.$emit('handleCopyCode', true)
      this.copiedCode = true
      ACTIONS.PRESSED_COPY_CODE({
        offerID: this.offer.offer_id,
        offerName: this.offer.title_en,
        category: this.offer.category,
        partnerName: this.partner.partner_name,
        partnerID: null,
        offerType: determineOfferType(this.offer),
        featured: this.offer.is_limited_time,
        plusOffer: this.isSPCPlus,
        isHoverClicked: true
      })
      setTimeout(() => {
        // add delay for code to be copied
        safeOpen(this.offerURL)
      }, 1000)
    },
    CopyCodeAgain () {
      this.$bus.$emit('handleCopyCode', true)
    },
    async loadCode () {
      this.loadingCode = true
      this.code = null
      if (this.hasGeneratedURL && !this.generatedURL) await this.loadURL()
      try {
        const codeData = await getOfferCode(this.offer, 'online')
        this.code = codeData.code
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingCode = false
      }
    },
    validateDeviceWidth,
    handleOfferSelect () {
      if (this.disabled) { return }
      const offerID = this.offerID
      const partnerName = this.partner.url_name ? this.partner.url_name : 'partner'
      window.location.href = window.location.origin + `/deals/${partnerName}/offer/${offerID}?source=${this.section}`
    },
    async toggleFavourite () {
      if (!this.registered) {
        this.openModal(MODAL_TYPES.LOGIN_PROMPT)
        return
      }
      await store.dispatch('updateOfferId', this.offer.id)
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
        var newList = this.savedList.filter(itm => itm.id === savedList.id)[0].offer_ids.filter(id => id !== this.offer.id)
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
    /**
     * Update the screenWidth value whenever device width changes.
     */
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    handleCreateListClose () {
      this.closeModal(MODAL_TYPES.SHOW_CREATE_LIST)
    },
    /**
     * Method to find the savedList for the offer Id
     * @returns {Array}
     */
    getSavedListId () {
      var offerSavedList = []
      this.savedList.forEach(list => {
        if (list.offer_ids && list.offer_ids.includes(this.offerID)) {
          offerSavedList = list
        }
      })
      return offerSavedList
    },
    /**
     * Remove the offer from the custom list.
     */
    removeOffer () {
      if (!this.registered) {
        this.openModal(MODAL_TYPES.LOGIN_PROMPT)
        return
      }
      store.dispatch('updateOfferId', this.offer.id)
      var savedList = this.getSavedListId()
      if (savedList.id) {
        var newList = this.savedList.filter(itm => itm.id === savedList.id)[0].offer_ids.filter(id => id !== this.offer.id)
        this.updateSavedList({ offerIds: newList, listId: savedList.id, listName: savedList.name })
        .then(res => {
          this.$emit('reloadList')
        })
        .catch(error => {
          console.error(error)
        })
      }
    },
    getURL
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
@import '~@/assets/components/OfferTile'
</style>

<i18n src='Assets/i18n/offer'></i18n>
<i18n>
  {
    "en": {
      "redeem_online": "Redeem online",
      "copy_code_again": "Copy code again",
      "join_spc_plus": "JOIN SPC+ TO REDEEM THIS OFFER!",
      "join_spc": "JOIN SPC to redeem this offer!"
    },
    "fr": {
      "redeem_online": "Échangez en ligne",
      "copy_code_again": "Recopiez le code",
      "join_spc_plus": "REJOIGNEZ SPC+ POUR UTILISER CETTE OFFRE!",
      "join_spc": "Acheter SPC pour bénéficier de cette offre!"
    }
  }
</i18n>



// WEBPACK FOOTER //
// src/components/OfferTile.vue
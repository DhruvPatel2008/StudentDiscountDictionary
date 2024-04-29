<template>
  <Modal :show="show" @close="$emit('close')" :inverted="false" containerPadding="30px 0 0">
    <div class="login-container">
      <div class="share-div">
        <span class="share">{{ $t('title') }}</span>
      </div>
      <div class="discount-div">
          <span class="send-this-discount">{{ $t('sub-title') }}</span>
      </div>
      <div class="row">
        <div v-for="list in socialSiteList" :key="list.name" class="column">
          <img class="social-icon" :src="require(`@/assets/images/icons/general/${list.url}`)" alt="Snow" @click="shareOfferURL(list.name, list.apiURL)">
        </div>
      </div>
      <div class="Rectangle-Copy-4">
        <div class="offer-url" v-bind:class="linkCopied ? 'highlighted' : ''">{{ currentOfferURL }}</div>
      </div>
      <button class="clipboard-btn spc-button-v2 purple" >
        <span v-if="linkCopied" @click="copyShareURL()">{{ $t('link-copied') }}</span>
        <span v-else @click="copyShareURL()">{{ $t('copy-link') }}</span>
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/Modal'
import { socialSiteList } from '@/models/socialSites'
import { ACTIONS } from '@/service/analytics-service'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    offer: {
      type: Object,
      required: true
    },
    partner: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      socialSiteList,
      currentOfferURL: window.location.href,
      linkCopied: false
    }
  },
  methods: {
    shareOfferURL (name, apiURL) {
      ACTIONS.SHARE_CLICKED(name, this.offer.title_en, this.partner.name)
      if (name === 'Email') {
        var content = 'mailto:?subject= SPC Offer &body=Check out this site: ' + this.currentOfferURL
        window.open(content)
      } else {
        window.open(apiURL + this.currentOfferURL)
      }
    },
    copyShareURL () {
      this.linkCopied = true
      ACTIONS.SHARE_CLICKED('Link Copied', this.offer.title_en, this.partner.name)
      navigator.clipboard.writeText(this.currentOfferURL)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Modals/ShareModal'
</style>

<i18n>
{
  "en": {
    "title": "Share",
    "sub-title": "Send this discount to a friend.",
    "copy-link": "Copy Link",
    "link-copied": "Link Copied"
  },
  "fr": {
    "title": "Partager",
    "sub-title": "Envoyez cette remise à un ami.",
    "copy-link": "Copiez le lien",
    "link-copied": "Lien est copié"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Modals/ShareModal.vue
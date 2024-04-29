<template>
 <div>
    <div class="modal-copiedCode-banner" v-if="showModal">
      <div class="modal-content-copiedCode-banner">
          <p class="modal-text-copiedCode-banner">{{ $t('copiedCode-banner') }}&nbsp;&nbsp;&nbsp;&nbsp;
          <div @click="closeModal" class="close-button-copiedCode-banner">✕</div></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showModal: false
    }
  },

  created () {
    this.$bus.$on('handleCopyCode', (data) => {
      console.log('handleCopyCode', data)
      if (!this.showModal) {
        this.showModal = data
      }
      if (this.showModal) {
        setTimeout(() => {
          this.showModal = false
        }, 10000)
      }
    })
  },
  methods: {
    closeModal () {
      this.showModal = false
    }
  }

}
</script>

<style>
.modal-copiedCode-banner {
  display: none;
  position: fixed;
  top: 48%;
  left: 15%;
  width: 70%;
  height: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
}

.modal-content-copiedCode-banner {
  background-color: rgb(235 244 242); 
  padding: 1px 12px 1px 20px;
  border-radius: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: row;
  margin-top: -280px;
}

.modal-text-copiedCode-banner {
  color: black;
  font-size: 18px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; 
  margin: 0px;
}

.close-button-copiedCode-banner {
  color: black; 
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
}
</style>
<i18n>
  {
    "en": {
      "copiedCode-banner": "Promo code copied to clipboard. Start shopping & paste at checkout"
    },
    "fr": {
      "copiedCode-banner": "Code promo est copié a votre presse-papier. Commencez á magasiner & collez-le á la caisse"
    }
  }
  </i18n>


// WEBPACK FOOTER //
// src/components/Modals/OfferTileAlertBannerModal.vue
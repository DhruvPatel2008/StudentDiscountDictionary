export default {
  showModal: state => (type) => state.show[type],
  promptClosed: state => state.promptClosed,
  showCloseBtn: state => state.showCloseBtn,
  landingPageOffer: state => state.landingPageOffer
}



// WEBPACK FOOTER //
// ./src/store/modules/modals/getters.js
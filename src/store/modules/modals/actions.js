import * as types from './types'

export default {
  openModal ({ commit }, type) {
    commit(types.OPEN_MODAL, type)
  },
  closeModal ({ commit }, type) {
    commit(types.CLOSE_MODAL, type)
  },
  promptClosed ({ commit }, type) {
    commit(types.PROMPT_CLOSED, type)
  },
  showCloseBtn ({commit}, type) {
    commit(types.SHOW_CLOSE_BTN, type)
  },
  hideCloseBtn ({commit}, type) {
    commit(types.HIDE_CLOSE_BTN, type)
  },
  landingPageOffer ({commit}, type) {
    commit(types.LANDING_PAGE_OFFER, type)
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/modals/actions.js
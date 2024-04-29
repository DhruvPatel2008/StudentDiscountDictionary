import * as types from './types'
import MODAL_TYPES from './modal-types'

export default {
  [types.PROMPT_CLOSED] (state, type) {
    state.promptClosed = true
  },
  [types.LANDING_PAGE_OFFER] (state, type) {
    state.landingPageOffer = true
  },
  [types.SHOW_CLOSE_BTN] (state, type) {
    state.showCloseBtn = true
  },
  [types.HIDE_CLOSE_BTN] (state, type) {
    state.showCloseBtn = false
  },
  [types.OPEN_MODAL] (state, type) {
    if (Object.values(MODAL_TYPES).includes(type)) {
      state.show[type] = true
    } else {
      console.warn(`Invalid modal type: ${type}`)
    }
  },
  [types.CLOSE_MODAL] (state, type) {
    if (Object.values(MODAL_TYPES).includes(type)) {
      state.show[type] = false
    } else {
      console.warn(`Invalid modal type: ${type}`)
    }
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/modals/mutations.js
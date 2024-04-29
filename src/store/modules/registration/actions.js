import * as types from './types'

export default {
  updateCard ({ commit }, card) {
    commit(types.UPDATE_CARD, card)
  },
  clearCard ({ commit }) {
    commit(types.CLEAR_CARD)
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/registration/actions.js
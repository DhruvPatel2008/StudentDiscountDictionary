import * as types from './types'
import { Card } from '@/models/profile'

export default {
  [types.UPDATE_CARD] (state, { card_number, csv }) {
    // eslint-disable-next-line camelcase
    state.card.card_number = card_number
    state.card.csv = csv
  },
  [types.CLEAR_CARD] (state) {
    state.card = Card()
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/registration/mutations.js
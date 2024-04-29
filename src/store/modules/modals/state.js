import MODAL_TYPES from './modal-types'
import { mapObject } from '@/utils'

export default {
  show: {
    ...(mapObject(MODAL_TYPES, () => false))
  },
  showCloseBtn: false,
  promptClosed: false,
  landingPageOffer: false
}



// WEBPACK FOOTER //
// ./src/store/modules/modals/state.js
import * as types from './types'

export default {
  [types.REFRESH_LOCATION] (state, coords = {}) {
    state.lat = coords.lat || null
    state.lon = coords.lon || null
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/location/mutations.js
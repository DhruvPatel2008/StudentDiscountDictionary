import * as types from './types'
import { getLocationFromNavigator } from '@/service/location-service'
import store from '@/store'

export default {
  async refreshLocation ({ commit, getters }, force = false) {
    // No need to know location for not logged in users
    if (!store.getters.loggedIn) return

    if (getters.hasCoords && !force) {
      return getters.coordinates
    }
    try {
      const coords = await getLocationFromNavigator()
      commit(types.REFRESH_LOCATION, coords)
      return coords
    } catch (error) {
      return null
    }
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/location/actions.js
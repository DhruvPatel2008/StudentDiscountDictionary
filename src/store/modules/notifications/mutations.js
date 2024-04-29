import * as types from './types'
import findIndex from 'lodash/findIndex'

export default {
  [types.PUSH_NOTIFICATION] (state, notification) {
    notification.id = state.nextID++
    state.notifications.push(notification)
  },
  [types.POP_NOTIFICATION] (state, notification) {
    const index = findIndex(state.notifications, { id: notification.id })
    if (index !== -1) state.notifications.splice(index, 1)
    if (notification.callback && typeof notification.callback === 'function') {
      notification.callback()
    }
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/notifications/mutations.js
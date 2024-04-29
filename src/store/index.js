import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

export default new Vuex.Store({
  strict: !isProd,
  state,
  getters,
  mutations,
  actions,
  modules
})



// WEBPACK FOOTER //
// ./src/store/index.js
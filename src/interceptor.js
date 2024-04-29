import axios from 'axios'
import moment from 'moment'
import store from '@/store'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { HTTP_429_TOO_MANY_REQUESTS } from '@/utils'

export default function setup () {
  axios.interceptors.request.use(function (config) {
    let utmValues = JSON.parse(localStorage.getItem('UTM'))
    if (utmValues && store.getters.token && moment() < moment(utmValues.expireDate)) {
      config.headers['utm'] = JSON.stringify(utmValues.utm)
    }
    if (utmValues && moment() > moment(utmValues.expireDate)) {
      localStorage.setItem('UTM', null)
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  })
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === HTTP_429_TOO_MANY_REQUESTS) {
        store.dispatch('modals/openModal', MODAL_TYPES.RATE_LIMITED_MODAL)
      }
      return Promise.reject(error)
    }
  )
}



// WEBPACK FOOTER //
// ./src/interceptor.js
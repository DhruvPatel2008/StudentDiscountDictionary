import * as types from './types'
import membership from 'Assets/data/spc_membership_price'

export default {
  [types.UPDATE_PAYMENT] (state, payment) {
    state.payment = payment
  },
  [types.UPDATE_PAYMENT_ERROR] (state, error) {
    state.paymentError = error
  },
  [types.UPDATE_PRODUCT] (state, product) {
    state.product = product
  },
  [types.UPDATE_POSTAL] (state, postal) {
    state.postal = postal
  },
  [types.UPDATE_ORDER] (state, order) {
    state.order = order
  },
  [types.UPDATE_LOADING] (state, loading) {
    state.loading[loading.type] = loading.value
  },
  [types.UPDATE_REFERRAL_DATE] (state, data) {
    state.referralData = data
  },
  [types.UPDATE_SHOW_SCHOOL_CODE] (state, value) {
    state.showSchoolCodeField = value
  },
  [types.UPDATE_SHOW_PROMO_CODE] (state, value) {
    state.showPromoCodeField = value
  },
  [types.UPDATE_NEW_CARD] (state, newCard) {
    state.newCard = newCard
  },
  [types.UPDATE_TAX_RATE] (state, taxRate) {
    state.taxRate = taxRate
  },
  [types.UPDATE_TOTAL] (state, total) {
    state.total = total
  },
  [types.UPDATE_PROMO_SUCCESS] (state, value) {
    state.promoSuccess = value
  },
  [types.UPDATE_PROMO_FAILURE] (state, value) {
    state.promoFail = value
  },
  [types.UPDATE_SHOOL_CODE_SUCCESS] (state, value) {
    state.schoolCodeSuccess = value
  },
  [types.UPDATE_SHOOL_CODE_FAILURE] (state, value) {
    state.schoolCodeFailed = value
  },
  [types.UPDATE_SHOW_PROMOCODE_DISCOUNT] (state, value) {
    state.showPromoDiscount = value
  },
  [types.UPDATE_PROMOCODE_DISCOUNT] (state, value) {
    state.promoDiscount = value
  },
  [types.UPDATE_PROMOCODE] (state, value) {
    state.appliedPromoCode = value
  },
  [types.UPDATE_SHOOL_CODE] (state, value) {
    state.appliedSchoolCode = value
  },
  [types.RESET_PAYMENT] (state) {
    state.showSchoolCodeField = false
    state.showPromoCodeField = false
    state.taxRate = 0
    state.total = membership.price
    state.promoSuccess = false
    state.promoFail = false
    state.schoolCodeSuccess = false
    state.schoolCodeFailed = false
    state.showPromoDiscount = false
    state.promoDiscount = 0
    state.appliedPromoCode = ''
    state.appliedSchoolCode = ''
    state.order = null
    state.referralData = null
    state.payment = null
    state.paymentError = null
    state.newCard = null
    state.loading = {
      initial: true,
      creditCard: false,
      confirming: false,
      paymentMethod: false
    }
    state.product = null
    state.province = null
  },
  [types.UPDATE_EXPIRATION_BANNER] (state, value) {
    state.expirationBanner = value
  },
  [types.UPDATE_SHOW_MEMBERSHIP_EXPIRING_MODAL] (state, {value, type}) {
    state.showMembershipExpiringModal = value
    state.membershipExpiringModalType = type
  },
  [types.UPDATE_PAYMENT_LOADING] (state, value) {
    state.paymentLoading = value
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/payment/mutations.js
import * as types from './types'

export default {
  updatePayment ({ commit }, payment) {
    commit(types.UPDATE_PAYMENT, payment)
  },
  updatePaymentError ({ commit }, error) {
    commit(types.UPDATE_PAYMENT_ERROR, error)
  },
  updateProduct ({ commit }, product) {
    commit(types.UPDATE_PRODUCT, product)
  },
  updatePostal ({ commit }, postal) {
    commit(types.UPDATE_POSTAL, postal)
  },
  updateOrder ({ commit }, order) {
    commit(types.UPDATE_ORDER, order)
  },
  updateLoading ({ commit }, loading) {
    commit(types.UPDATE_LOADING, loading)
  },
  updateReferralData ({ commit }, data) {
    commit(types.UPDATE_REFERRAL_DATE, data)
  },
  updateShowSchoolCode ({ commit }, value) {
    commit(types.UPDATE_SHOW_SCHOOL_CODE, value)
  },
  updateShowPromoCode ({ commit }, value) {
    commit(types.UPDATE_SHOW_PROMO_CODE, value)
  },
  updateNewCard ({ commit }, newCard) {
    commit(types.UPDATE_NEW_CARD, newCard)
  },
  updateTaxRate ({ commit }, taxRate) {
    commit(types.UPDATE_TAX_RATE, taxRate)
  },
  updateTotal ({ commit }, total) {
    commit(types.UPDATE_TOTAL, total)
  },
  updatePromoSuccess ({ commit }, value) {
    commit(types.UPDATE_PROMO_SUCCESS, value)
  },
  updatePromoFailure ({ commit }, value) {
    commit(types.UPDATE_PROMO_FAILURE, value)
  },
  updateSchoolCodeSuccess ({ commit }, value) {
    commit(types.UPDATE_SHOOL_CODE_SUCCESS, value)
  },
  updateSchoolCodeFailure ({ commit }, value) {
    commit(types.UPDATE_SHOOL_CODE_FAILURE, value)
  },
  updateShowPromocodeDiscount ({ commit }, value) {
    commit(types.UPDATE_SHOW_PROMOCODE_DISCOUNT, value)
  },
  updatePromocodeDiscount ({ commit }, value) {
    commit(types.UPDATE_PROMOCODE_DISCOUNT, value)
  },
  updatePromocode ({ commit }, value) {
    commit(types.UPDATE_PROMOCODE, value)
  },
  updateSchoolCode ({ commit }, value) {
    commit(types.UPDATE_SHOOL_CODE, value)
  },
  resetPayment ({commit}) {
    commit(types.RESET_PAYMENT)
  },
  updateExpirationBanner ({ commit }, value) {
    commit(types.UPDATE_EXPIRATION_BANNER, value)
  },
  updateShowMembershipExpiringModal ({ commit }, {value, type}) {
    commit(types.UPDATE_SHOW_MEMBERSHIP_EXPIRING_MODAL, {value, type})
  },
  updatePaymentLoading ({ commit }, value) {
    commit(types.UPDATE_PAYMENT_LOADING, value)
  }
}



// WEBPACK FOOTER //
// ./src/store/modules/payment/actions.js